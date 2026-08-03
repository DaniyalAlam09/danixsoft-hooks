import { useState, useEffect, useCallback } from 'react';

interface UseCountdownOptions {
  interval?: number;
  onEnd?: () => void;
}

export function useCountdown(initialCount: number, options?: UseCountdownOptions) {
  const [count, setCount] = useState(initialCount);
  const [isCounting, setIsCounting] = useState(false);
  const interval = options?.interval ?? 1000;

  const start = useCallback(() => setIsCounting(true), []);
  const pause = useCallback(() => setIsCounting(false), []);
  const reset = useCallback(() => {
    setIsCounting(false);
    setCount(initialCount);
  }, [initialCount]);

  useEffect(() => {
    if (!isCounting) return;

    const id = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          setIsCounting(false);
          clearInterval(id);
          options?.onEnd?.();
          return 0;
        }
        return prev - 1;
      });
    }, interval);

    return () => clearInterval(id);
  }, [isCounting, interval, options]);

  return { count, isCounting, start, pause, reset };
}
