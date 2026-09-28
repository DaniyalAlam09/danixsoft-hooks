'use client';
import { useWindowSize } from '@danixsoft/hooks';

export default function UseWindowSizePage() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <div className="bg-surface rounded p-8 shadow-[var(--shadow-md)] border border-border mb-8 flex space-x-12">
        <div className="flex-1 bg-bg-subtle p-6 rounded text-center">
          <div className="text-xs text-fg-subtle uppercase font-bold mb-2 tracking-widest">Width</div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{width}px</div>
        </div>
        <div className="flex-1 bg-bg-subtle p-6 rounded text-center">
          <div className="text-xs text-fg-subtle uppercase font-bold mb-2 tracking-widest">Height</div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{height}px</div>
        </div>
      </div>
    </div>
  );
}
