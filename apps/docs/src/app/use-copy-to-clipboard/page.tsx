'use client';

import CodeBlock from '@/components/CodeBlock';

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
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useCopyToClipboard</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Copy text to the clipboard safely.</p>
      </div>
      <CodeBlock code={codeString} />
    </div>
  );
}
