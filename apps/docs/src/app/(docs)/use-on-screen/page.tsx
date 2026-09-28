'use client';
import { useRef } from 'react';
import { useOnScreen } from '@danixsoft/hooks';

export default function UseOnScreenPage() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  return (
    <div className="min-h-[200vh]">
      
      <div className="sticky top-12 bg-white/80 dark:bg-bg/80 p-6 rounded backdrop-blur-md shadow dark:shadow-none border border-border z-10 mb-8 transition-colors">
        <p className="text-fg-muted mb-2 font-medium">Scroll down to see the target element.</p>
        <p className="text-xl text-fg">
          Is target visible in viewport? 
          <span className={`ml-3 px-3 py-1 rounded font-bold text-sm uppercase tracking-wider ${isVisible ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}>
            {isVisible ? 'Yes' : 'No'}
          </span>
        </p>
      </div>
      
      <div className="mt-[80vh] mb-[50vh] flex justify-center">
        <div ref={ref} className={`p-24 rounded border-4 transition-all duration-1000 flex items-center justify-center w-full max-w-lg ${isVisible ? 'bg-blue-50 dark:bg-blue-900/40  scale-100 shadow-[var(--shadow-md)] border border-border shadow-blue-500/20' : 'bg-surface  scale-95 shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)]'}`}>
          <h3 className={`text-3xl font-bold transition-colors duration-1000 ${isVisible ? 'text-blue-600 dark:text-blue-300' : 'text-fg-subtle'}`}>Target Element</h3>
        </div>
      </div>
    </div>
  );
}
