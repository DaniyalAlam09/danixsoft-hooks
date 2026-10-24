import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useCookie } from '../src/useCookie';
import { hydrate } from './helpers/hydration';

function clearCookies() {
  for (const part of document.cookie.split(';')) {
    const name = part.split('=')[0].trim();
    if (name) document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}

function Consent() {
  const [value] = useCookie('consent');
  return React.createElement('span', null, value ?? 'none');
}

describe('useCookie', () => {
  beforeEach(clearCookies);

  it('returns null when the cookie is not set', () => {
    const { result } = renderHook(() => useCookie('missing'));
    expect(result.current[0]).toBeNull();
  });

  it('sets, encodes and deletes a cookie', () => {
    const { result } = renderHook(() => useCookie('pref'));
    act(() => result.current[1]('a; b=c'));
    expect(result.current[0]).toBe('a; b=c');
    expect(document.cookie).toContain('pref=a%3B%20b%3Dc');
    act(() => result.current[2]());
    expect(result.current[0]).toBeNull();
  });

  it('does not match a cookie whose name only ends with the requested name', () => {
    document.cookie = 'xtheme=dark; path=/';
    const { result } = renderHook(() => useCookie('theme'));
    expect(result.current[0]).toBeNull();
  });

  it('treats regex characters in the name literally', () => {
    document.cookie = 'a.b=1; path=/';
    document.cookie = 'axb=2; path=/';
    const { result } = renderHook(() => useCookie('a.b'));
    expect(result.current[0]).toBe('1');
  });

  it('keeps every hook for the same cookie in sync', () => {
    const a = renderHook(() => useCookie('lang'));
    const b = renderHook(() => useCookie('lang'));
    act(() => a.result.current[1]('ur'));
    expect(b.result.current[0]).toBe('ur');
  });

  it('hydrates without a mismatch when the cookie is set', async () => {
    document.cookie = 'consent=yes; path=/';
    const { errors, container, cleanup } = await hydrate(React.createElement(Consent));
    expect(errors).toEqual([]);
    expect(container.textContent).toBe('yes');
    cleanup();
  });
});
