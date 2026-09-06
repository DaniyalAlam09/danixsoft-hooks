'use client';

import CodeBlock from '@/components/docs/code-block';

export default function Page() {
  const codeString = `
import { useIsMounted } from '@danixsoft/hooks';

function Example() {
  const isMounted = useIsMounted();
  
  return <div>Mounted: {isMounted() ? 'Yes' : 'No'}</div>;
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
