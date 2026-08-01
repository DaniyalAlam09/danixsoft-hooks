'use client';
import { useLocalStorage } from '@danixsoft/hooks';

export default function RightSidebar() {
  const [theme, setTheme] = useLocalStorage<'dark' | 'light'>('docs-theme', 'dark');

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  
  return (
    <aside className="w-64 h-screen sticky top-0 overflow-y-auto p-8 hidden xl:block shrink-0 border-l border-neutral-200 dark:border-neutral-800 pb-20 custom-scrollbar">
      <div className="space-y-10">
        <div>
          <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-4">On this page</h4>
          <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400 font-medium">
            <li>
              <a href="#top" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Overview</a>
            </li>
            <li>
              <a href="#demo" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Live Demo</a>
            </li>
            <li>
              <a href="#usage" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Usage Example</a>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-4">Community</h4>
          <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400 font-medium">
            <li>
              <a href="https://github.com/danixsoft/hooks" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                <span>GitHub</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/danixsoft/hooks/issues" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>Report an Issue</span>
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-4">Appearance</h4>
          <button 
            onClick={toggleTheme}
            className="flex items-center space-x-3 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-neutral-100 dark:bg-[#121212] px-4 py-2 rounded shadow-sm w-full"
          >
            {theme === 'dark' ? (
              <>
                <span className="text-lg">☀️</span>
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <span className="text-lg">🌙</span>
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
