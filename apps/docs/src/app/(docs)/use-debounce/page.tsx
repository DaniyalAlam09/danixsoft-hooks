'use client';
import { useState } from 'react';
import { useDebounce } from '@danixsoft/hooks';

export default function UseDebouncePage() {
  const [val, setVal] = useState('');
  const debouncedVal = useDebounce(val, 500);

  return (
    <div>
      
      <div className="bg-surface rounded overflow-hidden shadow-[var(--shadow-md)] border border-border p-8 mb-8">
        <input 
          type="text" 
          value={val} 
          onChange={e => setVal(e.target.value)} 
          placeholder="Type something fast..."
          className="w-full bg-bg-subtle rounded px-4 py-3 text-fg mb-6 focus:outline-none focus: focus:ring-1 focus:ring-blue-500 transition-all shadow-[var(--shadow-sm)] border border-border"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-bg-subtle rounded p-4 dark:border-transparent">
            <div className="text-xs text-fg-muted uppercase font-bold mb-2">Real-time Value</div>
            <div className="text-fg text-lg min-h-[1.75rem]">{val}</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/30 border rounded p-4 transition-colors">
            <div className="text-xs text-blue-600 dark:text-blue-400 uppercase font-bold mb-2">Debounced (500ms)</div>
            <div className="text-blue-900 dark:text-white text-lg min-h-[1.75rem] font-medium">{debouncedVal}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
