'use client';

import CodeBlock from '@/components/CodeBlock';

export default function Page() {
  const codeString = `
import { useInterval } from '@danixsoft/hooks';

function Example() {
  useInterval(() => {
    console.log('Tick!');
  }, 1000);
  
  return <div>Check console</div>;
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useInterval</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Declarative setInterval for React.</p>
      </div>
      <CodeBlock code={codeString} />
    </div>
  );
}
