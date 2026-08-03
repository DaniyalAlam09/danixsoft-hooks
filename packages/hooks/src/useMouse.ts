import { useState, useEffect, RefObject } from 'react';

export interface MouseState {
  x: number;
  y: number;
  elementX: number;
  elementY: number;
  elementPositionX: number;
  elementPositionY: number;
}

export function useMouse(ref?: RefObject<HTMLElement | null>): MouseState {
  const [state, setState] = useState<MouseState>({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    elementPositionX: 0,
    elementPositionY: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleMouseMove = (event: MouseEvent) => {
      const newState: MouseState = {
        x: event.pageX,
        y: event.pageY,
        elementX: 0,
        elementY: 0,
        elementPositionX: 0,
        elementPositionY: 0,
      };

      if (ref?.current) {
        const { left, top } = ref.current.getBoundingClientRect();
        const elementPositionX = left + window.scrollX;
        const elementPositionY = top + window.scrollY;
        const elementX = event.pageX - elementPositionX;
        const elementY = event.pageY - elementPositionY;

        newState.elementX = elementX;
        newState.elementY = elementY;
        newState.elementPositionX = elementPositionX;
        newState.elementPositionY = elementPositionY;
      }

      setState(newState);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [ref]);

  return state;
}
