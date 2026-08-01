import { renderHook } from '@testing-library/react';
import { useInfiniteScroll } from '../src/useInfiniteScroll';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('useInfiniteScroll', () => {
  let mockIntersectionObserver: any;

  beforeEach(() => {
    mockIntersectionObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    window.IntersectionObserver = mockIntersectionObserver;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize and return ref', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useInfiniteScroll(callback));
    expect(result.current).toHaveProperty('current');
  });
});
