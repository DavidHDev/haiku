import React from 'react';
import { ErrorBoundary } from 'react-haiku';

interface FallbackProps {
  retry: () => void;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

const Fallback: React.FC<FallbackProps> = ({ retry }) => {
  return (
    <div className="demo-container-center">
      <b style={{ marginBottom: '1em' }}>We faced an error</b>
      <button
        className="demo-button"
        onClick={retry}
        style={{ marginBottom: '1em' }}
      >
        Retry
      </button>
    </div>
  );
};

// Component that will intentionally cause an error
const CrashComponent: React.FC = () => {
  // Only throw an error if window is defined (i.e., in a browser environment)
  // This prevents the error during Docusaurus build (SSR)
  if (typeof window !== 'undefined') {
    throw new Error('This is a test error inside the ErrorBoundary!');
  }
  return <p>This component would normally throw an error to demonstrate the ErrorBoundary.</p>;
};

export const ErrorBoundaryDemo: React.FC = () => {
  return (
    <ErrorBoundary fallback={Fallback}>
      <CrashComponent />
    </ErrorBoundary>
  );
};
