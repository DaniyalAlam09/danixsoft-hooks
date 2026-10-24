import { useSyncExternalStore } from 'react';

function subscribe(onChange: () => void) {
  window.addEventListener('resize', onChange);
  window.addEventListener('orientationchange', onChange);
  return () => {
    window.removeEventListener('resize', onChange);
    window.removeEventListener('orientationchange', onChange);
  };
}

// window.screen is one mutable object, so the snapshot is a key built from
// the values that change; React re-renders whenever the key changes.
function getSnapshot(): string {
  const s = window.screen;
  return [s.width, s.height, s.availWidth, s.availHeight, s.orientation?.type ?? ''].join('|');
}

const getServerSnapshot = () => '';

/**
 * The `window.screen` object, re-rendering when the screen size or
 * orientation changes. Returns `null` on the server and during hydration.
 */
export function useScreen(): Screen | null {
  const key = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return key === '' ? null : window.screen;
}
