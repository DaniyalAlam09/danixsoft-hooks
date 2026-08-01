import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../src/useLocalStorage';
import { describe, it, expect, beforeEach } from 'vitest';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should return the initial value', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('should update the value', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(window.localStorage.getItem('test-key')).toBe(JSON.stringify('updated'));
  });
});
