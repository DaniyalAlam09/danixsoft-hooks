import { renderHook, act } from '@testing-library/react';
import { useToggle } from '../src/useToggle';
import { describe, it, expect } from 'vitest';

describe('useToggle', () => {
  it('should use false as default initial value', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  it('should use provided initial value', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });

  it('should toggle the value', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1](); // toggle()
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1](); // toggle()
    });

    expect(result.current[0]).toBe(false);
  });

  it('should set true/false explicitly', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[2](); // setTrue()
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[3](); // setFalse()
    });

    expect(result.current[0]).toBe(false);
  });
});
