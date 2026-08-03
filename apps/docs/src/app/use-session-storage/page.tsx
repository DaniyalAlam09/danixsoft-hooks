'use client';

import CodeBlock from '@/components/CodeBlock';

export default function Page() {
  const codeString = `
import { useSessionStorage } from '@danixsoft/hooks';

function Example() {
  const [value, setValue] = useSessionStorage('my-key', 'default');
  
  return (
    <div>
      <p>Value: {value}</p>
    </div>
  );
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useSessionStorage</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Manage state persisted in sessionStorage.</p>
      </div>
      
      <div id="demo" className="bg-white dark:bg-[#1e1e1e] rounded overflow-hidden shadow-md dark:shadow-none dark:border dark:border-white/10 mb-8">
        <div className="p-4 border-b bg-neutral-50 dark:bg-[#1e1e1e]/50 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Live Demo Placeholder</span>
        </div>
        <div className="p-8 flex flex-col items-center justify-center min-h-[300px] bg-neutral-50 dark:bg-[#121212]">
          <p className="text-neutral-500">Interactive demo coming soon.</p>
        </div>
      </div>
      <CodeBlock code={codeString} />
    </div>
  );
}
