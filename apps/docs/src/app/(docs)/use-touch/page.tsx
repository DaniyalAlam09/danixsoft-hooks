'use client';

import CodeBlock from '@/components/docs/code-block';

export default function Page() {
  const codeString = `
import { useTouch } from '@danixsoft/hooks';

function Example() {
  const state = useTouch();
  
  return <p>Touches: {state.touches?.length || 0}</p>;
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
