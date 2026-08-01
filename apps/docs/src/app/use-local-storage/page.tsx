'use client';

import { useLocalStorage } from '@danixsoft/hooks';
import CodeBlock from '@/components/CodeBlock';

export default function UseLocalStoragePage() {
  const [theme, setTheme] = useLocalStorage<'dark' | 'light'>('docs-theme', 'dark');

  const codeString = `
import { useLocalStorage } from '@danixsoft/hooks';

function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Current Theme: {theme}
    </button>
  );
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useLocalStorage</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Sync state to localStorage so it persists across reloads.</p>
      </div>
      
      <div id="demo" className="bg-white dark:bg-[#1e1e1e]  rounded overflow-hidden shadow-md dark:shadow-none dark:border dark:border-white/10 p-8 mb-8 transition-colors">
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-neutral-700 dark:text-neutral-300">Current Theme in Storage:</span>
          <span className="px-3 py-1 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 font-mono text-sm">{theme}</span>
        </div>
        
        <div className="flex space-x-4">
          <button 
            onClick={() => setTheme('light')}
            className={`px-6 py-2.5 rounded font-medium text-sm transition-all shadow-sm dark:shadow-none dark:border dark:border-white/10 border ${theme === 'light' ? 'bg-blue-500  text-white' : 'bg-white text-neutral-700  hover:bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'}`}
          >
            Light Mode ☀️
          </button>
          <button 
            onClick={() => setTheme('dark')}
            className={`px-6 py-2.5 rounded font-medium text-sm transition-all shadow-sm dark:shadow-none dark:border dark:border-white/10 border ${theme === 'dark' ? 'bg-blue-500  text-white' : 'bg-white text-neutral-700  hover:bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'}`}
          >
            Dark Mode 🌙
          </button>
        </div>
        <p className="text-sm text-neutral-500 mt-6">Try reloading the page, or clicking a different link in the sidebar. Notice how the whole site theme changes globally because it's wrapped in our ThemeProvider using this exact hook!</p>
      </div>

      <CodeBlock code={codeString} />
    </div>
  );
}
