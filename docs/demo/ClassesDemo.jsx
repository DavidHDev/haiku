import React, { useState } from 'react';
import { Classes } from 'react-haiku';

export const ClassDemo = () => {
  const [isElevated, setIsElevated] = useState(false);
  const [isBordered, setIsBordered] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div className="demo-container-center">
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5em',
            marginBlockEnd: '10px',
          }}
        >
          <span>Elevated</span>
          <input
            type="checkbox"
            value={isElevated}
            onChange={() => setIsElevated(!isElevated)}
          />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5em',
            marginBlockEnd: '10px',
          }}
        >
          <span>Bordered</span>
          <input
            type="checkbox"
            value={isBordered}
            onChange={() => setIsBordered(!isBordered)}
          />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5em',
            marginBlockEnd: '50px',
          }}
        >
          <span>Disabled</span>
          <input
            type="checkbox"
            value={isDisabled}
            onChange={() => setIsDisabled(!isDisabled)}
          />
        </div>
      </div>

      <Classes
        className="demo-card"
        as="section"
        toggleClasses={{
          'demo-card--elevated': isElevated,
          'demo-card--bordered': isBordered,
          'demo-card--disabled': isDisabled,
        }}
      >
        <h2>Card header</h2>
        <p>Card content</p>
      </Classes>
    </div>
  );
};
