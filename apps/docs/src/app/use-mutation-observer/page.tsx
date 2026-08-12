'use client';

import CodeBlock from '@/components/CodeBlock';

export default function Page() {
  const codeString = `
import { useMutationObserver } from '@danixsoft/hooks';
import { useRef, useState } from 'react';

function Example() {
  const ref = useRef<HTMLDivElement>(null);
  const [mutations, setMutations] = useState(0);

  useMutationObserver(
    ref,
    (mutationList) => {
      setMutations((m) => m + mutationList.length);
    },
    { childList: true, subtree: true }
  );

  return (
    <div>
      <div ref={ref}>
        <button onClick={() => ref.current?.append(document.createElement('div'))}>
          Mutate DOM
        </button>
      </div>
      <p>Mutations count: {mutations}</p>
    </div>
  );
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useMutationObserver</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Observe changes to the DOM tree.</p>
      </div>
      <CodeBlock code={codeString} />
    </div>
  );
}
