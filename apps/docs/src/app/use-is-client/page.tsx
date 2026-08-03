'use client';

import CodeBlock from '@/components/CodeBlock';

export default function Page() {
  const codeString = `
import { useIsClient } from '@danixsoft/hooks';

function Example() {
  const isClient = useIsClient();
  
  return <div>Client: {isClient ? 'Yes' : 'No'}</div>;
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useIsClient</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Safely determine if code is running on the client.</p>
      </div>
      <CodeBlock code={codeString} />
    </div>
  );
}
