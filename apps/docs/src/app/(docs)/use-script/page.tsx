'use client';

import CodeBlock from '@/components/docs/code-block';

export default function Page() {
  const codeString = `
import { useScript } from '@danixsoft/hooks';

function Example() {
  const status = useScript('https://code.jquery.com/jquery-3.6.0.min.js');

  return (
    <div>
      <p>Script status: {status}</p>
      {status === 'ready' && <p>jQuery is ready!</p>}
    </div>
  );
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
