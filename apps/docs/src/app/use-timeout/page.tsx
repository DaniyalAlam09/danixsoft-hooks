'use client';

import CodeBlock from '@/components/CodeBlock';

export default function Page() {
  const codeString = `
import { useTimeout } from '@danixsoft/hooks';

function Example() {
  useTimeout(() => {
    console.log('Timeout!');
  }, 3000);
  
  return <div>Wait 3 seconds...</div>;
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useTimeout</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Declarative setTimeout for React.</p>
      </div>
      <CodeBlock code={codeString} />
    </div>
  );
}
