'use client';

import CodeBlock from '@/components/CodeBlock';

export default function Page() {
  const codeString = `
import { useUpdateEffect } from '@danixsoft/hooks';

function Example({ count }) {
  useUpdateEffect(() => {
    console.log('Count updated!', count);
  }, [count]);
  
  return <div>Check console on update</div>;
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useUpdateEffect</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Like useEffect, but ignores the first render.</p>
      </div>
      <CodeBlock code={codeString} />
    </div>
  );
}
