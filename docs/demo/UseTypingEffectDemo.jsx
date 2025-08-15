import React, { useState } from 'react';
import { useTypingEffect } from 'react-haiku';

export const UseTypingEffectDemo = () => {
  const [customText, setCustomText] = useState('Hello, welcome to the typing effect demo!');
  const [isCompleted, setIsCompleted] = useState(false);

  const { 
    displayedText, 
    isTyping, 
    startTyping, 
    reset 
  } = useTypingEffect(customText, {
    baseDelay: 50,
    randomDelay: 100,
    onComplete: () => setIsCompleted(true)
  });

  const handleStartTyping = () => {
    setIsCompleted(false);
    startTyping();
  };

  const handleReset = () => {
    setIsCompleted(false);
    reset();
  };

  const handleTextChange = (e) => {
    setCustomText(e.target.value || 'Hello, welcome to the typing effect demo!');
    setIsCompleted(false);
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      fontFamily: 'monospace'
    }}>
      <h3>useTypingEffect Demo</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="text-input" style={{ display: 'block', marginBottom: '8px' }}>
          Text to animate:
        </label>
        <input
          id="text-input"
          type="text"
          value={customText}
          onChange={handleTextChange}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontFamily: 'monospace'
          }}
          placeholder="Enter text to animate..."
        />
      </div>

      <div style={{ 
        minHeight: '60px',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        marginBottom: '20px',
        fontSize: '18px',
        lineHeight: '1.4'
      }}>
        <span>{displayedText}</span>
        {isTyping && (
          <span style={{ 
            animation: 'blink 1s infinite',
            marginLeft: '2px'
          }}>|</span>
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <button
          onClick={handleStartTyping}
          disabled={isTyping}
          style={{
            padding: '10px 20px',
            backgroundColor: isTyping ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isTyping ? 'not-allowed' : 'pointer',
            fontSize: '14px'
          }}
        >
          {isTyping ? 'Typing...' : 'Start Typing'}
        </button>
        
        <button
          onClick={handleReset}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Reset
        </button>
      </div>

      <div style={{ fontSize: '14px', color: '#666' }}>
        <p>
          <strong>Status:</strong> {
            isTyping ? '🔄 Typing in progress...' : 
            isCompleted ? '✅ Typing completed!' : 
            '⏸️ Ready to start'
          }
        </p>
        <p>
          <strong>Characters:</strong> {displayedText.length} / {customText.length}
        </p>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};
