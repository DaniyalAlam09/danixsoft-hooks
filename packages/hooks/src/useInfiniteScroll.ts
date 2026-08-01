import { useEffect, useRef, RefObject } from 'react';

export function useInfiniteScroll<T extends HTMLElement>(
  callback: () => void,
  options: IntersectionObserverInit = { root: null, rootMargin: '0px', threshold: 1.0 }
) {
  const elementRef = useRef<T>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callbackRef.current();
      }
    }, options);

    observer.observe(element);
    
    return () => {
      observer.unobserve(element);
    };
  }, [options.root, options.rootMargin, options.threshold]);

  return elementRef as RefObject<T>;
}
