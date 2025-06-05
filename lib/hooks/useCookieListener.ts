import { useRef, useEffect } from 'react';

import { parseToCookieType, getCookies, parseToDataType } from '../helpers/cookie';

export const useCookieListener = <T>(
  effect: (a: T, b: string) => void,
  cookies: string[],
) => {
  const cookieValues = useRef<Record<string, unknown>>(getCookies(cookies));

  useEffect(() => {
    const cookieOnChange = () => {
      const currentCookiesValues = getCookies(cookies);

      Object.entries(cookieValues.current).forEach(
        ([cookieKey, cookieValue]) => {
          const currentCookie = currentCookiesValues[cookieKey];

          if (
            parseToCookieType(currentCookie) !== parseToCookieType(cookieValue)
          ) {
            cookieValues.current = {
              ...cookieValues.current,
              [cookieKey]: currentCookie,
            };

            const parsedValue = parseToDataType<T>(
              parseToCookieType(currentCookie),
            );
            if (parsedValue !== undefined) {
              effect(parsedValue, cookieKey);
            }
          }
        },
      );
    };

    const cookieInterval = setInterval(cookieOnChange, 1000);

    return () => {
      clearInterval(cookieInterval);
    };
  }, [effect, cookies]);
};
