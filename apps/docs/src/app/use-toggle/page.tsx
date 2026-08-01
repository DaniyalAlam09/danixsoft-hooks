'use client';

import { useToggle } from '@danixsoft/hooks';
import CodeBlock from '@/components/CodeBlock';

export default function UseTogglePage() {
  const [value, toggle, setTrue, setFalse] = useToggle(false);

  const codeString = `
import { useToggle } from '@danixsoft/hooks';

function Modal() {
  const [isOpen, toggleModal, openModal, closeModal] = useToggle(false);

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      {isOpen && (
        <div className="modal">
          <h2>Hello World</h2>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </>
  );
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useToggle</h2>
        <p className="text-neutral-500 dark:text-neutral-400">A simple hook for managing boolean states, perfect for modals, dropdowns, and switches.</p>
      </div>
      
      <div id="demo" className="bg-white dark:bg-[#1e1e1e]  rounded overflow-hidden shadow-md dark:shadow-none dark:border dark:border-white/10 mb-8">
        <div className="p-4 border-b  bg-neutral-50 dark:bg-[#1e1e1e]/50 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Live Demo</span>
        </div>
        <div className="p-8 flex flex-col items-center justify-center min-h-[300px] bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
          <div className={`w-32 h-32 rounded mb-8 flex items-center justify-center transition-all duration-500 shadow-md dark:shadow-none dark:border dark:border-white/10 ${value ? 'bg-blue-500 shadow-blue-500/20 rotate-12 scale-110' : 'bg-white dark:bg-neutral-800 shadow-neutral-200 dark:shadow-neutral-950  dark:border-transparent -rotate-6'}`}>
            <span className="text-4xl">{value ? '🌞' : '🌙'}</span>
          </div>
          
          <div className="flex space-x-3 bg-white/50 dark:bg-[#1e1e1e]/50 p-2 rounded  backdrop-blur-sm shadow-sm dark:shadow-none dark:border dark:border-white/10">
            <button onClick={toggle} className="px-6 py-2.5 rounded font-medium text-sm bg-[#1e1e1e] dark:bg-[#121212]  text-white shadow-sm dark:shadow-none dark:border dark:border-white/10 hover:bg-neutral-800 transition-colors uppercase tracking-wider">Toggle</button>
            <button onClick={setTrue} className="px-6 py-2.5 rounded font-medium text-sm bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 hover:bg-blue-100 transition-colors uppercase tracking-wider">Set True</button>
            <button onClick={setFalse} className="px-6 py-2.5 rounded font-medium text-sm bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 transition-colors uppercase tracking-wider">Set False</button>
          </div>
        </div>
      </div>
      <CodeBlock code={codeString} />
    </div>
  );
}
