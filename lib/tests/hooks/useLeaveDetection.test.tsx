import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { useLeaveDetection } from '../../hooks/useLeaveDetection';
import { useState } from 'react';

describe('useLeaveDetection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call the passed callback when the mouse leaves the document', () => {
    const callback = jest.fn();
    renderHook(() => useLeaveDetection(callback));

    fireEvent.mouseLeave(document.documentElement);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should setup the event listener only once', () => {
    const spy = jest.spyOn(document.documentElement, 'addEventListener');
    const { rerender } = renderHook(() => useLeaveDetection(() => {}));

    rerender();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('mouseleave', expect.any(Function));
  });

  it('should remove the event listener on unmount', () => {
    const spy = jest.spyOn(document.documentElement, 'removeEventListener');
    const callback = jest.fn();
    const { unmount } = renderHook(() => useLeaveDetection(callback));

    unmount();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('mouseleave', expect.any(Function));

    fireEvent.mouseLeave(document.documentElement);
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('should always invoke the latest callback', () => {
    const Test = () => {
      const [count, setCount] = useState(0);
      useLeaveDetection(() => setCount(count + 1));
      return <div>{count}</div>;
    };
    render(<Test />);

    expect(screen.getByText('0')).toBeInTheDocument();

    fireEvent.mouseLeave(document.documentElement);
    expect(screen.getByText('1')).toBeInTheDocument();

    fireEvent.mouseLeave(document.documentElement);
    expect(screen.getByText('2')).toBeInTheDocument();

    fireEvent.mouseLeave(document.documentElement);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should invoke the callback with correct argument and `this` context', () => {
    const callback = function (this: HTMLElement, ev: MouseEvent) {
      expect(this).toBe(document.documentElement);
      expect(ev).toBeInstanceOf(MouseEvent);
      expect(ev.type).toBe('mouseleave');
    };
    renderHook(() => useLeaveDetection(callback));

    fireEvent.mouseLeave(document.documentElement);
  });
});
