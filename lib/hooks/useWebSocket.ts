import { useState, useEffect, useRef } from 'react';

export enum WebSocketStatus {
  CONNECTING = 'CONNECTING',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  RECONNECTING = 'RECONNECTING',
}

export interface WebSocketHook {
  lastMessage: string | null;
  status: WebSocketStatus;
  sendMessage: (message: string) => void;
}
export interface WebSocketOptions {
  maxReconnectAttempts?: number; // Max attempts for reconnection
  reconnectDelay?: (attempt: number) => number; // Function to calculate delay
  onOpen?: () => void; // Callback for WebSocket open event
  onMessage?: (message: string) => void; // Callback for incoming messages
  onError?: (error: Event) => void; // Callback for WebSocket errors
  onClose?: (event: CloseEvent) => void; // Callback for WebSocket close event
}

/**
 * hook to manage WebSocket connections with auto-reconnect and state management.
 * @param url - WebSocket URL to connect to.
 * @param options - Configuration options for WebSocket behavior.
 * @returns WebSocketHook containing state and utility functions.
 */

export const useWebSocket = (
  url: string,
  {
    maxReconnectAttempts = 5,
    reconnectDelay = (attempt) => Math.min(5000, Math.pow(2, attempt) * 1000), // Default: exponential backoff
    onOpen,
    onMessage,
    onError,
    onClose,
  }: WebSocketOptions = {},
): WebSocketHook => {
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<WebSocketStatus>(
    WebSocketStatus.CONNECTING,
  );
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef<number>(0); // Tracks reconnection attempts

  const connectWebSocket = () => {
    setStatus(WebSocketStatus.CONNECTING);
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus(WebSocketStatus.OPEN);
      reconnectAttempts.current = 0; // Reset reconnection attempts
      onOpen?.(); // Trigger custom callback
    };

    ws.onmessage = (event) => {
      setLastMessage(event.data);
      onMessage?.(event.data); // Trigger custom callback
    };

    ws.onerror = (error) => {
      onError?.(error); // Trigger custom callback
    };

    ws.onclose = (event) => {
      setStatus(WebSocketStatus.CLOSED);
      onClose?.(event); // Trigger custom callback

      // Attempt to reconnect if below the max attempts
      if (reconnectAttempts.current < maxReconnectAttempts) {
        reconnectAttempts.current += 1;
        setStatus(WebSocketStatus.RECONNECTING);
        setTimeout(connectWebSocket, reconnectDelay(reconnectAttempts.current));
      }
    };
  };

  const sendMessage = (message: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    } else {
      console.warn('WebSocket is not open.');
    }
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      wsRef.current?.close();
    };
  }, [url]);

  return { lastMessage, status, sendMessage };
};
