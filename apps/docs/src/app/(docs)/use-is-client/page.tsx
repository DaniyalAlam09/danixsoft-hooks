'use client';

import CodeBlock from '@/components/docs/code-block';

export default function Page() {
  const codeString = `
import { useIsClient } from '@danixsoft/hooks';

function Example() {
  const isClient = useIsClient();
  
  return <div>Client: {isClient ? 'Yes' : 'No'}</div>;
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
