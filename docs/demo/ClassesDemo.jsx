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
        <div className="demo-classes-form-control">
          <label htmlFor="error">Error</label>
          <input
            type="checkbox"
            id="error"
            value={hasError}
            onChange={() => setHasError(!hasError)}
          />
        </div>

        <div className="demo-classes-form-control">
          <label htmlFor="squared">Squared</label>
          <input
            type="checkbox"
            id="squared"
            value={isSquared}
            onChange={() => setIsSquared(!isSquared)}
          />
        </div>

        <div className="demo-classes-form-control">
          <label htmlFor="disabled">Disabled</label>
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
