import { renderHook } from '@testing-library/react';
import { useWindowSize } from '../src/useWindowSize';
import { describe, it, expect, vi } from 'vitest';

describe('useWindowSize', () => {
  it('should return current window size', () => {
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.width).toBe(window.innerWidth);
    expect(result.current.height).toBe(window.innerHeight);
  });
});
