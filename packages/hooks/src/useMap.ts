import { useState, useCallback } from 'react';

export interface MapActions<K, V> {
  set: (key: K, value: V) => void;
  setAll: (entries: Iterable<readonly [K, V]>) => void;
  remove: (key: K) => void;
  reset: () => void;
  clear: () => void;
}

export function useMap<K, V>(initialState: Iterable<readonly [K, V]> = []): [Omit<Map<K, V>, 'set' | 'clear' | 'delete'>, MapActions<K, V>] {
  const [map, setMap] = useState(new Map(initialState));

  const set = useCallback((key: K, value: V) => {
    setMap(prev => {
      const copy = new Map(prev);
      copy.set(key, value);
      return copy;
    });
  }, []);

  const setAll = useCallback((entries: Iterable<readonly [K, V]>) => {
    setMap(() => new Map(entries));
  }, []);

  const remove = useCallback((key: K) => {
    setMap(prev => {
      const copy = new Map(prev);
      copy.delete(key);
      return copy;
    });
  }, []);

  const reset = useCallback(() => {
    setMap(() => new Map(initialState));
  }, [initialState]);

  const clear = useCallback(() => {
    setMap(() => new Map());
  }, []);

  return [map, { set, setAll, remove, reset, clear }];
}
