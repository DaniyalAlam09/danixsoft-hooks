import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useSwipe } from '../src/useSwipe';
import { useTouch } from '../src/useTouch';
import { useGeolocation } from '../src/useGeolocation';
import { useAudio } from '../src/useAudio';
import { useIntersectionObserver } from '../src/useIntersectionObserver';

afterEach(() => {
  vi.restoreAllMocks();
});

function touchEvent(type: string, x: number, y: number) {
  const event = new Event(type) as Event & Record<string, unknown>;
  const touch = { clientX: x, clientY: y };
  Object.assign(event, { touches: [touch], changedTouches: [touch], targetTouches: [touch] });
  return event;
}

describe('useSwipe', () => {
  it('detects direction past the threshold', () => {
    const { result } = renderHook(() => useSwipe(undefined, 50));
    act(() => {
      document.dispatchEvent(touchEvent('touchstart', 200, 100));
    });
    expect(result.current.swiping).toBe(true);
    act(() => {
      document.dispatchEvent(touchEvent('touchend', 100, 110));
    });
    expect(result.current).toMatchObject({ swiping: false, direction: 'left', distanceX: -100 });
  });

  it('ignores movements under the threshold', () => {
    const { result } = renderHook(() => useSwipe(undefined, 50));
    act(() => {
      document.dispatchEvent(touchEvent('touchstart', 0, 0));
      document.dispatchEvent(touchEvent('touchend', 10, 20));
    });
    expect(result.current.direction).toBeNull();
  });
});

describe('useTouch', () => {
  it('records the latest touch lists', () => {
    const { result } = renderHook(() => useTouch());
    expect(result.current.touches).toBeNull();
    act(() => {
      window.dispatchEvent(touchEvent('touchmove', 5, 6));
    });
    expect(result.current.touches).toHaveLength(1);
  });
});

describe('useGeolocation', () => {
  it('reports a position and clears its watch on unmount', () => {
    const clearWatch = vi.fn();
    const position = {
      coords: { accuracy: 5, altitude: null, altitudeAccuracy: null, heading: null, latitude: 31.5, longitude: 74.3, speed: null },
      timestamp: 1,
    };
    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: {
        getCurrentPosition: (ok: (p: unknown) => void) => ok(position),
        watchPosition: () => 7,
        clearWatch,
      },
    });
    const { result, unmount } = renderHook(() => useGeolocation());
    expect(result.current).toMatchObject({ loading: false, latitude: 31.5, longitude: 74.3 });
    unmount();
    expect(clearWatch).toHaveBeenCalledWith(7);
  });

  it('reports errors', () => {
    const error = { code: 1, message: 'denied' };
    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: {
        getCurrentPosition: (_: unknown, fail: (e: unknown) => void) => fail(error),
        watchPosition: () => 1,
        clearWatch: () => {},
      },
    });
    const { result } = renderHook(() => useGeolocation());
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(error);
  });
});

describe('useAudio', () => {
  it('plays, pauses and resets playing when play() is rejected', async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
    const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    const { result } = renderHook(() => useAudio('/sound.mp3'));
    act(() => result.current.play());
    expect(play).toHaveBeenCalled();
    expect(result.current.playing).toBe(true);
    act(() => result.current.toggle());
    expect(pause).toHaveBeenCalled();
    expect(result.current.playing).toBe(false);

    play.mockRejectedValueOnce(new DOMException('NotAllowedError'));
    await act(async () => {
      result.current.play();
    });
    expect(result.current.playing).toBe(false);
  });
});

describe('useIntersectionObserver', () => {
  it('returns the latest entry and freezes once visible when asked', () => {
    let callback: (entries: Partial<IntersectionObserverEntry>[]) => void = () => {};
    const disconnect = vi.fn();
    class FakeObserver {
      constructor(cb: typeof callback) {
        callback = cb;
      }
      observe() {}
      disconnect = disconnect;
      unobserve() {}
    }
    vi.stubGlobal('IntersectionObserver', FakeObserver);
    const element = document.createElement('div');
    const ref = { current: element };
    const { result } = renderHook(() => useIntersectionObserver(ref, { freezeOnceVisible: true }));
    act(() => callback([{ isIntersecting: true }]));
    expect(result.current?.isIntersecting).toBe(true);
    expect(disconnect).toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});

void React;
