import { renderHook, act } from '@testing-library/react';
import { useWebSocket, WebSocketStatus } from '../../hooks/useWebSocket';

describe('useWebSocket', () => {
  const url = 'wss://echo.websocket.org';
  let mockWebSocket: any;

  beforeEach(() => {
    mockWebSocket = {
      onopen: jest.fn(),
      onmessage: jest.fn(),
      onerror: jest.fn(),
      onclose: jest.fn(),
      send: jest.fn(),
      close: jest.fn(),
      readyState: WebSocketStatus.CONNECTING,
    };

    (window as any).WebSocket = jest.fn(() => mockWebSocket) as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with CONNECTING status', () => {
    const { result } = renderHook(() => useWebSocket(url));

    expect(result.current.status).toBe(WebSocketStatus.CONNECTING);
  });

  it('should update status to OPEN when connection is established', () => {
    const { result } = renderHook(() => useWebSocket(url));

    act(() => {
      mockWebSocket.onopen();
    });

    expect(result.current.status).toBe(WebSocketStatus.OPEN);
  });

  it('should update lastMessage when a message is received', () => {
    const { result } = renderHook(() => useWebSocket(url));
    const testMessage = 'test message';

    act(() => {
      mockWebSocket.onmessage({ data: testMessage });
    });

    expect(result.current.lastMessage).toBe(testMessage);
  });

  it('should update status to CLOSED when connection is closed and reconnection attempts are exhausted', () => {
    const { result } = renderHook(() =>
      useWebSocket(url, { maxReconnectAttempts: 0 }),
    ); // Disable reconnection

    act(() => {
      mockWebSocket.onclose({});
    });

    expect(result.current.status).toBe(WebSocketStatus.CLOSED);
  });

  it('should attempt to reconnect when connection is closed', () => {
    jest.useFakeTimers(); // Mock timers
    const setTimeoutSpy = jest.spyOn(window as any, 'setTimeout'); // Spy on setTimeout

    const { result } = renderHook(() =>
      useWebSocket(url, { maxReconnectAttempts: 3 }),
    );

    act(() => {
      mockWebSocket.onclose({});
    });

    expect(result.current.status).toBe(WebSocketStatus.RECONNECTING);
    expect(setTimeoutSpy).toHaveBeenCalledTimes(1); // Verify setTimeout was called
    jest.useRealTimers(); // Restore real timers
    setTimeoutSpy.mockRestore(); // Restore original setTimeout
  });

  it('should stop reconnecting after maxReconnectAttempts', () => {
    jest.useFakeTimers(); // Mock timers
    const setTimeoutSpy = jest.spyOn(window as any, 'setTimeout'); // Spy on setTimeout

    const { result } = renderHook(() =>
      useWebSocket(url, { maxReconnectAttempts: 2 }),
    );

    // Simulate multiple connection failures
    act(() => {
      mockWebSocket.onclose({}); // First attempt
      mockWebSocket.onclose({}); // Second attempt
      mockWebSocket.onclose({}); // Third attempt (should not reconnect)
    });

    expect(result.current.status).toBe(WebSocketStatus.CLOSED);
    expect(setTimeoutSpy).toHaveBeenCalledTimes(2); // Verify setTimeout was called twice
    jest.useRealTimers(); // Restore real timers
    setTimeoutSpy.mockRestore(); // Restore original setTimeout
  });

  it('should send a message when sendMessage is called and connection is open', () => {
    const { result } = renderHook(() => useWebSocket(url));
    const testMessage = 'test message';

    act(() => {
      mockWebSocket.readyState = WebSocket.OPEN;
      result.current.sendMessage(testMessage);
    });

    expect(mockWebSocket.send).toHaveBeenCalledWith(testMessage);
  });

  it('should not send a message when sendMessage is called and connection is not open', () => {
    // Mock console.warn to verify the warning message
    const consoleWarnSpy = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    // Simulate the WebSocket hook
    const { result } = renderHook(() => useWebSocket(url));

    // Manually set WebSocket to CLOSED state
    mockWebSocket.readyState = WebSocketStatus.CLOSED;

    const testMessage = 'test message';

    act(() => {
      result.current.sendMessage(testMessage); // Call sendMessage when WebSocket is closed
    });

    // Verify that mockWebSocket.send was NOT called
    expect(mockWebSocket.send).not.toHaveBeenCalled();

    // Verify that console.warn was called with the expected message
    expect(consoleWarnSpy).toHaveBeenCalledWith('WebSocket is not open.');

    // Restore the original console.warn
    consoleWarnSpy.mockRestore();
  });

  it('should call onOpen callback when connection is established', () => {
    const onOpen = jest.fn();
    renderHook(() => useWebSocket(url, { onOpen }));

    act(() => {
      mockWebSocket.onopen();
    });

    expect(onOpen).toHaveBeenCalled();
  });

  it('should call onMessage callback when a message is received', () => {
    const onMessage = jest.fn();
    const testMessage = 'test message';
    renderHook(() => useWebSocket(url, { onMessage }));

    act(() => {
      mockWebSocket.onmessage({ data: testMessage });
    });

    expect(onMessage).toHaveBeenCalledWith(testMessage);
  });

  it('should call onError callback when an error occurs', () => {
    const onError = jest.fn();
    const testError = new Event('error');
    renderHook(() => useWebSocket(url, { onError }));

    act(() => {
      mockWebSocket.onerror(testError);
    });

    expect(onError).toHaveBeenCalledWith(testError);
  });

  it('should call onClose callback when connection is closed', () => {
    const onClose = jest.fn();
    const testCloseEvent = new CloseEvent('close');
    renderHook(() => useWebSocket(url, { onClose }));

    act(() => {
      mockWebSocket.onclose(testCloseEvent);
    });

    expect(onClose).toHaveBeenCalledWith(testCloseEvent);
  });

  it('should close the WebSocket connection when the component unmounts', () => {
    const { unmount } = renderHook(() => useWebSocket(url));

    unmount();

    expect(mockWebSocket.close).toHaveBeenCalled();
  });
});
