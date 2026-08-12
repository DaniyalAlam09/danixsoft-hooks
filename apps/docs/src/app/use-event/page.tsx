'use client';

import CodeBlock from '@/components/CodeBlock';

export default function Page() {
  const codeString = `
import { useEvent } from '@danixsoft/hooks';
import { useCallback } from 'react';

function Example({ onClick }) {
  // Always stable reference, but always executes the latest onClick
  const handleClick = useEvent((e) => {
    onClick(e);
  });
  
  return <button onClick={handleClick}>Click Me</button>;
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useEvent</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Create a stable, memoized callback function.</p>
      </div>
      <CodeBlock code={codeString} />
    </div>
  );
}
