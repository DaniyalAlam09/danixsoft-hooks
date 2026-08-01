import { useState, useEffect, RefObject } from 'react';

export function useOnScreen<T extends Element>(
  ref: RefObject<T>,
  rootMargin: string = '0px'
): boolean {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin }
    );

    observer.observe(element);
    return () => {
      observer.unobserve(element);
    };
  }, [ref, rootMargin]);

  return isIntersecting;
}
