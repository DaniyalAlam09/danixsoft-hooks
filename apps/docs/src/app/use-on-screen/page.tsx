'use client';
import { useRef } from 'react';
import { useOnScreen } from '@danixsoft/hooks';
import CodeBlock from '@/components/CodeBlock';

export default function UseOnScreenPage() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  const codeString = `
import { useRef } from 'react';
import { useOnScreen } from '@danixsoft/hooks';

function LazyImage() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  return (
    <div ref={ref}>
      {isVisible ? <img src="huge-image.jpg" /> : <p>Loading image...</p>}
    </div>
  );
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl min-h-[200vh]">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useOnScreen</h2>
        <p className="text-neutral-500 dark:text-neutral-400">IntersectionObserver wrapper to check if an element is visible.</p>
      </div>
      
      <div className="sticky top-12 bg-white/80 dark:bg-[#121212]/80 p-6 rounded backdrop-blur-md  shadow dark:shadow-none dark:border dark:border-white/10 z-10 mb-8 transition-colors">
        <p className="text-neutral-600 dark:text-neutral-400 mb-2 font-medium">Scroll down to see the target element.</p>
        <p className="text-xl text-neutral-900 dark:text-white">
          Is target visible in viewport? 
          <span className={`ml-3 px-3 py-1 rounded font-bold text-sm uppercase tracking-wider ${isVisible ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}>
            {isVisible ? 'Yes' : 'No'}
          </span>
        </p>
      </div>

      <CodeBlock code={codeString} />
      
      <div className="mt-[80vh] mb-[50vh] flex justify-center">
        <div ref={ref} className={`p-24 rounded border-4 transition-all duration-1000 flex items-center justify-center w-full max-w-lg ${isVisible ? 'bg-blue-50 dark:bg-blue-900/40  scale-100 shadow-md dark:shadow-none dark:border dark:border-white/10 shadow-blue-500/20' : 'bg-white dark:bg-[#1e1e1e]  scale-95 shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)]'}`}>
          <h3 className={`text-3xl font-bold transition-colors duration-1000 ${isVisible ? 'text-blue-600 dark:text-blue-300' : 'text-neutral-400 dark:text-neutral-600'}`}>Target Element</h3>
        </div>
      </div>
    </div>
  );
}
