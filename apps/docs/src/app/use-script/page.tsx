'use client';

import CodeBlock from '@/components/CodeBlock';

export default function Page() {
  const codeString = `
import { useScript } from '@danixsoft/hooks';

function Example() {
  const status = useScript('https://code.jquery.com/jquery-3.6.0.min.js');

  return (
    <div>
      <p>Script status: {status}</p>
      {status === 'ready' && <p>jQuery is ready!</p>}
    </div>
  );
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useScript</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Dynamically load and inject external scripts.</p>
      </div>
      <CodeBlock code={codeString} />
    </div>
  );
}
