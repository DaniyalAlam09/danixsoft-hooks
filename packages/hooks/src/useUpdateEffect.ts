import { useEffect, useRef, DependencyList, EffectCallback } from 'react';

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
    } else {
      return effect();
    }
  }, deps);
}
