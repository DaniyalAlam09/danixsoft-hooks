'use client';

import { useCounter } from '@danixsoft/hooks';
import CodeBlock from '@/components/docs/code-block';

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
    <div>
      
      <div className="bg-surface rounded overflow-hidden shadow-[var(--shadow-md)] border border-border mb-8">
        <div className="p-4 border-b bg-bg-subtle flex items-center justify-between">
          <span className="text-sm font-medium text-fg-muted">Live Demo</span>
        </div>
        <div className="p-8 flex flex-col items-center justify-center min-h-[300px] bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
          
          <div className="text-8xl font-black text-indigo-500 dark:text-indigo-400 mb-8 drop-shadow-sm font-mono tracking-tighter">
            {count}
          </div>
          
          <div className="flex space-x-3 bg-surface/60 p-2 rounded-xl backdrop-blur-sm shadow-[var(--shadow-sm)] border border-border">
            <button onClick={decrement} className="px-6 py-3 rounded-lg font-medium text-lg bg-surface-raised text-fg shadow hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow transition-all border border-border">-</button>
            <button onClick={reset} className="px-6 py-3 rounded-lg font-medium text-sm bg-bg-muted text-fg-muted hover:bg-bg-muted transition-colors uppercase tracking-widest border border-transparent">Reset</button>
            <button onClick={increment} className="px-6 py-3 rounded-lg font-medium text-lg bg-indigo-500 text-white shadow-indigo-500/20 shadow-lg hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 active:shadow transition-all border border-transparent">+</button>
          </div>
          
          <div className="mt-4 text-xs font-medium text-fg-subtle uppercase tracking-widest">
            Bounded: [-10, 10]
          </div>

        </div>
      </div>
      <div id="usage" className="scroll-mt-24">
        <CodeBlock code={codeString} />
      </div>
    </div>
  );
}
