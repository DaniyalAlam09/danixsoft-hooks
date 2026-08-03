import { useCallback, useRef, useEffect } from 'react';

export function useEvent<T extends (...args: any[]) => any>(fn: T): T {
  const ref = useRef<T>(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn]);

  return useCallback(
    (...args: Parameters<T>): ReturnType<T> => {
      return ref.current(...args);
    },
    []
  ) as T;
}
