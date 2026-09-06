'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from 'react';
import { THEME_STORAGE_KEY } from './theme-script';
import { useHydrated } from '@/lib/use-hydrated';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeContextValue {
  /** What the user picked — may be 'system'. */
  theme: Theme;
  /** What is actually on screen right now. */
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  /** False until after hydration; guards theme-dependent icons. */
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Same-tab notification; the native `storage` event only fires in other tabs. */
const THEME_CHANGE_EVENT = 'danixsoft-theme-change';

const DARK_QUERY = '(prefers-color-scheme: dark)';

/**
 * The theme lives in localStorage and the OS setting — both external stores —
 * so they are read through useSyncExternalStore. React then owns the
 * server/client transition and no effect has to call setState.
 */
function subscribe(onChange: () => void) {
  const media = window.matchMedia(DARK_QUERY);
  window.addEventListener('storage', onChange);
  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  media.addEventListener('change', onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);
    media.removeEventListener('change', onChange);
  };
}

function readStoredTheme(): Theme {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    return raw === 'light' || raw === 'dark' ? raw : 'system';
  } catch {
    // Storage blocked (private mode, cookies disabled) — follow the OS.
    return 'system';
  }
}

const readSystemPrefersDark = () => window.matchMedia(DARK_QUERY).matches;

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const hydrated = useHydrated();

  const theme = useSyncExternalStore(
    subscribe,
    readStoredTheme,
    () => 'system' as Theme,
  );

  const prefersDark = useSyncExternalStore(
    subscribe,
    readSystemPrefersDark,
    () => true,
  );

  const resolvedTheme: ResolvedTheme =
    theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;

  // Keep the DOM in step with the resolved theme. This synchronises an
  // external system (the document element) rather than React state.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', resolvedTheme === 'dark');
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const setTheme = useCallback((next: Theme) => {
    try {
      if (next === 'system') localStorage.removeItem(THEME_STORAGE_KEY);
      else localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage blocked — the change still applies for this page view.
    }
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  const toggleTheme = useCallback(
    () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
    [resolvedTheme, setTheme],
  );

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
      mounted: hydrated,
    }),
    [theme, resolvedTheme, setTheme, toggleTheme, hydrated],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside <ThemeProvider>');
  }
  return context;
}
