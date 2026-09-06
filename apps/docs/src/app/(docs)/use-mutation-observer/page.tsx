'use client';

import CodeBlock from '@/components/docs/code-block';

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
    <div>
      <div id="usage" className="scroll-mt-24">
        <CodeBlock code={codeString} />
      </div>
    </div>
  );
}
