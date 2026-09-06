'use client';

import CodeBlock from '@/components/docs/code-block';

export default function Page() {
  const codeString = `
import { useInterval } from '@danixsoft/hooks';

function Example() {
  useInterval(() => {
    console.log('Tick!');
  }, 1000);
  
  return <div>Check console</div>;
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
