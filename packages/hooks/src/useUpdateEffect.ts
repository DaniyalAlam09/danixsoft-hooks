import { useEffect, useRef, DependencyList, EffectCallback } from 'react';

/** Like useEffect, but skips the first render (also under StrictMode). */
export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirstMount = useRef(true);

  // Runs its cleanup before StrictMode's simulated remount, so the remount is
  // treated as a first mount again instead of firing the effect.
  useEffect(() => {
    return () => {
      isFirstMount.current = true;
    };
  }, []);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    return effect();
  }, deps);
}
