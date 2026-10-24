import { useCallback, useRef, useSyncExternalStore } from 'react';

/**
 * Shared engine behind useLocalStorage and useSessionStorage.
 *
 * Built on useSyncExternalStore so that:
 * - the server and the hydrating client both render `initialValue`
 *   (getServerSnapshot), then React re-renders with the stored value, so
 *   there is never a hydration mismatch;
 * - every component using the same key, in this tab and in other tabs,
 *   reads one source of truth;
 * - the setter is stable and functional updates always see the latest
 *   stored value, even when called several times in one tick.
 */

export type StorageArea = 'localStorage' | 'sessionStorage';

export interface StorageOptions<T> {
  /** Turns a value into the string written to storage. Defaults to JSON.stringify. */
  serializer?: (value: T) => string;
  /** Turns the stored string back into a value. Defaults to JSON.parse. */
  deserializer?: (raw: string) => T;
}

export type SetStorageValue<T> = (value: T | ((previous: T) => T)) => void;

/** Fired on window for same-tab writes, so separate copies of the library (ESM + CJS) stay in sync too. */
const LOCAL_EVENT = 'danixsoft-hooks:storage';

interface LocalChangeDetail {
  area: StorageArea;
  key: string;
}

/**
 * Values that could not be written to the real storage (private mode, quota
 * full, storage disabled). They keep the state working for this page view.
 * `null` marks a key removed while storage was failing.
 */
const fallback: Record<StorageArea, Map<string, string | null>> = {
  localStorage: new Map(),
  sessionStorage: new Map(),
};

function getStorage(area: StorageArea): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    return window[area];
  } catch {
    // Accessing window.localStorage throws when cookies are blocked.
    return null;
  }
}

export function readRaw(area: StorageArea, key: string): string | null {
  const memory = fallback[area];
  if (memory.has(key)) return memory.get(key) ?? null;
  const storage = getStorage(area);
  if (!storage) return null;
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function writeRaw(area: StorageArea, key: string, raw: string | null): void {
  const storage = getStorage(area);
  try {
    if (!storage) throw new Error(`${area} is unavailable`);
    if (raw === null) storage.removeItem(key);
    else storage.setItem(key, raw);
    fallback[area].delete(key);
  } catch (error) {
    fallback[area].set(key, raw);
    if (typeof console !== 'undefined') {
      console.warn(`Could not write ${area} key "${key}"; keeping it in memory instead.`, error);
    }
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent<LocalChangeDetail>(LOCAL_EVENT, { detail: { area, key } })
    );
  }
}

function subscribe(area: StorageArea, key: string, onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const onStorage = (event: StorageEvent) => {
    // key === null means storage.clear() in another tab.
    if (event.key !== null && event.key !== key) return;
    const storage = getStorage(area);
    if (event.storageArea && storage && event.storageArea !== storage) return;
    // A real write from another tab supersedes any in-memory fallback.
    fallback[area].delete(key);
    onChange();
  };
  const onLocal = (event: Event) => {
    const detail = (event as CustomEvent<LocalChangeDetail>).detail;
    if (detail && detail.area === area && detail.key === key) onChange();
  };

  window.addEventListener('storage', onStorage);
  window.addEventListener(LOCAL_EVENT, onLocal);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(LOCAL_EVENT, onLocal);
  };
}

const defaultSerializer = (value: unknown) => JSON.stringify(value);
const defaultDeserializer = (raw: string) => JSON.parse(raw);

export function useStorageState<T>(
  area: StorageArea,
  key: string,
  initialValue: T,
  options: StorageOptions<T> = {}
): readonly [T, SetStorageValue<T>, () => void] {
  // Keep the first initialValue so inline literals ([] / {}) don't change
  // the snapshot identity on every render.
  const initialRef = useRef(initialValue);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  // Cache the parsed value per raw string so getSnapshot returns a stable
  // reference until the stored string actually changes.
  const cacheRef = useRef<{ key: string; raw: string | null; value: T } | null>(null);

  const parse = useCallback(
    (raw: string | null): T => {
      if (raw === null) return initialRef.current;
      try {
        const deserialize = optionsRef.current.deserializer ?? (defaultDeserializer as (r: string) => T);
        return deserialize(raw);
      } catch (error) {
        if (typeof console !== 'undefined') {
          console.warn(`Could not parse ${area} key "${key}"; using the initial value.`, error);
        }
        return initialRef.current;
      }
    },
    [area, key]
  );

  const getSnapshot = useCallback((): T => {
    const raw = readRaw(area, key);
    const cached = cacheRef.current;
    if (cached && cached.key === key && cached.raw === raw) return cached.value;
    const value = parse(raw);
    cacheRef.current = { key, raw, value };
    return value;
  }, [area, key, parse]);

  const getServerSnapshot = useCallback((): T => initialRef.current, []);

  const subscribeToKey = useCallback(
    (onChange: () => void) => subscribe(area, key, onChange),
    [area, key]
  );

  const value = useSyncExternalStore(subscribeToKey, getSnapshot, getServerSnapshot);

  const setValue = useCallback<SetStorageValue<T>>(
    (next) => {
      // Resolve functional updates against storage, not the render closure,
      // so two quick updates in one tick both apply.
      const previous = parse(readRaw(area, key));
      const resolved =
        typeof next === 'function' ? (next as (previous: T) => T)(previous) : next;
      let raw: string;
      try {
        const serialize = optionsRef.current.serializer ?? (defaultSerializer as (v: T) => string);
        raw = serialize(resolved);
      } catch (error) {
        if (typeof console !== 'undefined') {
          console.warn(`Could not serialise ${area} key "${key}".`, error);
        }
        return;
      }
      writeRaw(area, key, raw);
    },
    [area, key, parse]
  );

  const removeValue = useCallback(() => {
    writeRaw(area, key, null);
  }, [area, key]);

  return [value, setValue, removeValue] as const;
}
