'use client';

import CodeBlock from '@/components/docs/code-block';

export default function Page() {
  const codeString = `
import { useHover } from '@danixsoft/hooks';
import { useRef } from 'react';

function Example() {
  const ref = useRef(null);
  const isHovered = useHover(ref);
  
  return <div ref={ref}>{isHovered ? 'Hovered' : 'Not hovered'}</div>;
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
