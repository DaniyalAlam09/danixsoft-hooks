import { useEffect, useRef } from 'react';

/**
 * Calls `handler` for every click anywhere in the document.
 * The latest handler is always used, so an inline function does not
 * re-subscribe on every render.
 */
export function useClickAnyWhere(handler: (event: MouseEvent) => void) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const handleEvent = (event: MouseEvent) => handlerRef.current(event);
    document.addEventListener('click', handleEvent);
    return () => {
      document.removeEventListener('click', handleEvent);
    };
  }, []);
}

/**
 * Conventional casing of {@link useClickAnyWhere}; same hook.
 * `useClickAnyWhere` remains supported.
 */
export { useClickAnyWhere as useClickAnywhere };
