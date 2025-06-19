import { renderHook, act, waitFor } from '@testing-library/react';
import { useGeolocation } from '../../hooks/useGeolocation';

// Mock the geolocation API
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
};

// Mock navigator.geolocation
Object.defineProperty(window.navigator, 'geolocation', {
  value: mockGeolocation,
  writable: true,
});

describe('useGeolocation Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns initial state correctly', () => {
    const { result } = renderHook(() => useGeolocation());

    expect(result.current.latitude).toBe(null);
    expect(result.current.longitude).toBe(null);
    expect(result.current.error).toBe(null);
    expect(result.current.loading).toBe(true);
  });

  test('handles successful geolocation', async () => {
    const mockPosition = {
      coords: {
        latitude: 40.7128,
        longitude: -74.0060,
      },
    };

    mockGeolocation.getCurrentPosition.mockImplementation((success) => {
      success(mockPosition);
    });

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.latitude).toBe(40.7128);
    expect(result.current.longitude).toBe(-74.0060);
    expect(result.current.error).toBe(null);
    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
  });

  test('handles geolocation errors', async () => {
    const mockError = {
      code: 1,
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 3,
    };

    mockGeolocation.getCurrentPosition.mockImplementation((_success, error) => {
      error(mockError);
    });

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.latitude).toBe(null);
    expect(result.current.longitude).toBe(null);
    expect(result.current.error).toEqual({
      code: 1,
      message: 'User denied the request for Geolocation.',
    });
  });

  test('handles unsupported geolocation', () => {
    // Temporarily remove geolocation support
    const originalGeolocation = window.navigator.geolocation;
    Object.defineProperty(window.navigator, 'geolocation', {
      value: undefined,
      writable: true,
    });

    const { result } = renderHook(() => useGeolocation());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual({
      code: 0,
      message: 'Geolocation is not supported by this browser.',
    });

    // Restore geolocation
    Object.defineProperty(window.navigator, 'geolocation', {
      value: originalGeolocation,
      writable: true,
    });
  });

  test('handles watch mode', async () => {
    const mockPosition = {
      coords: {
        latitude: 40.7128,
        longitude: -74.0060,
      },
    };

    let watchCallback: ((position: any) => void) | null = null;
    const watchId = 123;

    mockGeolocation.watchPosition.mockImplementation((success) => {
      watchCallback = success;
      return watchId;
    });

    const { result, unmount } = renderHook(() => useGeolocation({ watch: true }));

    expect(mockGeolocation.watchPosition).toHaveBeenCalledTimes(1);

    // Simulate position update
    act(() => {
      if (watchCallback) {
        watchCallback(mockPosition);
      }
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.latitude).toBe(40.7128);
    expect(result.current.longitude).toBe(-74.0060);

    // Test cleanup
    unmount();
    expect(mockGeolocation.clearWatch).toHaveBeenCalledWith(watchId);
  });

  test('passes correct options to getCurrentPosition', () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    };

    renderHook(() => useGeolocation(options));

    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      options
    );
  });
});
