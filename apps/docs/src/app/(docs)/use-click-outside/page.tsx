'use client';
import { useRef, useState } from 'react';
import { useClickOutside } from '@danixsoft/hooks';
import CodeBlock from '@/components/docs/code-block';

export default function UseClickOutsidePage() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useClickOutside(ref, () => setIsOpen(false));

  const codeString = `
import { useRef, useState } from 'react';
import { useClickOutside } from '@danixsoft/hooks';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setIsOpen(true)}>Open</button>
      
      {isOpen && (
        <div ref={ref} style={{ position: 'absolute' }}>
          Dropdown Menu! Click outside to close.
        </div>
      )}
    </div>
  );
}
  `;

  return (
    <div>
      <div className="bg-bg-muted dark:bg-surface rounded p-32 flex flex-col items-center relative shadow-inner mb-8">
        <button onClick={() => setIsOpen(true)} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)] transition-all active:scale-95">
          Open Dropdown
        </button>
        
        {isOpen && (
          <div ref={ref} className="absolute mt-16 bg-surface-raised rounded p-8 shadow-[var(--shadow-md)] border border-border z-20 animate-in fade-in slide-in-from-top-4">
            <h4 className="text-fg font-bold mb-2 text-xl">Dropdown Content</h4>
            <p className="text-fg-muted">Click anywhere outside this white box to close it automatically.</p>
          </div>
        )}
      </div>
      <div id="usage" className="scroll-mt-24">
        <CodeBlock code={codeString} />
      </div>
    </div>
  );
}
