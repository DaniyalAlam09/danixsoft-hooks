import { useState, useEffect, RefObject } from 'react';

export interface TouchState {
  touches: TouchList | null;
  targetTouches: TouchList | null;
  changedTouches: TouchList | null;
}

export function useTouch(ref?: RefObject<HTMLElement | null>): TouchState {
  const [state, setState] = useState<TouchState>({
    touches: null,
    targetTouches: null,
    changedTouches: null,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleTouch = (event: TouchEvent) => {
      setState({
        touches: event.touches,
        targetTouches: event.targetTouches,
        changedTouches: event.changedTouches,
      });
    };

    const target = ref?.current || window;
    
    target.addEventListener('touchstart', handleTouch as EventListener);
    target.addEventListener('touchmove', handleTouch as EventListener);
    target.addEventListener('touchend', handleTouch as EventListener);
    target.addEventListener('touchcancel', handleTouch as EventListener);

    return () => {
      target.removeEventListener('touchstart', handleTouch as EventListener);
      target.removeEventListener('touchmove', handleTouch as EventListener);
      target.removeEventListener('touchend', handleTouch as EventListener);
      target.removeEventListener('touchcancel', handleTouch as EventListener);
    };
  }, [ref]);

  return state;
}
