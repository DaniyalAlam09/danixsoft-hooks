import { useStorageState } from './internal/storage';
import type { SetStorageValue, StorageOptions } from './internal/storage';

export type { SetStorageValue, StorageOptions } from './internal/storage';

/**
 * State persisted to `window.localStorage` and kept in sync across every
 * component and browser tab that uses the same key.
 *
 * SSR-safe: the server and the hydrating client render `initialValue`, then
 * the stored value is applied right after hydration, so there is no
 * hydration mismatch. Client-only renders read the stored value immediately.
 *
 * @returns `[value, setValue, removeValue]`. `setValue` is stable and accepts
 * a value or an updater function; `removeValue` deletes the key and falls
 * back to `initialValue`.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: StorageOptions<T>
): readonly [T, SetStorageValue<T>, () => void] {
  return useStorageState('localStorage', key, initialValue, options);
}
