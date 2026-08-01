import { renderHook, act } from '@testing-library/react';
import { usePagination } from '../src/usePagination';
import { describe, it, expect } from 'vitest';

describe('usePagination', () => {
  const data = Array.from({ length: 50 }, (_, i) => i + 1);

  it('should return initial page correctly', () => {
    const { result } = renderHook(() => usePagination(data, 10));
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(5);
    expect(result.current.currentData).toEqual(data.slice(0, 10));
  });

  it('should go to next page', () => {
    const { result } = renderHook(() => usePagination(data, 10));

    act(() => {
      result.current.next();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentData).toEqual(data.slice(10, 20));
  });
});
