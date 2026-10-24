import { useSyncExternalStore } from 'react';

function subscribe(onChange: () => void) {
  window.addEventListener('online', onChange);
  window.addEventListener('offline', onChange);
  return () => {
    window.removeEventListener('online', onChange);
    window.removeEventListener('offline', onChange);
  };
}

const getSnapshot = () => window.navigator.onLine;
const getServerSnapshot = () => true;

/**
 * Whether the browser reports a network connection (`navigator.onLine`).
 *
 * Returns `true` on the server and during hydration, then the real value.
 */
export function useOnlineState(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
