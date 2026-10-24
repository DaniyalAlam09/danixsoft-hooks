import { useStorageState } from './internal/storage';
import type { SetStorageValue, StorageOptions } from './internal/storage';

/**
 * State persisted to `window.sessionStorage` (one browser tab, cleared when
 * the tab closes) and shared by every component using the same key.
 *
 * SSR-safe: the server and the hydrating client render `initialValue`, then
 * the stored value is applied right after hydration.
 *
 * @returns `[value, setValue, removeValue]`. `setValue` is stable and accepts
 * a value or an updater function.
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T,
  options?: StorageOptions<T>
): readonly [T, SetStorageValue<T>, () => void] {
  return useStorageState('sessionStorage', key, initialValue, options);
}
