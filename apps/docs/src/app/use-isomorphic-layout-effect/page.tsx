'use client';

import CodeBlock from '@/components/CodeBlock';

export default function Page() {
  const codeString = `
import { useIsomorphicLayoutEffect } from '@danixsoft/hooks';

function Example() {
  // Acts as useLayoutEffect on client, and useEffect on server
  useIsomorphicLayoutEffect(() => {
    console.log('Layout effect executed');
  }, []);
  
  return <div>Check console</div>;
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useIsomorphicLayoutEffect</h2>
        <p className="text-neutral-500 dark:text-neutral-400">`useLayoutEffect` that does not throw warnings in SSR.</p>
      </div>
      <CodeBlock code={codeString} />
    </div>
  );
}
