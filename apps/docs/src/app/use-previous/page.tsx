'use client';
import { useState } from 'react';
import { usePrevious } from '@danixsoft/hooks';
import CodeBlock from '@/components/CodeBlock';

export default function UsePreviousPage() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  const codeString = `
import { useState } from 'react';
import { usePrevious } from '@danixsoft/hooks';

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Now: {count}, Before: {prevCount}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">usePrevious</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Keep track of the previous render's state.</p>
      </div>
      <div id="demo" className="bg-white dark:bg-[#1e1e1e]  rounded p-8 text-neutral-900 dark:text-white shadow-md dark:shadow-none dark:border dark:border-white/10 mb-8 flex items-center justify-between">
        <div>
          <p className="mb-2 text-xl text-neutral-600 dark:text-neutral-400">Previous: <span className="font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-neutral-800 dark:text-neutral-300">{prevCount ?? 'undefined'}</span></p>
          <p className="mb-4 text-2xl font-bold">Current: <span className="text-blue-600 dark:text-blue-400">{count}</span></p>
        </div>
        <button onClick={() => setCount(c => c + 1)} className="px-8 py-4 bg-blue-600 text-white font-bold hover:bg-blue-500 rounded shadow dark:shadow-none dark:border dark:border-white/10 hover:shadow-blue-500/25 transition-all active:scale-95">Increment +</button>
      </div>
      <CodeBlock code={codeString} />
    </div>
  );
}
