'use client';

import CodeBlock from '@/components/docs/code-block';

export default function Page() {
  const codeString = `
import { useIsomorphicLayoutEffect } from '@danixsoft/hooks';

function Example() {
  // Acts as useLayoutEffect on client, and useEffect on server
  useIsomorphicLayoutEffect(() => {
    console.log('Layout effect executed');
  }, []);
  
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
