import { renderHook } from '@testing-library/react';
import { useFetch } from '../src/useFetch';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('useFetch', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should set loading to true initially', () => {
    (global.fetch as any).mockImplementation(() => new Promise(() => {}));
    
    const { result } = renderHook(() => useFetch('https://api.example.com/data'));
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
  });

  it('should fetch data successfully', async () => {
    const mockData = { id: 1, name: 'Danix' };
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useFetch('https://api.example.com/data'));

    // Wait for the next tick to allow the async fetch to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockData);
  });
});
