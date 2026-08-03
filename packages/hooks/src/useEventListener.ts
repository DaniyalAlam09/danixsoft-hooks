import { useEffect, useRef } from 'react';

export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: undefined,
  options?: boolean | AddEventListenerOptions
): void;
export function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement
>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element: React.RefObject<T>,
  options?: boolean | AddEventListenerOptions
): void;
export function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  element: Document,
  options?: boolean | AddEventListenerOptions
): void;

export function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  T extends HTMLElement | void = void
>(
  eventName: KW | KH,
  handler: (
    event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event
  ) => void,
  element?: React.RefObject<T> | Document | Window | null,
  options?: boolean | AddEventListenerOptions
) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement: T | Window | Document | null | undefined =
      element && 'current' in element ? element.current : element;
      
    if (!targetElement && typeof window !== 'undefined') {
      // default to window if no element is passed
      const win = window;
      const listener = (event: Event) => savedHandler.current(event);
      win.addEventListener(eventName, listener, options);
      return () => win.removeEventListener(eventName, listener, options);
    } else if (targetElement) {
      const listener = (event: Event) => savedHandler.current(event);
      targetElement.addEventListener(eventName, listener, options);
      return () => targetElement.removeEventListener(eventName, listener, options);
    }
  }, [eventName, element, options]);
}
