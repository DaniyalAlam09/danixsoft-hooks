'use client';

import CodeBlock from '@/components/docs/code-block';

export default function Page() {
  const codeString = `
import { useOnlineState } from '@danixsoft/hooks';

function Example() {
  const isOnline = useOnlineState();
  
  return <div>You are {isOnline ? 'online' : 'offline'}</div>;
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
