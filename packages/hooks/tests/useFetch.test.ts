import { renderHook, act, waitFor } from '@testing-library/react';
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
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => new Promise(() => {}));
    
    const { result } = renderHook(() => useFetch('https://api.example.com/data'));
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
  });

  it('should fetch data successfully', async () => {
    const mockData = { id: 1, name: 'Danix' };
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useFetch('https://api.example.com/data'));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toEqual(mockData);
  });
});

describe('useFetch options', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('skips the request for a null URL or enabled: false', () => {
    const fetchMock = vi.fn();
    global.fetch = fetchMock;
    const a = renderHook(() => useFetch(null));
    const b = renderHook(() => useFetch('/x', { enabled: false }));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(a.result.current.isLoading).toBe(false);
    expect(b.result.current.isLoading).toBe(false);
  });

  it('does not refetch for an equal inline options object, and refetch() runs again', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ n: 1 }) });
    global.fetch = fetchMock;
    const { result, rerender } = renderHook(() =>
      useFetch('/x', { headers: { accept: 'application/json' } })
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    rerender();
    rerender();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    act(() => result.current.refetch());
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
  });

  it('reports HTTP errors and uses a custom parser', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500, statusText: 'Server Error' });
    const failing = renderHook(() => useFetch('/fail'));
    await waitFor(() => expect(failing.result.current.error?.message).toContain('500'));

    global.fetch = vi.fn().mockResolvedValue({ ok: true, text: async () => 'plain' });
    const parsed = renderHook(() =>
      useFetch<string>('/text', { parse: (response) => response.text() })
    );
    await waitFor(() => expect(parsed.result.current.data).toBe('plain'));
  });

  it('aborts the request on unmount', () => {
    let signal: AbortSignal | undefined;
    global.fetch = vi.fn((_: unknown, init?: RequestInit) => {
      signal = init?.signal ?? undefined;
      return new Promise(() => {});
    }) as unknown as typeof fetch;
    const { unmount } = renderHook(() => useFetch('/slow'));
    unmount();
    expect(signal?.aborted).toBe(true);
  });
});
