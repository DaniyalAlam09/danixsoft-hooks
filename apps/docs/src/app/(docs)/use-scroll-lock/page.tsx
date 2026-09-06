'use client';

import CodeBlock from '@/components/docs/code-block';

export default function Page() {
  const codeString = `
import { useScrollLock } from '@danixsoft/hooks';

function Example() {
  useScrollLock(true);
  
  return <p>The body is locked!</p>;
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
