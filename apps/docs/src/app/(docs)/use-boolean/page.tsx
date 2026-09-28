'use client';

import { useBoolean } from '@danixsoft/hooks';

export default function UseBooleanPage() {
  const { value, toggle, setTrue, setFalse } = useBoolean(false);

  return (
    <div>
      
      <div className="bg-surface rounded overflow-hidden shadow-[var(--shadow-md)] border border-border mb-8">
        <div className="p-4 border-b bg-bg-subtle flex items-center justify-between">
          <span className="text-sm font-medium text-fg-muted">Live Demo</span>
        </div>
        <div className="p-8 flex flex-col items-center justify-center min-h-[300px] bg-bg-subtle">
          
          <div className="mb-8 flex items-center justify-center">
            <div 
              onClick={toggle}
              className={`relative w-24 h-12 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out shadow-inner ${value ? 'bg-green-500' : 'bg-border-strong dark:bg-bg-muted'}`}
            >
              <div 
                className={`w-10 h-10 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${value ? 'translate-x-12' : 'translate-x-0'}`} 
              />
            </div>
          </div>
          
          <div className="flex space-x-3 mt-4">
            <button onClick={setTrue} className="px-5 py-2.5 rounded font-medium text-sm bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors">On</button>
            <button onClick={setFalse} className="px-5 py-2.5 rounded font-medium text-sm bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors">Off</button>
            <button onClick={toggle} className="px-5 py-2.5 rounded font-medium text-sm bg-bg-muted text-fg dark:bg-surface-raised dark:text-fg hover:bg-bg-muted hover:bg-bg-muted transition-colors">Toggle</button>
          </div>
        </div>
      </div>
    </div>
  );
}
