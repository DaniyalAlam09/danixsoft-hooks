import { useCallback, useSyncExternalStore } from 'react';

export interface ScrollState {
  x: number;
  y: number;
}

const SERVER_SCROLL: ScrollState = { x: 0, y: 0 };
let cachedScroll: ScrollState = SERVER_SCROLL;

function subscribe(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}

function getSnapshot(): ScrollState {
  const { scrollX: x, scrollY: y } = window;
  if (cachedScroll.x !== x || cachedScroll.y !== y) cachedScroll = { x, y };
  return cachedScroll;
}

const getServerSnapshot = () => SERVER_SCROLL;

/**
 * The window scroll position plus a stable `scrollTo(y, x?)` helper.
 * Returns `{ x: 0, y: 0 }` on the server and during hydration.
 */
export function useWindowScroll(): [ScrollState, (y: number, x?: number) => void] {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const scrollTo = useCallback((y: number, x = 0) => {
    if (typeof window !== 'undefined') window.scrollTo(x, y);
  }, []);
  return [state, scrollTo];
}
