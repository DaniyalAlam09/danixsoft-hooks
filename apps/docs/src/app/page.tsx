'use client';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';

export default function Home() {
  const codeString = `
import { useToggle, useLocalStorage } from '@danixsoft/hooks';

function App() {
  const [isOpen, toggle] = useToggle(false);
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  return (
    <div>
      <button onClick={toggle}>
        {isOpen ? 'Close' : 'Open'}
      </button>
    </div>
  );
}`;

  return (
    <div className="p-8 md:p-12 lg:p-16 w-full">
      <div className="mb-16 max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">
          Supercharge your React Workflow
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg md:text-xl leading-relaxed mb-8">
          A collection of beautiful, robust, and dependency-free React hooks. 
          Stop copying and pasting the same utility functions across projects. 
          Get instant access to a battle-tested library of essential hooks.
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/use-local-storage" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded shadow-md transition-colors text-center uppercase tracking-wider text-sm">
            Browse Hooks
          </Link>
          <a href="https://github.com/danixsoft/hooks" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-neutral-200 dark:bg-[#1e1e1e] hover:bg-neutral-300 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white font-medium rounded shadow-sm transition-colors text-center uppercase tracking-wider text-sm flex items-center justify-center space-x-2">
             <span>GitHub Repository</span>
          </a>
        </div>
      </div>

      <div className="mb-16">
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Installation</h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          Install the library in your project via your favorite package manager:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#1e1e1e] p-5 rounded shadow-sm dark:shadow-none dark:border dark:border-white/10 flex flex-col justify-center">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">npm</span>
            <code className="text-blue-600 dark:text-blue-400 font-mono text-sm">npm install @danixsoft/hooks</code>
          </div>
          <div className="bg-white dark:bg-[#1e1e1e] p-5 rounded shadow-sm dark:shadow-none dark:border dark:border-white/10 flex flex-col justify-center">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">yarn</span>
            <code className="text-blue-600 dark:text-blue-400 font-mono text-sm">yarn add @danixsoft/hooks</code>
          </div>
          <div className="bg-white dark:bg-[#1e1e1e] p-5 rounded shadow-sm dark:shadow-none dark:border dark:border-white/10 flex flex-col justify-center">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">pnpm</span>
            <code className="text-blue-600 dark:text-blue-400 font-mono text-sm">pnpm add @danixsoft/hooks</code>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Key Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded shadow-sm dark:shadow-none dark:border dark:border-white/10">
            <div className="text-3xl mb-4">🌳</div>
            <h4 className="font-bold text-neutral-900 dark:text-white mb-2">Tree-shakeable</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Import only what you need. Your final bundle size will remain microscopic.</p>
          </div>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded shadow-sm dark:shadow-none dark:border dark:border-white/10">
            <div className="text-3xl mb-4">🛡️</div>
            <h4 className="font-bold text-neutral-900 dark:text-white mb-2">TypeScript First</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Written entirely in TypeScript. Enjoy full autocomplete and type safety out of the box.</p>
          </div>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded shadow-sm dark:shadow-none dark:border dark:border-white/10">
            <div className="text-3xl mb-4">🪶</div>
            <h4 className="font-bold text-neutral-900 dark:text-white mb-2">Zero Dependencies</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">We don't rely on any third-party libraries. Built entirely on React primitives.</p>
          </div>
          <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded shadow-sm dark:shadow-none dark:border dark:border-white/10">
            <div className="text-3xl mb-4">🚀</div>
            <h4 className="font-bold text-neutral-900 dark:text-white mb-2">SSR Compatible</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Works flawlessly with Next.js and Remix Server-Side Rendering.</p>
          </div>
        </div>
      </div>

      <div className="mb-16 max-w-3xl">
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Quick Usage</h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          Every hook is exported from the main package. Simply import them by name.
        </p>
        <CodeBlock code={codeString} />
      </div>
      
    </div>
  );
}
