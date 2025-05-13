import { useState, useEffect } from 'react';

// Breakpoint size mappings
const breakpoints = {
  xs: 639,
  sm: 767,
  md: 1023,
  lg: 1279,
  xl: 1535,
  '2xl': Infinity, // 2xl is anything above 1535px
};

// Helper function to get the current breakpoint
const getBreakpoint = (width: number): keyof typeof breakpoints => {
  if (width <= breakpoints.xs) return 'xs';
  if (width <= breakpoints.sm) return 'sm';
  if (width <= breakpoints.md) return 'md';
  if (width <= breakpoints.lg) return 'lg';
  if (width <= breakpoints.xl) return 'xl';
  return '2xl';
};

// The custom hook
export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<keyof typeof breakpoints>('xs');

  const handleResize = () => {
    setScreenSize(getBreakpoint(window.innerWidth));
  };

  useEffect(() => {
    handleResize(); // Set the initial size
    window.addEventListener('resize', handleResize); // Update on window resize

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup on unmount
    };
  }, []);

  // Methods to check size
  const equals = (size: keyof typeof breakpoints) => screenSize === size;
  const lessThan = (size: keyof typeof breakpoints) => breakpoints[screenSize] < breakpoints[size];
  const greaterThan = (size: keyof typeof breakpoints) => breakpoints[screenSize] > breakpoints[size];

  return {
    equals,
    lessThan,
    greaterThan,
    toString: () => screenSize,
  };
};
