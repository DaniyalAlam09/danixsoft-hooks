'use client';

import { useBoolean } from '@danixsoft/hooks';
import CodeBlock from '@/components/CodeBlock';

export default function UseBooleanPage() {
  const { value, toggle, setTrue, setFalse } = useBoolean(false);

  const codeString = `
import { useBoolean } from '@danixsoft/hooks';

function Checkbox() {
  const { value, toggle, setTrue, setFalse } = useBoolean(false);

  return (
    <div>
      <p>State: {value.toString()}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={setTrue}>Set True</button>
      <button onClick={setFalse}>Set False</button>
    </div>
  );
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useBoolean</h2>
        <p className="text-neutral-500 dark:text-neutral-400">A robust hook for managing boolean states, providing absolute setters instead of just a toggle.</p>
      </div>
      
      <div id="demo" className="bg-white dark:bg-[#1e1e1e] rounded overflow-hidden shadow-md dark:shadow-none dark:border dark:border-white/10 mb-8">
        <div className="p-4 border-b bg-neutral-50 dark:bg-[#1e1e1e]/50 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Live Demo</span>
        </div>
        <div className="p-8 flex flex-col items-center justify-center min-h-[300px] bg-neutral-50 dark:bg-[#121212]">
          
          <div className="mb-8 flex items-center justify-center">
            <div 
              onClick={toggle}
              className={`relative w-24 h-12 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out shadow-inner ${value ? 'bg-green-500' : 'bg-neutral-300 dark:bg-neutral-700'}`}
            >
              <div 
                className={`w-10 h-10 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${value ? 'translate-x-12' : 'translate-x-0'}`} 
              />
            </div>
          </div>
          
          <div className="flex space-x-3 mt-4">
            <button onClick={setTrue} className="px-5 py-2.5 rounded font-medium text-sm bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors">On</button>
            <button onClick={setFalse} className="px-5 py-2.5 rounded font-medium text-sm bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors">Off</button>
            <button onClick={toggle} className="px-5 py-2.5 rounded font-medium text-sm bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors">Toggle</button>
          </div>
        </div>
      </div>
      <CodeBlock code={codeString} />
    </div>
  );
}
