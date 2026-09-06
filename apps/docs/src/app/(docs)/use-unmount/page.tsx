'use client';

import CodeBlock from '@/components/docs/code-block';

export default function Page() {
  const codeString = `
import { useUnmount } from '@danixsoft/hooks';

function Example() {
  useUnmount(() => console.log('Unmounted!'));
  
  return <div>Hello</div>;
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
