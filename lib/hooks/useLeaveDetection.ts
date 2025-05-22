import { useEffect, useRef } from 'react';

export function useLeaveDetection(
  onLeave: (this: HTMLElement, ev: MouseEvent) => any,
) {
  const onLeaveRef = useRef(onLeave);

  useEffect(() => {
    onLeaveRef.current = onLeave;
  }, [onLeave]);

  useEffect(() => {
    const handler = function (this: HTMLElement, ev: MouseEvent) {
      onLeaveRef.current.call(this, ev);
    };

    document.documentElement.addEventListener('mouseleave', handler);

    return () =>
      document.documentElement.removeEventListener('mouseleave', handler);
  }, []);
}
