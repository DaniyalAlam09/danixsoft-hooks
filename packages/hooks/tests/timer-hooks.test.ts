import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useInterval } from '../src/useInterval';
import { useTimeout } from '../src/useTimeout';
import { useCountdown } from '../src/useCountdown';

const strict = { wrapper: React.StrictMode };

describe('timers', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('useInterval calls the latest callback and stops on null or unmount', () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender, unmount } = renderHook(
      ({ cb, delay }: { cb: () => void; delay: number | null }) => useInterval(cb, delay),
      { initialProps: { cb: first, delay: 100 as number | null }, ...strict }
    );
    act(() => vi.advanceTimersByTime(250));
    expect(first).toHaveBeenCalledTimes(2);
    rerender({ cb: second, delay: 100 });
    act(() => vi.advanceTimersByTime(100));
    expect(second).toHaveBeenCalledTimes(1);
    rerender({ cb: second, delay: null });
    act(() => vi.advanceTimersByTime(500));
    expect(second).toHaveBeenCalledTimes(1);
    rerender({ cb: second, delay: 100 });
    unmount();
    act(() => vi.advanceTimersByTime(500));
    expect(second).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('useTimeout fires once, and not at all when cleared', () => {
    const cb = vi.fn();
    const { rerender } = renderHook(
      ({ delay }: { delay: number | null }) => useTimeout(cb, delay),
      { initialProps: { delay: 100 as number | null }, ...strict }
    );
    act(() => vi.advanceTimersByTime(500));
    expect(cb).toHaveBeenCalledTimes(1);

    const never = vi.fn();
    const second = renderHook(
      ({ delay }: { delay: number | null }) => useTimeout(never, delay),
      { initialProps: { delay: 100 as number | null } }
    );
    second.rerender({ delay: null });
    act(() => vi.advanceTimersByTime(500));
    expect(never).not.toHaveBeenCalled();
    rerender({ delay: null });
  });

  it('useCountdown counts down, pauses, resets and calls onEnd once', () => {
    const onEnd = vi.fn();
    // Inline options object, as users write it: must not restart the interval.
    const { result } = renderHook(() => useCountdown(3, { interval: 1000, onEnd }), strict);
    act(() => result.current.start());
    expect(result.current.isCounting).toBe(true);
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.count).toBe(2);
    act(() => result.current.pause());
    act(() => vi.advanceTimersByTime(5000));
    expect(result.current.count).toBe(2);
    act(() => result.current.start());
    act(() => vi.advanceTimersByTime(2000));
    expect(result.current.count).toBe(0);
    expect(result.current.isCounting).toBe(false);
    expect(onEnd).toHaveBeenCalledTimes(1);
    act(() => vi.advanceTimersByTime(5000));
    expect(onEnd).toHaveBeenCalledTimes(1);
    act(() => result.current.reset());
    expect(result.current.count).toBe(3);
  });
});
