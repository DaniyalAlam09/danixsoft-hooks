import { renderHook } from '@testing-library/react';
import { usePrevious } from '../src/usePrevious';
import { describe, it, expect } from 'vitest';

describe('usePrevious', () => {
  it('should return undefined on initial render', () => {
    const { result } = renderHook(() => usePrevious(0));
    expect(result.current).toBeUndefined();
  });

  it('should return the previous value after a re-render', () => {
    const { result, rerender } = renderHook(({ val }) => usePrevious(val), {
      initialProps: { val: 0 },
    });

    rerender({ val: 1 });
    expect(result.current).toBe(0);

    rerender({ val: 2 });
    expect(result.current).toBe(1);
  });
});
