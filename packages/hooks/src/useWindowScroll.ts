import { useState, useEffect } from 'react';

interface ScrollState {
  x: number;
  y: number;
}

export function useWindowScroll(): [ScrollState, (y: number, x?: number) => void] {
  const [state, setState] = useState<ScrollState>({
    x: typeof window !== 'undefined' ? window.scrollX : 0,
    y: typeof window !== 'undefined' ? window.scrollY : 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setState({ x: window.scrollX, y: window.scrollY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (y: number, x = 0) => {
    if (typeof window !== 'undefined') {
      window.scrollTo(x, y);
    }
  };

  return [state, scrollTo];
}
