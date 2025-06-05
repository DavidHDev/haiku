import { useState, useEffect } from 'react';

const useMutation = (
  apiUrl: string,
  payload: any,
  headers: Record<string, string> = {},
  options: { method?: string; timeout?: number } = {},
  onSuccess?: (data: any) => void,
  onError?: (error: string) => void
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const timeoutId = options.timeout ? setTimeout(() => {
      if (isMounted) {
        setLoading(false);
        setError('Request timed out');
      }
    }, options.timeout) : undefined;

    setLoading(true);
    setError(null);

    fetch(apiUrl, {
      method: options.method || 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(payload),

    })
      .then((response) => {
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error('Request failed');
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          setLoading(false);
          setResponse(data);
          if (onSuccess) {
            onSuccess(data);
          }
        }
      })
      .catch((error) => {
        if (isMounted) {
          setLoading(false);
          setError(error.message || 'Something went wrong');
          if (onError) {
            onError(error.message || 'Something went wrong');
          }
        }
      });

    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [apiUrl, payload, headers, options.timeout, onSuccess, onError]);

  return { loading, response, error };
};

export default useMutation;
