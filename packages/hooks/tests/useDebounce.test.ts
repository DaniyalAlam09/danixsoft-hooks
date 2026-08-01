import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../src/useDebounce';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return initial value', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce the value change', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    expect(result.current).toBe('initial');

    rerender({ value: 'updated', delay: 500 });
    
    // Value shouldn't change immediately
    expect(result.current).toBe('initial');

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });
});
