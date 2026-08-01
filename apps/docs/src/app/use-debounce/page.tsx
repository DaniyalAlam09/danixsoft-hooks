'use client';
import { useState } from 'react';
import { useDebounce } from '@danixsoft/hooks';
import CodeBlock from '@/components/CodeBlock';

export default function UseDebouncePage() {
  const [val, setVal] = useState('');
  const debouncedVal = useDebounce(val, 500);

  const codeString = `
import { useState, useEffect } from 'react';
import { useDebounce } from '@danixsoft/hooks';

function SearchComponent() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      // Call your API here
      console.log('Searching for:', debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <input 
      value={search} 
      onChange={(e) => setSearch(e.target.value)} 
      placeholder="Search..."
    />
  );
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useDebounce</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Debounce a fast-changing value. Great for API searches.</p>
      </div>
      
      <div id="demo" className="bg-white dark:bg-[#1e1e1e]  rounded overflow-hidden shadow-md dark:shadow-none dark:border dark:border-white/10 p-8 mb-8">
        <input 
          type="text" 
          value={val} 
          onChange={e => setVal(e.target.value)} 
          placeholder="Type something fast..."
          className="w-full bg-neutral-50 dark:bg-[#121212]  rounded px-4 py-3 text-neutral-900 dark:text-white mb-6 focus:outline-none focus: focus:ring-1 focus:ring-blue-500 transition-all shadow-sm dark:shadow-none dark:border dark:border-white/10"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded p-4  dark:border-transparent">
            <div className="text-xs text-neutral-500 uppercase font-bold mb-2">Real-time Value</div>
            <div className="text-neutral-900 dark:text-white text-lg min-h-[1.75rem]">{val}</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/30 border  rounded p-4 transition-colors">
            <div className="text-xs text-blue-600 dark:text-blue-400 uppercase font-bold mb-2">Debounced (500ms)</div>
            <div className="text-blue-900 dark:text-white text-lg min-h-[1.75rem] font-medium">{debouncedVal}</div>
          </div>
        </div>
      </div>
      
      <CodeBlock code={codeString} />
    </div>
  );
}
