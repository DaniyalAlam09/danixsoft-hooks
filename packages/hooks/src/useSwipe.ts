import { useState, useEffect, RefObject } from 'react';

export interface SwipeState {
  swiping: boolean;
  direction: 'up' | 'down' | 'left' | 'right' | null;
  distanceX: number;
  distanceY: number;
}

export function useSwipe(ref?: RefObject<HTMLElement | null>, threshold = 50): SwipeState {
  const [state, setState] = useState<SwipeState>({
    swiping: false,
    direction: null,
    distanceX: 0,
    distanceY: 0,
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const target = ref?.current || document;
    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e: Event) => {
      const event = e as TouchEvent;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
      setState({ swiping: true, direction: null, distanceX: 0, distanceY: 0 });
    };

    const handleTouchEnd = (e: Event) => {
      const event = e as TouchEvent;
      if (event.changedTouches.length === 0) return;
      
      const endX = event.changedTouches[0].clientX;
      const endY = event.changedTouches[0].clientY;
      const distanceX = endX - startX;
      const distanceY = endY - startY;
      
      let direction: SwipeState['direction'] = null;
      
      if (Math.abs(distanceX) > Math.abs(distanceY)) {
        if (Math.abs(distanceX) > threshold) {
          direction = distanceX > 0 ? 'right' : 'left';
        }
      } else {
        if (Math.abs(distanceY) > threshold) {
          direction = distanceY > 0 ? 'down' : 'up';
        }
      }

      setState({ swiping: false, direction, distanceX, distanceY });
    };

    target.addEventListener('touchstart', handleTouchStart);
    target.addEventListener('touchend', handleTouchEnd);

    return () => {
      target.removeEventListener('touchstart', handleTouchStart);
      target.removeEventListener('touchend', handleTouchEnd);
    };
  }, [ref, threshold]);

  return state;
}
