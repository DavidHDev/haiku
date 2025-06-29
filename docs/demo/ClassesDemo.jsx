import React, { useState } from 'react';
import { Classes } from 'react-haiku';

export const ClassesDemo = () => {
  const [hasError, setHasError] = useState(false);
  const [isSquared, setIsSquared] = useState(false);
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
          <label htmlFor="squared" style={{ marginBottom: '5px' }}>
            Squared
          </label>
          <input
            type="checkbox"
            id="squared"
            value={isSquared}
            onChange={() => setIsSquared(!isSquared)}
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
        disabled={isDisabled}
        className="demo-classes-input"
        toggleClasses={{
          'demo-classes-input--error': hasError,
          'demo-classes-input--squared': isSquared,
          'demo-classes-input--disabled': isDisabled,
        }}
      />
    </div>
  );
};
