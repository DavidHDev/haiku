import React, { useState } from 'react';
import { Classes } from 'react-haiku';

export const ClassesDemo = () => {
  const [hasError, setHasError] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div className="demo-container-center">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBlockEnd: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5em',
          }}
        >
          <label htmlFor="error" style={{ marginBottom: '5px' }}>
            Error
          </label>
          <input
            type="checkbox"
            id="error"
            value={hasError}
            onChange={() => setHasError(!hasError)}
          />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5em',
          }}
        >
          <label htmlFor="filled" style={{ marginBottom: '5px' }}>
            Filled
          </label>
          <input
            type="checkbox"
            id="filled"
            value={isFilled}
            onChange={() => setIsFilled(!isFilled)}
          />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5em',
          }}
        >
          <label htmlFor="disabled" style={{ marginBottom: '5px' }}>
            Disabled
          </label>
          <input
            type="checkbox"
            id="disabled"
            value={isDisabled}
            onChange={() => setIsDisabled(!isDisabled)}
          />
        </div>
      </div>

      <Classes
        as="input"
        className="demo-classes-input"
        toggleClasses={{
          'demo-classes-input--error': hasError,
          'demo-classes-input--filled': isFilled,
          'demo-classes-input--disabled': isDisabled,
        }}
      />
    </div>
  );
};
