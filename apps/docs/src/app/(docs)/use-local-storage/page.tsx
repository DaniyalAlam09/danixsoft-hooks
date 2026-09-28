'use client';

import { useLocalStorage } from '@danixsoft/hooks';

export default function UseLocalStoragePage() {
  const [theme, setTheme] = useLocalStorage<'dark' | 'light'>('docs-theme', 'dark');

  return (
    <div>
      
      <div className="bg-surface rounded overflow-hidden shadow-[var(--shadow-md)] border border-border p-8 mb-8 transition-colors">
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-fg-muted">Current Theme in Storage:</span>
          <span className="px-3 py-1 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 font-mono text-sm">{theme}</span>
        </div>
        
        <div className="flex space-x-4">
          <button 
            onClick={() => setTheme('light')}
            className={`px-6 py-2.5 rounded font-medium text-sm transition-all shadow-[var(--shadow-sm)] border border-border border ${theme === 'light' ? 'bg-blue-500  text-white' : 'bg-white text-fg-muted  hover:bg-bg-subtle dark:text-fg-muted hover:bg-bg-muted'}`}
          >
            Light Mode ☀️
          </button>
          <button 
            onClick={() => setTheme('dark')}
            className={`px-6 py-2.5 rounded font-medium text-sm transition-all shadow-[var(--shadow-sm)] border border-border border ${theme === 'dark' ? 'bg-blue-500  text-white' : 'bg-white text-fg-muted  hover:bg-bg-subtle dark:text-fg-muted hover:bg-bg-muted'}`}
          >
            Dark Mode 🌙
          </button>
        </div>
        <p className="text-sm text-fg-muted mt-6">Try reloading the page, or clicking a different link in the sidebar. Notice how the whole site theme changes globally because it&apos;s wrapped in our ThemeProvider using this exact hook!</p>
      </div>
    </div>
  );
}
