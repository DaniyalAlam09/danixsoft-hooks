'use client';

import CodeBlock from '@/components/docs/code-block';

export default function Page() {
  const codeString = `
import { useCookie } from '@danixsoft/hooks';

function Example() {
  const [value, updateCookie, deleteCookie] = useCookie('my-cookie');
  
  return (
    <div>
      <p>Cookie Value: {value}</p>
    </div>
  );
}
  `;

  return (
    <div>
      
      <div className="bg-surface rounded overflow-hidden shadow-[var(--shadow-md)] border border-border mb-8">
        <div className="p-4 border-b bg-bg-subtle flex items-center justify-between">
          <span className="text-sm font-medium text-fg-muted">Live Demo Placeholder</span>
        </div>
        <div className="p-8 flex flex-col items-center justify-center min-h-[300px] bg-bg-subtle">
          <p className="text-fg-muted">Interactive demo coming soon.</p>
        </div>
      </div>
      <div id="usage" className="scroll-mt-24">
        <CodeBlock code={codeString} />
      </div>
    </div>
  );
}
