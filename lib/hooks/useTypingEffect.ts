import { useState, useCallback, useRef, useEffect } from 'react';

interface UseTypingEffectOptions {
  /** Base delay between characters in milliseconds */
  baseDelay?: number;
  /** Maximum additional random delay in milliseconds */
  randomDelay?: number;
  /** Function called when typing animation completes */
  onComplete?: () => void;
}

interface UseTypingEffectReturn {
  /** Current displayed text */
  displayedText: string;
  /** Whether the typing animation is currently running */
  isTyping: boolean;
  /** Function to start the typing animation */
  startTyping: () => void;
  /** Function to reset the displayed text */
  reset: () => void;
}

/**
 * Hook that simulates a typing effect by progressively updating the state 
 * with randomized delays for a natural feel.
 * 
 * @param text - The text to animate (must be non-empty string)
 * @param options - Configuration options for the typing effect
 * @returns Object containing displayed text, typing state, and control functions
 */
export function useTypingEffect(
  text: string,
  options: UseTypingEffectOptions = {}
): UseTypingEffectReturn {
  const {
    baseDelay = 50,
    randomDelay = 100,
    onComplete
  } = options;

  // Validate text parameter
  if (typeof text !== 'string' || text.length === 0) {
    throw new Error('useTypingEffect: text parameter must be a non-empty string');
  }

  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const currentIndexRef = useRef(0);

  // Clear any existing timeout when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setDisplayedText('');
    setIsTyping(false);
    currentIndexRef.current = 0;
  }, []);

  const typeNextCharacter = useCallback(() => {
    if (currentIndexRef.current < text.length) {
      setDisplayedText(text.slice(0, currentIndexRef.current + 1));
      currentIndexRef.current += 1;

      // Calculate randomized delay for natural typing feel
      const delay = baseDelay + Math.random() * randomDelay;
      
      timeoutRef.current = window.setTimeout(typeNextCharacter, delay);
    } else {
      // Typing complete
      setIsTyping(false);
      onComplete?.();
    }
  }, [text, baseDelay, randomDelay, onComplete]);

  const startTyping = useCallback(() => {
    // Reset state before starting (handles multiple calls)
    reset();
    
    setIsTyping(true);
    currentIndexRef.current = 0;
    
    // Start typing with initial delay
    const initialDelay = baseDelay + Math.random() * randomDelay;
    timeoutRef.current = window.setTimeout(typeNextCharacter, initialDelay);
  }, [reset, baseDelay, randomDelay, typeNextCharacter]);

  return {
    displayedText,
    isTyping,
    startTyping,
    reset
  };
}
