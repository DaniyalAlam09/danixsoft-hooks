import { useEffect, RefObject } from 'react';

export function useMutationObserver(
  ref: RefObject<HTMLElement | null>,
  callback: MutationCallback,
  options: MutationObserverInit = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  }
) {
  useEffect(() => {
    if (!ref.current || typeof window === 'undefined') return;
    
    const observer = new MutationObserver(callback);
    observer.observe(ref.current, options);
    
    return () => observer.disconnect();
  }, [ref, callback, options]);
}
