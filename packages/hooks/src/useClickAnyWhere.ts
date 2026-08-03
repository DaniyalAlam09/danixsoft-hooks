import { useEffect } from 'react';

export function useClickAnyWhere(handler: (event: MouseEvent) => void) {
  useEffect(() => {
    const handleEvent = (event: MouseEvent) => {
      handler(event);
    };

    document.addEventListener('click', handleEvent);
    return () => {
      document.removeEventListener('click', handleEvent);
    };
  }, [handler]);
}
