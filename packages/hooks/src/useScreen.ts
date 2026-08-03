import { useState, useEffect } from 'react';

export function useScreen() {
  const [screen, setScreen] = useState<Screen | null>(() => 
    typeof window !== 'undefined' ? window.screen : null
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setScreen(window.screen);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screen;
}
