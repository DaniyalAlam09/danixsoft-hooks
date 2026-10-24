'use client';

import { useLocalStorage } from '@danixsoft/hooks';

export default function UseLocalStoragePage() {
  const [theme, setTheme] = useLocalStorage<'dark' | 'light'>('docs-theme', 'dark');

  return (
    <div>
      
      <div className="bg-surface rounded overflow-hidden shadow-[var(--shadow-md)] border border-border p-8 mb-8 transition-colors">
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-fg-muted">Stored value:</span>
          <span aria-live="polite" className="px-3 py-1 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 font-mono text-sm">{theme}</span>
        </div>
        
        <div className="flex space-x-4">
          <button 
            onClick={() => setTheme('light')}
            className={`px-6 py-2.5 rounded font-medium text-sm transition-all shadow-[var(--shadow-sm)] border border-border border ${theme === 'light' ? 'bg-blue-500  text-white' : 'bg-white text-fg-muted  hover:bg-bg-subtle dark:text-fg-muted hover:bg-bg-muted'}`}
          >
            Light
          </button>
          <button 
            onClick={() => setTheme('dark')}
            className={`px-6 py-2.5 rounded font-medium text-sm transition-all shadow-[var(--shadow-sm)] border border-border border ${theme === 'dark' ? 'bg-blue-500  text-white' : 'bg-white text-fg-muted  hover:bg-bg-subtle dark:text-fg-muted hover:bg-bg-muted'}`}
          >
            Dark
          </button>
        </div>
        <p className="text-sm text-fg-muted mt-6">Pick a value, then reload the page or open it in a second tab: the choice is stored under the <code>docs-theme</code> key and every tab stays in sync. This demo only stores the value; the site theme is controlled from the header.</p>
      </div>
    </div>
  );
}
