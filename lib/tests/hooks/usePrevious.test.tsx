import { renderHook, act } from '@testing-library/react';
import { usePrevious } from "../../hooks/usePrevious";

describe('usePrevious Hook', () => {
  test('returns the initial value initially', () => {
    const initialValue = "initial"

    const { result } = renderHook(() => usePrevious(initialValue));
    expect(result.current).toBe(initialValue);
  });

  test('returns the previous value', () => {
    const initialValue = "initial"

    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: {
        value: initialValue
      }
    });

    expect(result.current).toBe(initialValue)

    act(() => {
      rerender({ value: "previous" });
    });

    expect(result.current).toBe(initialValue)

    act(() => {
      rerender({ value: "next" });
    });

    expect(result.current).toBe("previous")
  })
})
