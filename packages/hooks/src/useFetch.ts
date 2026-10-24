import { useState, useEffect, useRef, useCallback } from 'react';

export interface FetchState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

export interface UseFetchOptions<T> extends RequestInit {
  /** Set to false to skip the request (for example until an id is known). Defaults to true. */
  enabled?: boolean;
  /** Reads the response body. Defaults to `response.json()`. */
  parse?: (response: Response) => Promise<T>;
}

export interface UseFetchResult<T> extends FetchState<T> {
  /** Runs the request again with the current URL and options. */
  refetch: () => void;
}

/**
 * Fetches `url` and tracks data, error and loading state.
 *
 * - Pass `null` as the URL, or `enabled: false`, to skip the request.
 * - In-flight requests are aborted when the URL or options change and on unmount.
 * - Options are compared by value (JSON), so inline objects don't refetch
 *   every render; pass a memoised object if it holds non-JSON values.
 *
 * For caching, deduplication and background revalidation, use a data library
 * such as TanStack Query; this hook deliberately stays small.
 */
export function useFetch<T = unknown>(
  url: string | null,
  options?: UseFetchOptions<T>
): UseFetchResult<T> {
  const enabled = (options?.enabled ?? true) && url !== null;

  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    isLoading: enabled,
  });
  const [reloadToken, setReloadToken] = useState(0);

  // Latest options without making them an effect dependency.
  const optionsRef = useRef(options);
  optionsRef.current = options;

  let optionsKey = '';
  try {
    const { parse: _parse, enabled: _enabled, signal: _signal, ...init } = options ?? {};
    void _parse;
    void _enabled;
    void _signal;
    optionsKey = JSON.stringify(init);
  } catch {
    optionsKey = String(Math.random());
  }

  useEffect(() => {
    if (!enabled || url === null) {
      setState((previous) => (previous.isLoading ? { ...previous, isLoading: false } : previous));
      return;
    }

    const controller = new AbortController();
    const { parse, enabled: _enabled, ...init } = optionsRef.current ?? {};
    void _enabled;

    setState({ data: null, error: null, isLoading: true });

    (async () => {
      try {
        const response = await fetch(url, { ...init, signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = parse ? await parse(response) : ((await response.json()) as T);
        if (!controller.signal.aborted) setState({ data, error: null, isLoading: false });
      } catch (error) {
        if (controller.signal.aborted) return;
        if (error instanceof Error && error.name === 'AbortError') return;
        setState({
          data: null,
          error: error instanceof Error ? error : new Error(String(error)),
          isLoading: false,
        });
      }
    })();

    return () => controller.abort();
  }, [url, enabled, optionsKey, reloadToken]);

  const refetch = useCallback(() => setReloadToken((n) => n + 1), []);

  return { ...state, refetch };
}
