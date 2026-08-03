import { useState, useCallback } from 'react';

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

interface UseCounterOptions {
  min?: number;
  max?: number;
}

export function useCounter(initialValue = 0, options?: UseCounterOptions): UseCounterReturn {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(c => {
      const next = c + 1;
      if (options?.max !== undefined && next > options.max) return c;
      return next;
    });
  }, [options?.max]);

  const decrement = useCallback(() => {
    setCount(c => {
      const next = c - 1;
      if (options?.min !== undefined && next < options.min) return c;
      return next;
    });
  }, [options?.min]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return { count, increment, decrement, reset, setCount };
}
