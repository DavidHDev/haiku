import { act, renderHook } from '@testing-library/react';
import { useBoolToggle, useToggle } from '../../hooks/useToggle';

describe('useToggle', () => {
  it('should initialize with the initial value', () => {
    const { result } = renderHook(() => useToggle('on', ['on', 'off']));

    expect(result.current[0]).toBe('on');
    expect(typeof result.current[1]).toBe('function');
  });

  it('should toggle between options when called without arguments', () => {
    const { result } = renderHook(() => useToggle('on', ['on', 'off']));

    const toggleFn = result.current[1] as () => void;

    act(() => {
      toggleFn();
    });

    expect(result.current[0]).toBe('off');

    act(() => {
      toggleFn();
    });

    expect(result.current[0]).toBe('on');
  });

  it('should set specific value when called with argument', () => {
    const { result } = renderHook(() => useToggle('on', ['on', 'off']));

    const toggleFn = result.current[1] as (value: string) => void;

    act(() => {
      toggleFn('off');
    });

    expect(result.current[0]).toBe('off');
  });

});

describe('useBoolToggle', () => {
  it('should initialize with false by default', () => {
    const { result } = renderHook(() => useBoolToggle());

    expect(result.current[0]).toBe(false);
  });

  it('should initialize with provided value', () => {
    const { result } = renderHook(() => useBoolToggle(true));

    expect(result.current[0]).toBe(true);
  });

  it('should toggle between true and false', () => {
    const { result } = renderHook(() => useBoolToggle(false));

    const toggleFn = result.current[1] as () => void;

    act(() => {
      toggleFn();
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      toggleFn();
    });

    expect(result.current[0]).toBe(false);
  });
});
