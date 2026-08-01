import { useState, useEffect, useRef } from 'react';

interface FetchState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

export function useFetch<T = unknown>(url: string, options?: RequestInit) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    isLoading: true,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortControllerRef.current = new AbortController();
    
    const fetchData = async () => {
      setState({ data: null, error: null, isLoading: true });
      
      try {
        const response = await fetch(url, {
          ...options,
          signal: abortControllerRef.current?.signal,
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
        const data = (await response.json()) as T;
        
        setState({ data, error: null, isLoading: false });
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return; // Ignored abort errors
        }
        setState({ data: null, error: error as Error, isLoading: false });
      }
    };
    
    fetchData();
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url, JSON.stringify(options)]); // simplistic deep dependency check for options

  return state;
}
