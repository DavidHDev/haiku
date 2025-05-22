import { renderHook, waitFor } from '@testing-library/react';
import { usePermission } from '../../hooks/usePermission';

describe('usePermission Hook', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'permissions', {
      value: {
        query: jest.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the not-supported state when navigator-permissions is not present', () => {
    // @ts-ignore
    navigator.permissions = null

    const { result } = renderHook(() => usePermission('geolocation'));
    expect(result.current).toBe('not-supported');
  });

  it('should return the checking state initially', () => {
    navigator.permissions.query = jest.fn().mockImplementation(() => new Promise(() => {}))

    const { result } = renderHook(() => usePermission('geolocation'));
    expect(result.current).toBe('checking');
  });

  it('should return the not-supported state when some error occurred', async () => {
    navigator.permissions.query = jest.fn().mockRejectedValueOnce(new Error())

    const { result } = renderHook(() => usePermission('geolocation'));

    await waitFor(() => {
      expect(result.current).toBe('not-supported');
    })
  });

  it('should return the prompt state', async () => {
    navigator.permissions.query = jest.fn().mockResolvedValue({
      state: 'prompt',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    });

    const { result } = renderHook(() => usePermission('geolocation'));

    await waitFor(() => {
      expect(result.current).toBe('prompt');
    })
  });

  it('should return the granted state', async () => {
    navigator.permissions.query = jest.fn().mockResolvedValue({
      state: 'granted',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    });

    const { result } = renderHook(() => usePermission('geolocation'));

    await waitFor(() => {
      expect(result.current).toBe('granted');
    })
  });

  it('should return the denied state', async () => {
    navigator.permissions.query = jest.fn().mockResolvedValue({
      state: 'denied',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    });

    const { result } = renderHook(() => usePermission('geolocation'));

    await waitFor(() => {
      expect(result.current).toBe('denied');
    })
  });
});
