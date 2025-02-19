import { renderHook, act } from '@testing-library/react';
import { useTimer } from '../../hooks/useTimer';

describe('useTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with the correct start time', () => {
    const { result } = renderHook(() => useTimer({ startTime: 10 }));
    expect(result.current.time).toBe(10);
    expect(result.current.isRunning).toBe(false);
  });

  it('should start the timer and increment time', () => {
    const { result } = renderHook(() =>
      useTimer({ startTime: 0, interval: 1000 }),
    );

    act(() => {
      result.current.start();
    });

    expect(result.current.isRunning).toBe(true);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.time).toBe(1);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.time).toBe(3);
  });

  it('should pause the timer', () => {
    const { result } = renderHook(() =>
      useTimer({ startTime: 0, interval: 1000 }),
    );

    act(() => {
      result.current.start();
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.time).toBe(2);

    act(() => {
      result.current.pause();
    });

    expect(result.current.isRunning).toBe(false);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.time).toBe(2); // Time should not change after pause
  });

  it('should reset the timer', () => {
    const { result } = renderHook(() =>
      useTimer({ startTime: 0, interval: 1000 }),
    );

    act(() => {
      result.current.start();
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.time).toBe(3);

    act(() => {
      result.current.reset();
    });

    expect(result.current.time).toBe(0);
    expect(result.current.isRunning).toBe(false);
  });

  it('should count down when endTime is provided and startTime > endTime', () => {
    const { result } = renderHook(() =>
      useTimer({ startTime: 10, endTime: 5, interval: 1000 }),
    );

    act(() => {
      result.current.start();
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(result.current.time).toBe(5);
    expect(result.current.isRunning).toBe(false); // Timer should stop at endTime
  });

  it('should stop counting when reaching endTime', () => {
    const { result } = renderHook(() =>
      useTimer({ startTime: 0, endTime: 5, interval: 1000 }),
    );

    act(() => {
      result.current.start();
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(result.current.time).toBe(5);
    expect(result.current.isRunning).toBe(false); // Timer should stop at endTime
  });

  it('should throw an error if startTime or endTime is not a number', () => {
    expect(() => {
      renderHook(() => useTimer({ startTime: 'not a number' as any }));
    }).toThrow('startTime and endTime must be numbers');

    expect(() => {
      renderHook(() => useTimer({ endTime: 'not a number' as any }));
    }).toThrow('startTime and endTime must be numbers');
  });

  it('should throw an error if interval is not a positive number', () => {
    expect(() => {
      renderHook(() => useTimer({ interval: 0 }));
    }).toThrow('Interval must be a positive number');

    expect(() => {
      renderHook(() => useTimer({ interval: -100 }));
    }).toThrow('Interval must be a positive number');
  });
});
