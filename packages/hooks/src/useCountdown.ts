import { useState, useEffect, useCallback, useRef } from 'react';

interface UseCountdownOptions {
  /** Milliseconds between ticks. Defaults to 1000. */
  interval?: number;
  /** Called once when the count reaches 0. */
  onEnd?: () => void;
}

export function useCountdown(initialCount: number, options?: UseCountdownOptions) {
  const [count, setCount] = useState(initialCount);
  const [isCounting, setIsCounting] = useState(false);
  const interval = options?.interval ?? 1000;

  // Kept in refs so an inline options object doesn't restart the interval on
  // every render, and onEnd is never called from inside a state updater
  // (which React may run twice).
  const onEndRef = useRef(options?.onEnd);
  onEndRef.current = options?.onEnd;
  const countRef = useRef(count);
  countRef.current = count;

  const start = useCallback(() => {
    if (countRef.current > 0) setIsCounting(true);
  }, []);
  const pause = useCallback(() => setIsCounting(false), []);
  const reset = useCallback(() => {
    setIsCounting(false);
    setCount(initialCount);
  }, [initialCount]);

  useEffect(() => {
    if (!isCounting) return;

    const id = setInterval(() => {
      const next = Math.max(countRef.current - 1, 0);
      countRef.current = next;
      setCount(next);
      if (next === 0) {
        clearInterval(id);
        setIsCounting(false);
        onEndRef.current?.();
      }
    }, interval);

    return () => clearInterval(id);
  }, [isCounting, interval]);

  return { count, isCounting, start, pause, reset };
}
