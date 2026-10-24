import { useCallback, useSyncExternalStore } from 'react';

export interface UseMediaQueryOptions {
  /**
   * Value rendered on the server and during hydration. Defaults to `false`.
   * Set it to what most visitors will match (for example `true` for a
   * mobile-first `(max-width: 768px)`) to minimise the post-hydration swap.
   */
  defaultValue?: boolean;
}

/**
 * Subscribes to a CSS media query.
 *
 * Built on useSyncExternalStore: client-only renders get the real value on the
 * first render (no flash), while server rendering and hydration use
 * `defaultValue` so there is never a hydration mismatch.
 */
export function useMediaQuery(query: string, options: UseMediaQueryOptions = {}): boolean {
  const { defaultValue = false } = options;

  const subscribe = useCallback(
    (onChange: () => void) => {
      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return () => {};
      }
      const media = window.matchMedia(query);
      if (media.addEventListener) {
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
      }
      // Safari < 14
      media.addListener(onChange);
      return () => media.removeListener(onChange);
    },
    [query]
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return defaultValue;
    }
    return window.matchMedia(query).matches;
  }, [query, defaultValue]);

  const getServerSnapshot = useCallback(() => defaultValue, [defaultValue]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
