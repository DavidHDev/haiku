import { renderHook } from '@testing-library/react';
import { useFirstRender } from '../../hooks/useFirstRender';

describe('useFirstRender', () => {
  it('should return true on first render', () => {
    const { result } = renderHook(() => useFirstRender());

    expect(result.current).toBe(true);
  });

  it('should maintain false state across multiple rerenders', () => {
    const { result, rerender } = renderHook(() => useFirstRender());

    // Multiple subsequent renders.
    for (let i = 0; i < 5; i++) {
      rerender();

      expect(result.current).toBe(false);
    }
  });
});
