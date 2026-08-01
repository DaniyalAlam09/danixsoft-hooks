'use client';
import { useRef, useState } from 'react';
import { useClickOutside } from '@danixsoft/hooks';
import CodeBlock from '@/components/CodeBlock';

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
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useClickOutside</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Detect clicks outside a specified element (modals, dropdowns).</p>
      </div>
      <div className="bg-neutral-100 dark:bg-[#1e1e1e]  rounded p-32 flex flex-col items-center relative shadow-inner mb-8">
        <button onClick={() => setIsOpen(true)} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)] transition-all active:scale-95">
          Open Dropdown
        </button>
        
        {isOpen && (
          <div ref={ref} className="absolute mt-16 bg-white dark:bg-neutral-800  rounded p-8 shadow-md dark:shadow-none dark:border dark:border-white/10 z-20 animate-in fade-in slide-in-from-top-4">
            <h4 className="text-neutral-900 dark:text-white font-bold mb-2 text-xl">Dropdown Content</h4>
            <p className="text-neutral-600 dark:text-neutral-400">Click anywhere outside this white box to close it automatically.</p>
          </div>
        )}
      </div>
      <CodeBlock code={codeString} />
    </div>
  );
}
