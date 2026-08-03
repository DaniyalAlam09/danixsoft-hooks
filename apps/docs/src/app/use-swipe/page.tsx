'use client';

import CodeBlock from '@/components/CodeBlock';

export default function Page() {
  const codeString = `
import { useSwipe } from '@danixsoft/hooks';

function Example() {
  const { direction, swiping } = useSwipe();
  
  return <p>{swiping ? \`Swiping \${direction}\` : 'Not swiping'}</p>;
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useSwipe</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Detect directional swipe gestures.</p>
      </div>
      <CodeBlock code={codeString} />
    </div>
  );
}
