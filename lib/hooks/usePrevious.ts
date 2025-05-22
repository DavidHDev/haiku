import { useRef } from 'react';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/**
 * Tracks the previous value of a given input.
 *
 * @param {T} value The current value to track.
 * @returns {T} The previous value of the input, or `value` if it's the first render.
 */
export const usePrevious = <T>(value: T): T => {
  const ref = useRef(value)

  useIsomorphicLayoutEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
