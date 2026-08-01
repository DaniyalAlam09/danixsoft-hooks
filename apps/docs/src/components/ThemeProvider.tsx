'use client';

import { useLocalStorage } from '@danixsoft/hooks';
import { useEffect, useState } from 'react';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useLocalStorage<'dark' | 'light'>('docs-theme', 'dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Prevent Next.js hydration errors by forcing initial render to match server (dark)
  const currentTheme = mounted ? theme : 'dark';

  return (
    <div className={`theme-wrapper ${currentTheme} w-full h-full bg-neutral-50 dark:bg-[#121212] text-neutral-900 dark:text-neutral-50 transition-colors duration-300`}>
      <div className={mounted ? 'opacity-100 transition-opacity duration-300' : 'opacity-0'}>
        {children}
      </div>
    </div>
  );
}
