'use client';
import { useState } from 'react';
import { usePrevious } from '@danixsoft/hooks';

export default function UsePreviousPage() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <div className="bg-surface rounded p-8 text-fg shadow-[var(--shadow-md)] border border-border mb-8 flex items-center justify-between">
        <div>
          <p className="mb-2 text-xl text-fg-muted">Previous: <span className="font-mono bg-bg-muted px-2 py-1 rounded text-fg">{prevCount ?? 'undefined'}</span></p>
          <p className="mb-4 text-2xl font-bold">Current: <span className="text-blue-600 dark:text-blue-400">{count}</span></p>
        </div>
        <button onClick={() => setCount(c => c + 1)} className="px-8 py-4 bg-blue-600 text-white font-bold hover:bg-blue-500 rounded shadow dark:shadow-none border border-border hover:shadow-blue-500/25 transition-all active:scale-95">Increment +</button>
      </div>
    </div>
  );
}
