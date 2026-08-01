import { renderHook } from '@testing-library/react';
import { useOnScreen } from '../src/useOnScreen';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('useOnScreen', () => {
  beforeEach(() => {
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize and return boolean', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() => useOnScreen(ref));
    expect(typeof result.current).toBe('boolean');
  });
});
