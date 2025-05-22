import React from "react";
import { useState } from "react";
import { usePrevious } from "react-haiku"

export const UsePreviousDemo = () => {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  function handleIncrement() {
    setCount(prev => prev + 1)
  }

  function handleDecrement() {
    setCount(prev => prev - 1)
  }

  return (
    <div className="demo-container-center">
      <h3 style={{ marginBottom: '1em' }}>Current Value: {count}</h3>
      <h3 style={{ marginBottom: '1em' }}>Previous Value: {prevCount}</h3>

      <div style={{ marginTop: '1.5em', display: 'flex', gap: '1em' }}>
        <button className="demo-button green-button" onClick={handleIncrement}>
          Increment
        </button>
        <button className="demo-button red-button" onClick={handleDecrement}>
          Decrement
        </button>
      </div>
    </div>
  );
}
