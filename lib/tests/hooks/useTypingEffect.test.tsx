import { renderHook, act, waitFor } from '@testing-library/react';
import { useTypingEffect } from '../../hooks/useTypingEffect';

// Mock timers for consistent testing
jest.useFakeTimers();

describe('useTypingEffect', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('Parameter validation', () => {
    it('should throw error for empty string', () => {
      expect(() => {
        renderHook(() => useTypingEffect(''));
      }).toThrow('useTypingEffect: text parameter must be a non-empty string');
    });

    it('should throw error for non-string parameter', () => {
      expect(() => {
        renderHook(() => useTypingEffect(123 as any));
      }).toThrow('useTypingEffect: text parameter must be a non-empty string');
    });

    it('should throw error for null parameter', () => {
      expect(() => {
        renderHook(() => useTypingEffect(null as any));
      }).toThrow('useTypingEffect: text parameter must be a non-empty string');
    });

    it('should throw error for undefined parameter', () => {
      expect(() => {
        renderHook(() => useTypingEffect(undefined as any));
      }).toThrow('useTypingEffect: text parameter must be a non-empty string');
    });
  });

  describe('Initial state', () => {
    it('should initialize with correct default state', () => {
      const { result } = renderHook(() => useTypingEffect('Hello'));

      expect(result.current.displayedText).toBe('');
      expect(result.current.isTyping).toBe(false);
      expect(typeof result.current.startTyping).toBe('function');
      expect(typeof result.current.reset).toBe('function');
    });
  });

  describe('Typing functionality', () => {
    it('should start typing when startTyping is called', () => {
      const { result } = renderHook(() => useTypingEffect('Hi'));

      act(() => {
        result.current.startTyping();
      });

      expect(result.current.isTyping).toBe(true);
      expect(result.current.displayedText).toBe('');
    });

    it('should progressively display characters', async () => {
      const { result } = renderHook(() => 
        useTypingEffect('Hi', { baseDelay: 50, randomDelay: 0 })
      );

      act(() => {
        result.current.startTyping();
      });

      // Fast forward through the typing animation
      act(() => {
        jest.advanceTimersByTime(50);
      });

      await waitFor(() => {
        expect(result.current.displayedText).toBe('H');
      });

      act(() => {
        jest.advanceTimersByTime(50);
      });

      await waitFor(() => {
        expect(result.current.displayedText).toBe('Hi');
        expect(result.current.isTyping).toBe(false);
      });
    });

    it('should complete typing and call onComplete callback', async () => {
      const onComplete = jest.fn();
      const { result } = renderHook(() => 
        useTypingEffect('Hi', { baseDelay: 50, randomDelay: 0, onComplete })
      );

      act(() => {
        result.current.startTyping();
      });

      // Fast forward through entire animation
      act(() => {
        jest.advanceTimersByTime(200);
      });

      await waitFor(() => {
        expect(result.current.displayedText).toBe('Hi');
        expect(result.current.isTyping).toBe(false);
        expect(onComplete).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Reset functionality', () => {
    it('should reset state when reset is called', async () => {
      const { result } = renderHook(() => 
        useTypingEffect('Hello', { baseDelay: 50, randomDelay: 0 })
      );

      // Start typing
      act(() => {
        result.current.startTyping();
      });

      // Let some characters type
      act(() => {
        jest.advanceTimersByTime(100);
      });

      await waitFor(() => {
        expect(result.current.displayedText.length).toBeGreaterThan(0);
        expect(result.current.isTyping).toBe(true);
      });

      // Reset
      act(() => {
        result.current.reset();
      });

      expect(result.current.displayedText).toBe('');
      expect(result.current.isTyping).toBe(false);
    });

    it('should reset state when startTyping is called multiple times', async () => {
      const { result } = renderHook(() => 
        useTypingEffect('Hello', { baseDelay: 50, randomDelay: 0 })
      );

      // Start typing first time
      act(() => {
        result.current.startTyping();
      });

      // Let some characters type
      act(() => {
        jest.advanceTimersByTime(100);
      });

      await waitFor(() => {
        expect(result.current.displayedText.length).toBeGreaterThan(0);
      });

      // Store displayed text before reset
      const firstDisplayedText = result.current.displayedText;
      expect(firstDisplayedText.length).toBeGreaterThan(0);

      // Start typing again (should reset)
      act(() => {
        result.current.startTyping();
      });

      expect(result.current.displayedText).toBe('');
      expect(result.current.isTyping).toBe(true);

      // Verify it starts fresh
      act(() => {
        jest.advanceTimersByTime(50);
      });

      await waitFor(() => {
        expect(result.current.displayedText).toBe('H');
      });
    });
  });

  describe('Options configuration', () => {
    it('should respect custom baseDelay', async () => {
      const { result } = renderHook(() => 
        useTypingEffect('Hi', { baseDelay: 100, randomDelay: 0 })
      );

      act(() => {
        result.current.startTyping();
      });

      // Should not have typed after 50ms
      act(() => {
        jest.advanceTimersByTime(50);
      });

      expect(result.current.displayedText).toBe('');

      // Should have typed after 100ms
      act(() => {
        jest.advanceTimersByTime(50);
      });

      await waitFor(() => {
        expect(result.current.displayedText).toBe('H');
      });
    });

    it('should call onComplete when typing finishes', async () => {
      const onComplete = jest.fn();
      const { result } = renderHook(() => 
        useTypingEffect('X', { baseDelay: 50, randomDelay: 0, onComplete })
      );

      act(() => {
        result.current.startTyping();
      });

      act(() => {
        jest.advanceTimersByTime(100);
      });

      await waitFor(() => {
        expect(onComplete).toHaveBeenCalledTimes(1);
        expect(result.current.isTyping).toBe(false);
      });
    });
  });

  describe('Text changes', () => {
    it('should handle text prop changes', () => {
      const { result, rerender } = renderHook(
        ({ text }) => useTypingEffect(text, { baseDelay: 50, randomDelay: 0 }),
        { initialProps: { text: 'Hello' } }
      );

      // Start typing original text
      act(() => {
        result.current.startTyping();
      });

      act(() => {
        jest.advanceTimersByTime(50);
      });

      // Change text prop
      rerender({ text: 'World' });

      // Previous typing should continue with old text
      act(() => {
        jest.advanceTimersByTime(50);
      });

      // Start typing again with new text
      act(() => {
        result.current.startTyping();
      });

      act(() => {
        jest.advanceTimersByTime(50);
      });

      expect(result.current.displayedText).toBe('W');
    });
  });

  describe('Cleanup', () => {
    it('should cleanup timers on unmount', () => {
      const { result, unmount } = renderHook(() => 
        useTypingEffect('Hello', { baseDelay: 50, randomDelay: 0 })
      );

      act(() => {
        result.current.startTyping();
      });

      expect(result.current.isTyping).toBe(true);

      // Unmount component
      unmount();

      // Advance timers - should not cause any issues
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      // No assertions needed - test passes if no errors are thrown
    });
  });
});
