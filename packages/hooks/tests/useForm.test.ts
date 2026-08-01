import { renderHook, act } from '@testing-library/react';
import { useForm } from '../src/useForm';
import { describe, it, expect, vi } from 'vitest';

describe('useForm', () => {
  it('should initialize with values', () => {
    const { result } = renderHook(() => useForm({ initialValues: { name: 'Danix' } }));
    expect(result.current.values.name).toBe('Danix');
  });

  it('should update values on change', () => {
    const { result } = renderHook(() => useForm({ initialValues: { name: '' } }));

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Danix', type: 'text' },
      } as any);
    });

    expect(result.current.values.name).toBe('Danix');
  });

  it('should handle submit', async () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() =>
      useForm({ initialValues: { name: 'Danix' }, onSubmit })
    );

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    expect(onSubmit).toHaveBeenCalledWith({ name: 'Danix' });
  });
});
