'use client';

import { useCounter } from '@danixsoft/hooks';
import CodeBlock from '@/components/CodeBlock';

export default function UseCounterPage() {
  const { count, increment, decrement, reset } = useCounter(0, { min: -10, max: 10 });

  const codeString = `
import { useCounter } from '@danixsoft/hooks';

function Counter() {
  const { count, increment, decrement, reset } = useCounter(0, {
    min: -10,
    max: 10,
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useCounter</h2>
        <p className="text-neutral-500 dark:text-neutral-400">A powerful hook that provides counting logic with bounds and step increments.</p>
      </div>
      
      <div id="demo" className="bg-white dark:bg-[#1e1e1e] rounded overflow-hidden shadow-md dark:shadow-none dark:border dark:border-white/10 mb-8">
        <div className="p-4 border-b bg-neutral-50 dark:bg-[#1e1e1e]/50 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Live Demo</span>
        </div>
        <div className="p-8 flex flex-col items-center justify-center min-h-[300px] bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
          
          <div className="text-8xl font-black text-indigo-500 dark:text-indigo-400 mb-8 drop-shadow-sm font-mono tracking-tighter">
            {count}
          </div>
          
          <div className="flex space-x-3 bg-white/50 dark:bg-[#121212]/50 p-2 rounded-xl backdrop-blur-sm shadow-sm dark:shadow-none dark:border dark:border-white/10">
            <button onClick={decrement} className="px-6 py-3 rounded-lg font-medium text-lg bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 shadow hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow transition-all border border-neutral-200 dark:border-transparent">-</button>
            <button onClick={reset} className="px-6 py-3 rounded-lg font-medium text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors uppercase tracking-widest border border-transparent">Reset</button>
            <button onClick={increment} className="px-6 py-3 rounded-lg font-medium text-lg bg-indigo-500 text-white shadow-indigo-500/20 shadow-lg hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 active:shadow transition-all border border-transparent">+</button>
          </div>
          
          <div className="mt-4 text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
            Bounded: [-10, 10]
          </div>

        </div>
      </div>
      <CodeBlock code={codeString} />
    </div>
  );
}
