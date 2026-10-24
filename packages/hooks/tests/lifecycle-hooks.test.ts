import React from 'react';
import { renderHook, act, render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useIsClient } from '../src/useIsClient';
import { useIsMounted } from '../src/useIsMounted';
import { useUnmount } from '../src/useUnmount';
import { useUpdateEffect } from '../src/useUpdateEffect';
import { useEvent } from '../src/useEvent';
import { useDocumentTitle } from '../src/useDocumentTitle';
import { useIsomorphicLayoutEffect } from '../src/useIsomorphicLayoutEffect';
import { hydrate } from './helpers/hydration';

const strict = { wrapper: React.StrictMode };

describe('lifecycle hooks', () => {
  it('useIsClient is true after mount and hydrates without a mismatch', async () => {
    const { result } = renderHook(() => useIsClient());
    expect(result.current).toBe(true);

    function Probe() {
      return React.createElement('span', null, useIsClient() ? 'client' : 'server');
    }
    const { errors, container, serverHtml, cleanup } = await hydrate(React.createElement(Probe));
    expect(serverHtml).toContain('server');
    expect(errors).toEqual([]);
    expect(container.textContent).toBe('client');
    cleanup();
  });

  it('useIsMounted reports mount state, also under StrictMode', () => {
    const { result, unmount } = renderHook(() => useIsMounted(), strict);
    const isMounted = result.current;
    expect(isMounted()).toBe(true);
    unmount();
    expect(isMounted()).toBe(false);
  });

  it('useUnmount calls the latest callback on unmount', () => {
    const first = vi.fn();
    const latest = vi.fn();
    const { rerender, unmount } = renderHook(({ cb }) => useUnmount(cb), {
      initialProps: { cb: first },
    });
    rerender({ cb: latest });
    unmount();
    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledTimes(1);
  });

  it('useUpdateEffect skips the first render, including under StrictMode', () => {
    const effect = vi.fn();
    const { rerender } = renderHook(({ dep }) => useUpdateEffect(effect, [dep]), {
      initialProps: { dep: 1 },
      ...strict,
    });
    expect(effect).not.toHaveBeenCalled();
    rerender({ dep: 2 });
    expect(effect).toHaveBeenCalledTimes(1);
    rerender({ dep: 2 });
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('useEvent returns a stable function that calls the latest handler', () => {
    const { result, rerender } = renderHook(({ n }) => useEvent(() => n), {
      initialProps: { n: 1 },
    });
    const fn = result.current;
    rerender({ n: 2 });
    expect(result.current).toBe(fn);
    expect(fn()).toBe(2);
  });

  it('useDocumentTitle sets document.title', () => {
    const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: 'First' },
    });
    expect(document.title).toBe('First');
    rerender({ title: 'Second' });
    expect(document.title).toBe('Second');
  });

  it('useIsomorphicLayoutEffect runs before paint in the browser', () => {
    const order: string[] = [];
    function Probe() {
      useIsomorphicLayoutEffect(() => {
        order.push('layout');
      }, []);
      React.useEffect(() => {
        order.push('effect');
      }, []);
      return null;
    }
    act(() => {
      render(React.createElement(Probe));
    });
    expect(order).toEqual(['layout', 'effect']);
  });
});
