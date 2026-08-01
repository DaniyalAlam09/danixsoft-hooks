'use client';
import { useWindowSize } from '@danixsoft/hooks';
import CodeBlock from '@/components/CodeBlock';

export default function UseWindowSizePage() {
  const { width, height } = useWindowSize();

  const codeString = `
import { useWindowSize } from '@danixsoft/hooks';

function Dimensions() {
  const { width, height } = useWindowSize();

  return (
    <div>
      Window is {width}px by {height}px
    </div>
  );
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useWindowSize</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Get the current window dimensions reactively.</p>
      </div>
      <div id="demo" className="bg-white dark:bg-[#1e1e1e]  rounded p-8 shadow-md dark:shadow-none dark:border dark:border-white/10 mb-8 flex space-x-12">
        <div className="flex-1 bg-neutral-50 dark:bg-[#121212]  p-6 rounded text-center">
          <div className="text-xs text-neutral-500 dark:text-neutral-500 uppercase font-bold mb-2 tracking-widest">Width</div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{width}px</div>
        </div>
        <div className="flex-1 bg-neutral-50 dark:bg-[#121212]  p-6 rounded text-center">
          <div className="text-xs text-neutral-500 dark:text-neutral-500 uppercase font-bold mb-2 tracking-widest">Height</div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{height}px</div>
        </div>
      </div>
      <CodeBlock code={codeString} />
    </div>
  );
}
