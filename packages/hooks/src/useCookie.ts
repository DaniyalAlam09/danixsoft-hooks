import { useState, useCallback } from 'react';

export function useCookie(cookieName: string) {
  const [value, setValue] = useState<string | null>(() => {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
    return match ? match[2] : null;
  });

  const updateCookie = useCallback(
    (newValue: string, days = 365) => {
      if (typeof document === 'undefined') return;
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `${cookieName}=${newValue}; ${expires}; path=/`;
      setValue(newValue);
    },
    [cookieName]
  );

  const deleteCookie = useCallback(() => {
    if (typeof document === 'undefined') return;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    setValue(null);
  }, [cookieName]);

  return [value, updateCookie, deleteCookie] as const;
}
