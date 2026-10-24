import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useMediaQuery } from '../src/useMediaQuery';
import { useWindowSize } from '../src/useWindowSize';
import { useOnlineState } from '../src/useOnlineState';
import { useScreen } from '../src/useScreen';
import { useWindowScroll } from '../src/useWindowScroll';
import { hydrate } from './helpers/hydration';

type Listener = () => void;

function mockMatchMedia(initial: boolean) {
  let matches = initial;
  const listeners = new Set<Listener>();
  const mql = (query: string) => ({
    get matches() {
      return matches;
    },
    media: query,
    onchange: null,
    addEventListener: (_: string, l: Listener) => listeners.add(l),
    removeEventListener: (_: string, l: Listener) => listeners.delete(l),
    addListener: (l: Listener) => listeners.add(l),
    removeListener: (l: Listener) => listeners.delete(l),
    dispatchEvent: () => true,
  });
  Object.defineProperty(window, 'matchMedia', { writable: true, configurable: true, value: vi.fn(mql) });
  return {
    set(next: boolean) {
      matches = next;
      listeners.forEach((l) => l());
    },
    listeners,
  };
}

describe('useMediaQuery', () => {
  it('returns the real value on the first client render (no flash)', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(true);
  });

  it('updates on change and removes its listener on unmount', () => {
    const media = mockMatchMedia(false);
    const { result, unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'), {
      wrapper: React.StrictMode,
    });
    expect(result.current).toBe(false);
    act(() => media.set(true));
    expect(result.current).toBe(true);
    unmount();
    expect(media.listeners.size).toBe(0);
  });

  it('hydrates from defaultValue without a mismatch, then shows the real value', async () => {
    mockMatchMedia(true);
    function Probe() {
      return React.createElement('span', null, useMediaQuery('(x)') ? 'wide' : 'narrow');
    }
    const { errors, container, serverHtml, cleanup } = await hydrate(React.createElement(Probe));
    expect(serverHtml).toContain('narrow');
    expect(errors).toEqual([]);
    expect(container.textContent).toBe('wide');
    cleanup();
  });
});

describe('useWindowSize', () => {
  it('returns the current size and follows resizes', () => {
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.width).toBe(window.innerWidth);
    act(() => {
      Object.defineProperty(window, 'innerWidth', { configurable: true, value: 500 });
      window.dispatchEvent(new Event('resize'));
    });
    expect(result.current.width).toBe(500);
  });

  it('returns a stable object while the size is unchanged', () => {
    const { result, rerender } = renderHook(() => useWindowSize());
    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
  });

  it('hydrates without a mismatch', async () => {
    function Probe() {
      const { width } = useWindowSize();
      return React.createElement('span', null, width === undefined ? 'unknown' : String(width));
    }
    const { errors, container, cleanup } = await hydrate(React.createElement(Probe));
    expect(errors).toEqual([]);
    expect(container.textContent).toBe(String(window.innerWidth));
    cleanup();
  });
});

describe('useOnlineState', () => {
  let online = true;
  beforeEach(() => {
    online = true;
    vi.spyOn(window.navigator, 'onLine', 'get').mockImplementation(() => online);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('follows online and offline events', () => {
    const { result } = renderHook(() => useOnlineState());
    expect(result.current).toBe(true);
    act(() => {
      online = false;
      window.dispatchEvent(new Event('offline'));
    });
    expect(result.current).toBe(false);
    act(() => {
      online = true;
      window.dispatchEvent(new Event('online'));
    });
    expect(result.current).toBe(true);
  });
});

describe('useScreen', () => {
  it('returns window.screen on the client', () => {
    const { result } = renderHook(() => useScreen());
    expect(result.current).toBe(window.screen);
  });
});

describe('useWindowScroll', () => {
  it('tracks scroll position and exposes a stable scrollTo', () => {
    const scrollTo = vi.fn();
    Object.defineProperty(window, 'scrollTo', { configurable: true, writable: true, value: scrollTo });
    const { result, rerender } = renderHook(() => useWindowScroll());
    expect(result.current[0]).toEqual({ x: 0, y: 0 });
    act(() => {
      Object.defineProperty(window, 'scrollY', { configurable: true, value: 120 });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current[0].y).toBe(120);
    const fn = result.current[1];
    rerender();
    expect(result.current[1]).toBe(fn);
    fn(40, 10);
    expect(scrollTo).toHaveBeenCalledWith(10, 40);
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 });
  });
});
