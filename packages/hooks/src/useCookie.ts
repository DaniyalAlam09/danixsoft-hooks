import { useCallback, useSyncExternalStore } from 'react';

export interface CookieOptions {
  /** Cookie path. Defaults to `/`. */
  path?: string;
  /** Cookie domain. Defaults to the current host. */
  domain?: string;
  /** SameSite policy. Defaults to `Lax`. */
  sameSite?: 'Strict' | 'Lax' | 'None';
  /** Send only over HTTPS. Defaults to `true` when the page is served over HTTPS. */
  secure?: boolean;
}

const COOKIE_EVENT = 'danixsoft-hooks:cookie';

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/** Reads a cookie from `document.cookie`, or `null` if it is not set (or on the server). */
function readCookie(cookieName: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(
    new RegExp('(?:^|;\\s*)' + escapeRegExp(cookieName) + '=([^;]*)')
  );
  return match ? safeDecode(match[1]) : null;
}

function writeCookie(cookieName: string, raw: string, expires: Date, options: CookieOptions): void {
  const secure =
    options.secure ?? (typeof location !== 'undefined' && location.protocol === 'https:');
  const parts = [
    `${cookieName}=${raw}`,
    `expires=${expires.toUTCString()}`,
    `path=${options.path ?? '/'}`,
    `SameSite=${options.sameSite ?? 'Lax'}`,
  ];
  if (options.domain) parts.push(`domain=${options.domain}`);
  if (secure) parts.push('Secure');
  document.cookie = parts.join('; ');
  window.dispatchEvent(new CustomEvent(COOKIE_EVENT, { detail: cookieName }));
}

const getServerSnapshot = (): string | null => null;

/**
 * A single browser cookie as React state, shared by every component that
 * uses the same cookie name.
 *
 * SSR-safe: renders `null` on the server and during hydration, then the real
 * cookie value right after, so there is no hydration mismatch. Values are
 * URI-encoded on write and decoded on read.
 *
 * @returns `[value, updateCookie, deleteCookie]`.
 */
export function useCookie(cookieName: string, options: CookieOptions = {}) {
  const { path, domain, sameSite, secure } = options;

  const subscribe = useCallback(
    (onChange: () => void) => {
      if (typeof window === 'undefined') return () => {};
      const onCookie = (event: Event) => {
        if ((event as CustomEvent<string>).detail === cookieName) onChange();
      };
      // Cookies have no change event; re-check when the tab regains focus so
      // changes made by the server or another tab show up.
      const onVisible = () => {
        if (document.visibilityState === 'visible') onChange();
      };
      window.addEventListener(COOKIE_EVENT, onCookie);
      document.addEventListener('visibilitychange', onVisible);
      return () => {
        window.removeEventListener(COOKIE_EVENT, onCookie);
        document.removeEventListener('visibilitychange', onVisible);
      };
    },
    [cookieName]
  );

  const getSnapshot = useCallback(() => readCookie(cookieName), [cookieName]);

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const updateCookie = useCallback(
    (newValue: string, days = 365) => {
      if (typeof document === 'undefined') return;
      const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
      writeCookie(cookieName, encodeURIComponent(newValue), expires, {
        path,
        domain,
        sameSite,
        secure,
      });
    },
    [cookieName, path, domain, sameSite, secure]
  );

  const deleteCookie = useCallback(() => {
    if (typeof document === 'undefined') return;
    writeCookie(cookieName, '', new Date(0), { path, domain, sameSite, secure });
  }, [cookieName, path, domain, sameSite, secure]);

  return [value, updateCookie, deleteCookie] as const;
}
