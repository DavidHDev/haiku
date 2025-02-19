import React from 'react';
import { useTimer } from 'react-haiku';

export const UseTimerDemo = () => {
  const { time, isRunning, start, pause, reset } = useTimer({
    startTime: 0,
    endTime: 10000,
    interval: 1000,
  });

  return (
    <div className="demo-container-center">
      <h3 style={{ marginBottom: '1em' }}>Time: {time}</h3>
      <div className="demo-control-group">
        <button
          className="demo-button orange-button"
          onClick={start}
          disabled={isRunning}
        >
          Start
        </button>

        <button
          className="demo-button orange-button"
          onClick={pause}
          disabled={!isRunning}
        >
          Pause
        </button>
        <button className="demo-button red-button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};
