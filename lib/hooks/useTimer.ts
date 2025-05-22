import { useState, useEffect, useRef } from 'react';

interface UseTimerProps {
  startTime?: number;
  endTime?: number;
  interval?: number;
}

interface UseTimerReturn {
  time: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

const validateInputs = (
  startTime?: number,
  endTime?: number,
  interval?: number,
) => {
  if (
    typeof startTime !== 'number' ||
    (endTime !== undefined && typeof endTime !== 'number')
  ) {
    throw new Error('startTime and endTime must be numbers');
  }
  if (interval !== undefined && interval <= 0) {
    throw new Error('Interval must be a positive number');
  }
};

export const useTimer = ({
  startTime = 0,
  endTime,
  interval = 1000,
}: UseTimerProps): UseTimerReturn => {
  validateInputs(startTime, endTime, interval);
  const [time, setTime] = useState<number>(startTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isCountingDown = endTime !== undefined && startTime > endTime;

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          const nextTime = isCountingDown ? prevTime - 1 : prevTime + 1;

          //  Stop timer when it reaches the endTime
          if (
            (isCountingDown &&
              nextTime <= (endTime ?? Number.NEGATIVE_INFINITY)) ||
            (!isCountingDown &&
              nextTime >= (endTime ?? Number.POSITIVE_INFINITY))
          ) {
            clearInterval(timerRef.current!);
            setIsRunning(false); // Ensure timer stops
            return endTime!;
          }

          return nextTime;
        });
      }, interval);
    } else {
      // Clear timer when paused or stopped
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, endTime, interval, isCountingDown]);

  const start = () => {
    if (!isRunning) setIsRunning(true); // Prevent multiple starts
  };

  const pause = () => {
    if (isRunning) setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(startTime); // Reset time to initial value
  };

  return { time, isRunning, start, pause, reset };
};
