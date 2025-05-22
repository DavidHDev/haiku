import React, { useEffect, useState } from 'react';
import { useWebSocket } from 'react-haiku';

export const UseWebSocketDemo = () => {
  const [newValue, setNewValue] = useState('');

  const { status, lastMessage, sendMessage } = useWebSocket(
    'wss://echo.websocket.org',
  );

  useEffect(() => {
    if (status === 'OPEN') {
      sendMessage('useWebSocket() with Haiku!');
    }
  }, [status]);

  return (
    <div className="demo-container-center">
      <h3 style={{ marginBottom: '1em' }}>
        Web Socket Status: <span style={{ color: '#E46B39' }}>{status}</span>
      </h3>
      <div className="demo-control-group" style={{ marginTop: '2em' }}>
        <input
          type="text"
          placeholder="Type your message here"
          style={{ marginBottom: 0 }}
          className="demo-input"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button
          className="demo-button green-button"
          onClick={() => sendMessage(newValue)}
        >
          Send
        </button>
      </div>
      <div
        className="demo-control-group"
        style={{
          alignItems: 'center',
        }}
      >
        <b>Last Message:</b>
        <p style={{ marginBottom: '0' }}>
          {' '}
          <span style={{ color: '#E46B39' }}>
            {lastMessage ? lastMessage : 'No message yet'}
          </span>
        </p>
      </div>
    </div>
  );
};
