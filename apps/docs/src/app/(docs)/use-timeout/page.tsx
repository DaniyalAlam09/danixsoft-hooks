'use client';

import CodeBlock from '@/components/docs/code-block';

export default function Page() {
  const codeString = `
import { useTimeout } from '@danixsoft/hooks';

function Example() {
  useTimeout(() => {
    console.log('Timeout!');
  }, 3000);
  
  return <div>Wait 3 seconds...</div>;
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
