'use client';

import CodeBlock from '@/components/docs/code-block';

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
    <div>
      <div id="usage" className="scroll-mt-24">
        <CodeBlock code={codeString} />
      </div>
    </div>
  );
}
