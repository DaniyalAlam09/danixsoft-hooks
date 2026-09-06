'use client';

import CodeBlock from '@/components/docs/code-block';

export default function Page() {
  const codeString = `
import { useUpdateEffect } from '@danixsoft/hooks';

function Example({ count }) {
  useUpdateEffect(() => {
    console.log('Count updated!', count);
  }, [count]);
  
  return <div>Check console on update</div>;
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
