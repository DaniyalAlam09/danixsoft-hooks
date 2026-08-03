import { useEffect, useRef } from 'react';

export function useScrollLock(lock = true) {
  const originalStyle = useRef<string | null>(null);

  useEffect(() => {
    if (lock) {
      originalStyle.current = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
    } else if (originalStyle.current !== null) {
      document.body.style.overflow = originalStyle.current;
    }

    return () => {
      if (lock && originalStyle.current !== null) {
        document.body.style.overflow = originalStyle.current;
      }
    };
  }, [lock]);
}
