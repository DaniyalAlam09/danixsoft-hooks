'use client';

import CodeBlock from '@/components/docs/code-block';

export default function Page() {
  const codeString = `
import { useCopyToClipboard } from '@danixsoft/hooks';

function Example() {
  const [copiedText, copy] = useCopyToClipboard();
  
  return (
    <div>
      <button onClick={() => copy('Hello')}>Copy Hello</button>
      <p>Copied: {copiedText}</p>
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
