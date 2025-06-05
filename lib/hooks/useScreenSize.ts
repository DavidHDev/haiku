import { useState, useCallback, useLayoutEffect } from 'react';

const breakpoints = {
  xs: 639,
  sm: 767,
  md: 1023,
  lg: 1279,
  xl: 1535,
  '2xl': Infinity,
};

const getBreakpoint = (width: number): keyof typeof breakpoints => {
  return (Object.keys(breakpoints) as (keyof typeof breakpoints)[])
    .find(bp => width <= breakpoints[bp]) ?? '2xl';
};

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<keyof typeof breakpoints>(() =>
    typeof window === 'undefined' ? 'xl' : getBreakpoint(window.innerWidth),
  );

  const handleResize = useCallback(() => {
    setScreenSize(getBreakpoint(window.innerWidth));
  }, []);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;

    const onResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        handleResize();
        ticking = false;
      });
    };

    // Initial measurement
    handleResize();
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [handleResize]);

  const eq = (bp: keyof typeof breakpoints) => screenSize === bp;
  const lt = (bp: keyof typeof breakpoints) => breakpoints[screenSize] < breakpoints[bp];
  const gt = (bp: keyof typeof breakpoints) => breakpoints[screenSize] > breakpoints[bp];
  const lte = (bp: keyof typeof breakpoints) => eq(bp) || lt(bp);
  const gte = (bp: keyof typeof breakpoints) => eq(bp) || gt(bp);


  return {
    eq,
    lt,
    gt,
    lte,
    gte,
    toString: () => screenSize,
  };
};
