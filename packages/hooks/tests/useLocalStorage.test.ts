import React from 'react';
import { renderHook, act } from '@testing-library/react';

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useLocalStorage } from '../src/useLocalStorage';
import { hydrate, renderOnServer } from './helpers/hydration';

function Stored({ initial = 'initial' }: { initial?: string }) {
  const [value] = useLocalStorage('ssr-key', initial);
  return React.createElement('span', null, value);
}

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('reads an existing stored value on a client-only render', () => {
    window.localStorage.setItem('test-key', JSON.stringify('stored'));
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('stored');
  });

  it('updates state and storage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    act(() => {
      result.current[1]('updated');
    });
    expect(result.current[0]).toBe('updated');
    expect(window.localStorage.getItem('test-key')).toBe(JSON.stringify('updated'));
  });

  it('applies several functional updates in one tick', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0));
    act(() => {
      result.current[1]((n) => n + 1);
      result.current[1]((n) => n + 1);
      result.current[1]((n) => n + 1);
    });
    expect(result.current[0]).toBe(3);
  });

  it('keeps setValue and removeValue stable across renders', () => {
    const { result, rerender } = renderHook(() => useLocalStorage('stable', 'a'));
    const [, set1, remove1] = result.current;
    act(() => set1('b'));
    rerender();
    expect(result.current[1]).toBe(set1);
    expect(result.current[2]).toBe(remove1);
  });

  it('returns a stable reference for object values with an inline initial value', () => {
    const { result, rerender } = renderHook(() => useLocalStorage('list', [] as number[]));
    const first = result.current[0];
    rerender();
    expect(result.current[0]).toBe(first);
  });

  it('syncs every hook using the same key', () => {
    const a = renderHook(() => useLocalStorage('shared', 'x'));
    const b = renderHook(() => useLocalStorage('shared', 'x'));
    act(() => a.result.current[1]('y'));
    expect(b.result.current[0]).toBe('y');
  });

  it('removeValue deletes the key and falls back to the initial value', () => {
    const { result } = renderHook(() => useLocalStorage('removable', 'initial'));
    act(() => result.current[1]('set'));
    act(() => result.current[2]());
    expect(result.current[0]).toBe('initial');
    expect(window.localStorage.getItem('removable')).toBeNull();
  });

  it('follows writes and removals from other tabs', () => {
    const { result } = renderHook(() => useLocalStorage('tabs', 'initial'));
    act(() => {
      window.localStorage.setItem('tabs', JSON.stringify('from-other-tab'));
      window.dispatchEvent(new StorageEvent('storage', { key: 'tabs' }));
    });
    expect(result.current[0]).toBe('from-other-tab');
    act(() => {
      window.localStorage.removeItem('tabs');
      window.dispatchEvent(new StorageEvent('storage', { key: 'tabs', newValue: null }));
    });
    expect(result.current[0]).toBe('initial');
  });

  it('falls back to the initial value when the stored JSON is corrupt', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    window.localStorage.setItem('bad', '{not json');
    const { result } = renderHook(() => useLocalStorage('bad', 'initial'));
    expect(result.current[0]).toBe('initial');
    warn.mockRestore();
  });

  it('supports a custom serializer and deserializer', () => {
    const options = {
      serializer: (d: Date) => d.toISOString(),
      deserializer: (raw: string) => new Date(raw),
    };
    const { result } = renderHook(() => useLocalStorage('date', new Date(0), options));
    act(() => result.current[1](new Date('2026-01-02T00:00:00.000Z')));
    expect(window.localStorage.getItem('date')).toBe('2026-01-02T00:00:00.000Z');
    expect(result.current[0]).toBeInstanceOf(Date);
    expect(result.current[0].getUTCFullYear()).toBe(2026);
  });

  it('keeps working in memory when storage writes fail', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const setItem = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new DOMException('QuotaExceededError');
      });
    const { result } = renderHook(() => useLocalStorage('quota', 'initial'));
    act(() => result.current[1]('in-memory'));
    expect(result.current[0]).toBe('in-memory');
    setItem.mockRestore();
    act(() => result.current[1]('persisted'));
    expect(window.localStorage.getItem('quota')).toBe(JSON.stringify('persisted'));
    warn.mockRestore();
  });

  it('renders the initial value on the server', () => {
    window.localStorage.setItem('ssr-key', JSON.stringify('stored'));
    expect(renderOnServer(React.createElement(Stored))).toContain('initial');
  });

  it('hydrates without a mismatch when a value is stored, then shows it', async () => {
    window.localStorage.setItem('ssr-key', JSON.stringify('stored'));
    const { errors, container, serverHtml, cleanup } = await hydrate(React.createElement(Stored));
    expect(serverHtml).toContain('initial');
    expect(errors).toEqual([]);
    expect(container.textContent).toBe('stored');
    cleanup();
  });
});
