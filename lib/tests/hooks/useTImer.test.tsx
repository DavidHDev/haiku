import { renderHook, act, cleanup } from '@testing-library/react';
import { useTimer } from '../../hooks/useTimer';

const advance = (ms: number) =>
  act(() => {
    jest.advanceTimersByTime(ms);
  });

describe('useTimer', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('increments from the start time after start()', () => {
    const { result } = renderHook(() => useTimer({ startTime: 0 }));

    act(() => result.current.start());
    advance(3000);

    expect(result.current.time).toBe(3);
    expect(result.current.isRunning).toBe(true);
  });

  it('honours a custom interval', () => {
    const { result } = renderHook(() =>
      useTimer({ startTime: 5, interval: 500 }),
    );

    act(() => result.current.start());
    advance(1500);                          // 3 ticks

    expect(result.current.time).toBe(8);
  });

  it('counts up to endTime and stops', () => {
    const { result } = renderHook(() =>
      useTimer({ startTime: 1, endTime: 3 }),
    );

    act(() => result.current.start());
    advance(5000);

    expect(result.current.time).toBe(3);
    expect(result.current.isRunning).toBe(false);
  });

  it('counts down to endTime and stops', () => {
    const { result } = renderHook(() =>
      useTimer({ startTime: 3, endTime: 1 }),
    );

    act(() => result.current.start());
    advance(3000);

    expect(result.current.time).toBe(1);
    expect(result.current.isRunning).toBe(false);
  });

  it('pause() freezes the time', () => {
    const { result } = renderHook(() => useTimer({ startTime: 0 }));

    act(() => result.current.start());
    advance(1000);

    act(() => result.current.pause());
    advance(2000);

    expect(result.current.time).toBe(1);
    expect(result.current.isRunning).toBe(false);
  });

  it('reset() stops the timer and restores the start value', () => {
    const { result } = renderHook(() => useTimer({ startTime: 10 }));

    act(() => result.current.start());
    advance(2000);
    act(() => result.current.reset());

    expect(result.current.time).toBe(10);
    expect(result.current.isRunning).toBe(false);
  });

  it('start() is idempotent', () => {
    const { result } = renderHook(() => useTimer({ startTime: 0 }));

    act(() => {
      result.current.start();
      result.current.start();
    });
    advance(2000);

    expect(result.current.time).toBe(2);
  });

  it('throws for a non-positive interval', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() =>
      renderHook(() => useTimer({ startTime: 0, interval: 0 })),
    ).toThrow('Interval must be a positive number');
    spy.mockRestore();
  });

  it('throws when startTime / endTime are not numbers', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    // @ts-expect-error purposely wrong types
    expect(() => renderHook(() => useTimer({ startTime: 'x' }))).toThrow(
      'startTime and endTime must be numbers',
    );
    spy.mockRestore();
  });
});
