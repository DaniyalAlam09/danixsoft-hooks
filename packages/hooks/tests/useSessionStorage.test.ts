import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useSessionStorage } from '../src/useSessionStorage';
import { hydrate } from './helpers/hydration';

function Draft() {
  const [value] = useSessionStorage('draft', 'empty');
  return React.createElement('span', null, value);
}

describe('useSessionStorage', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    window.localStorage.clear();
  });

  it('writes to sessionStorage, not localStorage', () => {
    const { result } = renderHook(() => useSessionStorage('k', 1));
    act(() => result.current[1](2));
    expect(result.current[0]).toBe(2);
    expect(window.sessionStorage.getItem('k')).toBe('2');
    expect(window.localStorage.getItem('k')).toBeNull();
  });

  it('applies functional updates against the latest value', () => {
    const { result } = renderHook(() => useSessionStorage('n', 0));
    act(() => {
      result.current[1]((n) => n + 5);
      result.current[1]((n) => n * 2);
    });
    expect(result.current[0]).toBe(10);
  });

  it('removeValue resets to the initial value', () => {
    const { result } = renderHook(() => useSessionStorage('r', 'a'));
    act(() => result.current[1]('b'));
    act(() => result.current[2]());
    expect(result.current[0]).toBe('a');
  });

  it('hydrates without a mismatch when a value is stored', async () => {
    window.sessionStorage.setItem('draft', JSON.stringify('saved draft'));
    const { errors, container, cleanup } = await hydrate(React.createElement(Draft));
    expect(errors).toEqual([]);
    expect(container.textContent).toBe('saved draft');
    cleanup();
  });
});
