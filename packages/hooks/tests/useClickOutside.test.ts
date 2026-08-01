import { renderHook } from '@testing-library/react';
import { useClickOutside } from '../src/useClickOutside';
import { describe, it, expect, vi } from 'vitest';

describe('useClickOutside', () => {
  it('should call the handler when clicking outside', () => {
    const handler = vi.fn();
    const ref = { current: document.createElement('div') };
    
    // Mount the ref node to the document body
    document.body.appendChild(ref.current);

    renderHook(() => useClickOutside(ref, handler));

    // Click outside
    document.dispatchEvent(new MouseEvent('mousedown'));
    expect(handler).toHaveBeenCalledTimes(1);
    
    // Cleanup
    document.body.removeChild(ref.current);
  });

  it('should not call the handler when clicking inside', () => {
    const handler = vi.fn();
    const ref = { current: document.createElement('div') };
    document.body.appendChild(ref.current);

    renderHook(() => useClickOutside(ref, handler));

    // Click inside
    ref.current.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(handler).not.toHaveBeenCalled();

    // Cleanup
    document.body.removeChild(ref.current);
  });
});
