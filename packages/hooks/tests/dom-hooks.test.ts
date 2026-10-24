import React from 'react';
import { renderHook, act, render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useEventListener } from '../src/useEventListener';
import { useClickAnyWhere } from '../src/useClickAnyWhere';
import { useHover } from '../src/useHover';
import { useCopyToClipboard } from '../src/useCopyToClipboard';
import { useScrollLock } from '../src/useScrollLock';
import { useScript } from '../src/useScript';
import { useMutationObserver } from '../src/useMutationObserver';
import { useMouse } from '../src/useMouse';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('useEventListener', () => {
  it('listens on window by default with the latest handler, and cleans up', () => {
    const first = vi.fn();
    const latest = vi.fn();
    const { rerender, unmount } = renderHook(({ h }) => useEventListener('resize', h), {
      initialProps: { h: first },
      wrapper: React.StrictMode,
    });
    rerender({ h: latest });
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledTimes(1);
    unmount();
    window.dispatchEvent(new Event('resize'));
    expect(latest).toHaveBeenCalledTimes(1);
  });

  it('listens on an element ref', () => {
    const handler = vi.fn();
    function Probe() {
      const ref = React.useRef<HTMLButtonElement>(null);
      useEventListener('click', handler, ref);
      return React.createElement('button', { ref }, 'b');
    }
    const { getByText } = render(React.createElement(Probe));
    fireEvent.click(getByText('b'));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});

describe('useClickAnyWhere', () => {
  it('calls the handler for document clicks', () => {
    const handler = vi.fn();
    const { unmount } = renderHook(() => useClickAnyWhere(handler));
    fireEvent.click(document.body);
    expect(handler).toHaveBeenCalledTimes(1);
    unmount();
    fireEvent.click(document.body);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});

describe('useHover', () => {
  it('tracks mouseenter and mouseleave', () => {
    let hovered = false;
    function Probe() {
      const [ref, isHovered] = useHover<HTMLDivElement>();
      hovered = isHovered;
      return React.createElement('div', { ref }, 'target');
    }
    const { getByText } = render(React.createElement(Probe));
    fireEvent.mouseEnter(getByText('target'));
    expect(hovered).toBe(true);
    fireEvent.mouseLeave(getByText('target'));
    expect(hovered).toBe(false);
  });
});

describe('useCopyToClipboard', () => {
  it('copies text and records it', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    const { result } = renderHook(() => useCopyToClipboard());
    let ok = false;
    await act(async () => {
      ok = await result.current[1]('hello');
    });
    expect(ok).toBe(true);
    expect(writeText).toHaveBeenCalledWith('hello');
    expect(result.current[0]).toBe('hello');
  });

  it('returns false when the clipboard rejects', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const writeText = vi.fn().mockRejectedValue(new Error('denied'));
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    const { result } = renderHook(() => useCopyToClipboard());
    let ok = true;
    await act(async () => {
      ok = await result.current[1]('x');
    });
    expect(ok).toBe(false);
    expect(result.current[0]).toBeNull();
  });
});

describe('useScrollLock', () => {
  it('locks body scroll and restores it on unlock and unmount', () => {
    document.body.style.overflow = 'auto';
    const { rerender, unmount } = renderHook(({ lock }) => useScrollLock(lock), {
      initialProps: { lock: true },
      wrapper: React.StrictMode,
    });
    expect(document.body.style.overflow).toBe('hidden');
    rerender({ lock: false });
    expect(document.body.style.overflow).toBe('auto');
    rerender({ lock: true });
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('auto');
    document.body.style.overflow = '';
  });
});

describe('useScript', () => {
  it('injects one script tag and reports load', () => {
    const src = 'https://example.com/widget.js';
    const { result } = renderHook(() => useScript(src));
    expect(result.current).toBe('loading');
    const scripts = document.querySelectorAll(`script[src="${src}"]`);
    expect(scripts).toHaveLength(1);
    act(() => {
      scripts[0].dispatchEvent(new Event('load'));
    });
    expect(result.current).toBe('ready');
    const second = renderHook(() => useScript(src));
    expect(second.result.current).toBe('ready');
    expect(document.querySelectorAll(`script[src="${src}"]`)).toHaveLength(1);
  });

  it('is idle without a src', () => {
    const { result } = renderHook(() => useScript(''));
    expect(result.current).toBe('idle');
  });
});

describe('useMutationObserver', () => {
  it('reports DOM mutations and disconnects on unmount', async () => {
    const callback = vi.fn();
    let node: HTMLDivElement | null = null;
    function Probe() {
      const ref = React.useRef<HTMLDivElement>(null);
      useMutationObserver(ref, callback);
      return React.createElement('div', {
        ref: (el: HTMLDivElement | null) => {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
          node = el;
        },
      });
    }
    const { unmount } = render(React.createElement(Probe));
    node!.appendChild(document.createElement('span'));
    await new Promise((r) => setTimeout(r, 0));
    expect(callback).toHaveBeenCalled();
    unmount();
  });
});

describe('useMouse', () => {
  it('tracks the pointer position', () => {
    const { result } = renderHook(() => useMouse());
    act(() => {
      const event = new MouseEvent('mousemove');
      Object.defineProperty(event, 'pageX', { value: 30 });
      Object.defineProperty(event, 'pageY', { value: 40 });
      document.dispatchEvent(event);
    });
    expect(result.current.x).toBe(30);
    expect(result.current.y).toBe(40);
  });
});
