import { renderHook, act } from '@testing-library/react';
import { useNetwork } from '../../hooks/useNetwork';
import { useEventListener } from '../../hooks/useEventListener';

jest.mock('../../hooks/useEventListener', () => ({
  useEventListener: jest.fn(),
}));

describe('useNetwork', () => {
  const mockNavigator = { onLine: true };

  beforeAll(() => {
    Object.defineProperty(globalThis, 'navigator', {
      value: mockNavigator,
      writable: true,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return true when navigator.onLine is true', () => {
    mockNavigator.onLine = true;

    const { result } = renderHook(() => useNetwork());

    expect(result.current).toBe(true);
  });

  it('should add event listeners for online and offline', () => {
    renderHook(() => useNetwork());

    expect(useEventListener).toHaveBeenCalledWith('online', expect.any(Function));
    expect(useEventListener).toHaveBeenCalledWith('offline', expect.any(Function));
  });

  it('should default to true when navigator is undefined', () => {
    Object.defineProperty(globalThis, 'navigator', {
      value: undefined,
      writable: true,
    });

    const { result } = renderHook(() => useNetwork());

    expect(result.current).toBe(true);
  });

  it ('should return false when handleOffline is called', () => {
    const { result } = renderHook(() => useNetwork());

    const handleOffline = (useEventListener as jest.Mock).mock.calls[1][1];

    act(() => {
      handleOffline();
    });

    expect(result.current).toBe(false);
  });
  it('should return true when handleOnline is called', () => {
    const { result } = renderHook(() => useNetwork());

    const handleOnline = (useEventListener as jest.Mock).mock.calls[0][1];

    act(() => {
      handleOnline();
    });

    expect(result.current).toBe(true);
  });
});
