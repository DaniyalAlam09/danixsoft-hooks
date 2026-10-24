// @vitest-environment node
import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import * as hooks from '../src';

/**
 * Every exported hook must render on the server (no window/document) without
 * throwing, and return its documented server value.
 */

type Probe = () => unknown;

const ref = { current: null };
const noop = () => {};

const probes: Record<string, Probe> = {
  useAudio: () => hooks.useAudio('/a.mp3').playing,
  useBoolean: () => hooks.useBoolean(true).value,
  useClickAnyWhere: () => hooks.useClickAnyWhere(noop),
  useClickAnywhere: () => hooks.useClickAnywhere(noop),
  useClickOutside: () => hooks.useClickOutside(ref, noop),
  useCookie: () => hooks.useCookie('c')[0],
  useCopyToClipboard: () => hooks.useCopyToClipboard()[0],
  useCountdown: () => hooks.useCountdown(5).count,
  useCounter: () => hooks.useCounter(2).count,
  useDebounce: () => hooks.useDebounce('v', 100),
  useDocumentTitle: () => hooks.useDocumentTitle('t'),
  useEvent: () => typeof hooks.useEvent(noop),
  useEventListener: () => hooks.useEventListener('resize', noop),
  useFetch: () => hooks.useFetch('/x').isLoading,
  useForm: () => hooks.useForm({ initialValues: { a: '' }, onSubmit: noop }).values.a,
  useGeolocation: () => hooks.useGeolocation().loading,
  useHover: () => hooks.useHover()[1],
  useInfiniteScroll: () => hooks.useInfiniteScroll(noop),
  useIntersectionObserver: () => hooks.useIntersectionObserver(ref),
  useInterval: () => hooks.useInterval(noop, 100),
  useIsClient: () => hooks.useIsClient(),
  useIsMounted: () => hooks.useIsMounted()(),
  useIsomorphicLayoutEffect: () => hooks.useIsomorphicLayoutEffect(noop, []),
  useLocalStorage: () => hooks.useLocalStorage('k', 'initial')[0],
  useMap: () => hooks.useMap([['a', 1]])[0].get('a'),
  useMediaQuery: () => hooks.useMediaQuery('(min-width: 1px)'),
  useMouse: () => hooks.useMouse().x,
  useMutationObserver: () => hooks.useMutationObserver(ref, noop),
  useOnScreen: () => hooks.useOnScreen(ref),
  useOnlineState: () => hooks.useOnlineState(),
  usePagination: () => hooks.usePagination([1, 2, 3], 2).currentPage,
  usePrevious: () => hooks.usePrevious(1),
  useScreen: () => hooks.useScreen(),
  useScript: () => hooks.useScript('/s.js'),
  useScrollLock: () => hooks.useScrollLock(true),
  useSessionStorage: () => hooks.useSessionStorage('k', 'initial')[0],
  useStep: () => hooks.useStep(3)[0],
  useSwipe: () => hooks.useSwipe().swiping,
  useTimeout: () => hooks.useTimeout(noop, 100),
  useToggle: () => hooks.useToggle(true)[0],
  useTouch: () => hooks.useTouch().touches,
  useUnmount: () => hooks.useUnmount(noop),
  useUpdateEffect: () => hooks.useUpdateEffect(noop, []),
  useWindowScroll: () => hooks.useWindowScroll()[0],
  useWindowSize: () => hooks.useWindowSize(),
};

function serverValue(probe: Probe): unknown {
  let value: unknown;
  function Probe() {
    value = probe();
    return null;
  }
  renderToString(React.createElement(Probe));
  return value;
}

describe('server rendering', () => {
  it('runs in an environment without window or document', () => {
    expect(typeof window).toBe('undefined');
    expect(typeof document).toBe('undefined');
  });

  it('has a probe for every exported hook', () => {
    const exported = Object.keys(hooks).filter((name) => name.startsWith('use')).sort();
    expect(Object.keys(probes).sort()).toEqual(exported);
  });

  for (const [name, probe] of Object.entries(probes)) {
    it(`${name} renders on the server`, () => {
      expect(() => serverValue(probe)).not.toThrow();
    });
  }

  it('returns the documented server values', () => {
    expect(serverValue(probes.useLocalStorage)).toBe('initial');
    expect(serverValue(probes.useSessionStorage)).toBe('initial');
    expect(serverValue(probes.useCookie)).toBeNull();
    expect(serverValue(probes.useMediaQuery)).toBe(false);
    expect(serverValue(() => hooks.useMediaQuery('(x)', { defaultValue: true }))).toBe(true);
    expect(serverValue(probes.useWindowSize)).toEqual({ width: undefined, height: undefined });
    expect(serverValue(probes.useWindowScroll)).toEqual({ x: 0, y: 0 });
    expect(serverValue(probes.useOnlineState)).toBe(true);
    expect(serverValue(probes.useScreen)).toBeNull();
    expect(serverValue(probes.useIsClient)).toBe(false);
    expect(serverValue(probes.useHover)).toBe(false);
    expect(serverValue(probes.useFetch)).toBe(true);
  });
});
