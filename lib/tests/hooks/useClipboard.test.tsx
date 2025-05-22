import { renderHook, act, waitFor } from '@testing-library/react';
import { useClipboard } from '../../hooks/useClipboard'; 

describe('useClipboard', () => {
  beforeEach(() => {
    // Mock the navigator.clipboard object
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterEach(() => {
    // Restore the original navigator.clipboard object
    jest.restoreAllMocks();
  });

  it('should copy text to clipboard and set copied to true', async () => {
    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      result.current.copy('test text');
    });

    await waitFor(() => expect(result.current.copied).toBe(true));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
    expect(result.current.error).toBeNull();
  });

  it('should handle clipboard error and set error state', async () => {
    const error = new Error('Clipboard write failed');
    (navigator.clipboard.writeText as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      result.current.copy('test text');
    });

    await waitFor(() => expect(result.current.error).toBeTruthy());
    if (result.current.error instanceof Error) {
      expect(result.current.error.message).toBe('Clipboard write failed');
    }
    expect(result.current.copied).toBe(false);
  });

  it('should reset the state when reset is called', async () => {
    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      result.current.copy('test text');
    });

    await waitFor(() => expect(result.current.copied).toBe(true));

    act(() => {
      result.current.reset();
    });

    expect(result.current.copied).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should set copied to false after the timeout', async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useClipboard({ timeout: 500 }));

    await act(async () => {
      result.current.copy('test text');
    });

    await waitFor(() => expect(result.current.copied).toBe(true));

    act(() => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => expect(result.current.copied).toBe(false));

    jest.useRealTimers();
  });

  it('should handle unsupported clipboard API', async () => {
    // Temporarily remove the clipboard API
    const originalClipboard = navigator.clipboard;
    delete (navigator as any).clipboard;

    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      result.current.copy('test text');
    });

    await waitFor(() => expect(result.current.error).toBeTruthy());
    if (result.current.error instanceof Error) {
      expect(result.current.error.message).toBe(
        'Error: navigator.clipboard is not supported',
      );
    }

    // Restore the clipboard API
    (navigator as any).clipboard = originalClipboard;
  });
});
