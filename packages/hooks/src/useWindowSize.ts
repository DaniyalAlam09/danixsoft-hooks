import { useSyncExternalStore } from 'react';

export interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

const SERVER_SIZE: WindowSize = { width: undefined, height: undefined };
let cachedSize: WindowSize = SERVER_SIZE;

function subscribe(onChange: () => void) {
  window.addEventListener('resize', onChange);
  return () => window.removeEventListener('resize', onChange);
}

function getSnapshot(): WindowSize {
  const { innerWidth: width, innerHeight: height } = window;
  if (cachedSize.width !== width || cachedSize.height !== height) {
    cachedSize = { width, height };
  }
  return cachedSize;
}

const getServerSnapshot = () => SERVER_SIZE;

/**
 * The browser window's inner width and height, updated on resize.
 *
 * Returns `{ width: undefined, height: undefined }` on the server and during
 * hydration (so there is no mismatch); client-only renders get the real size
 * on the first render.
 */
export function useWindowSize(): WindowSize {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
