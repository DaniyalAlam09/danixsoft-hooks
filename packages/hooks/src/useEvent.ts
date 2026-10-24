import { useCallback, useRef } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useEvent<T extends (...args: any[]) => any>(fn: T): T {
  const ref = useRef<T>(fn);

  // Layout effect so the latest fn is in place before other effects (and
  // event handlers fired from them) can call it.
  useIsomorphicLayoutEffect(() => {
    ref.current = fn;
  }, [fn]);

  return useCallback(
    (...args: Parameters<T>): ReturnType<T> => {
      return ref.current(...args);
    },
    []
  ) as T;
}
