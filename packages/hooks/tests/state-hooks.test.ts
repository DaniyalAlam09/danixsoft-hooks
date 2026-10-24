import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useBoolean } from '../src/useBoolean';
import { useCounter } from '../src/useCounter';
import { useMap } from '../src/useMap';
import { useStep } from '../src/useStep';

const strict = { wrapper: React.StrictMode };

describe('useBoolean', () => {
  it('sets, clears and toggles', () => {
    const { result } = renderHook(() => useBoolean(), strict);
    expect(result.current.value).toBe(false);
    act(() => result.current.setTrue());
    expect(result.current.value).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.value).toBe(false);
    act(() => result.current.setValue(true));
    act(() => result.current.setFalse());
    expect(result.current.value).toBe(false);
  });

  it('keeps callbacks stable', () => {
    const { result, rerender } = renderHook(() => useBoolean(true));
    const { toggle, setTrue, setFalse } = result.current;
    act(() => toggle());
    rerender();
    expect(result.current.toggle).toBe(toggle);
    expect(result.current.setTrue).toBe(setTrue);
    expect(result.current.setFalse).toBe(setFalse);
  });
});

describe('useCounter', () => {
  it('increments, decrements and resets', () => {
    const { result } = renderHook(() => useCounter(5), strict);
    act(() => result.current.increment());
    act(() => result.current.increment());
    expect(result.current.count).toBe(7);
    act(() => result.current.decrement());
    expect(result.current.count).toBe(6);
    act(() => result.current.reset());
    expect(result.current.count).toBe(5);
  });

  it('respects min and max', () => {
    const { result } = renderHook(() => useCounter(1, { min: 0, max: 2 }));
    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.increment();
    });
    expect(result.current.count).toBe(2);
    act(() => {
      result.current.decrement();
      result.current.decrement();
      result.current.decrement();
    });
    expect(result.current.count).toBe(0);
  });
});

describe('useMap', () => {
  it('sets, removes, resets and clears entries immutably', () => {
    const initial: [string, number][] = [['a', 1]];
    const { result } = renderHook(() => useMap(initial), strict);
    const first = result.current[0];
    act(() => result.current[1].set('b', 2));
    expect(result.current[0]).not.toBe(first);
    expect(result.current[0].get('b')).toBe(2);
    act(() => result.current[1].remove('a'));
    expect(result.current[0].has('a')).toBe(false);
    act(() => result.current[1].setAll([['z', 26]]));
    expect([...result.current[0].keys()]).toEqual(['z']);
    act(() => result.current[1].reset());
    expect(result.current[0].get('a')).toBe(1);
    act(() => result.current[1].clear());
    expect(result.current[0].size).toBe(0);
  });
});

describe('useStep', () => {
  it('moves between steps within bounds', () => {
    const { result } = renderHook(() => useStep(3), strict);
    expect(result.current[0]).toBe(1);
    expect(result.current[1].canGoToPrevStep).toBe(false);
    act(() => result.current[1].goToNextStep());
    act(() => result.current[1].goToNextStep());
    expect(result.current[0]).toBe(3);
    expect(result.current[1].canGoToNextStep).toBe(false);
    act(() => result.current[1].goToNextStep());
    expect(result.current[0]).toBe(3);
    act(() => result.current[1].goToPrevStep());
    expect(result.current[0]).toBe(2);
    act(() => result.current[1].reset());
    expect(result.current[0]).toBe(1);
  });

  it('setStep accepts valid steps and rejects invalid ones', () => {
    const { result } = renderHook(() => useStep(3));
    act(() => result.current[1].setStep(3));
    expect(result.current[0]).toBe(3);
    expect(() => result.current[1].setStep(4)).toThrow('Step not valid');
  });
});
