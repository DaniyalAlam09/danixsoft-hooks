'use client';
import { useMediaQuery } from '@danixsoft/hooks';

export default function UseMediaQueryPage() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <div>
      <div className={`p-12 rounded transition-all duration-700 border shadow-[var(--shadow-md)] border border-border mb-8 flex flex-col items-center justify-center min-h-[300px] ${isDesktop ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-surface'}`}>
        <div className={`text-6xl mb-6 transition-transform duration-700 ${isDesktop ? 'scale-110' : 'scale-90'}`}>
          {isDesktop ? '🖥️' : '📱'}
        </div>
        <h3 className="text-3xl text-fg font-bold mb-4">
          {isDesktop ? 'Desktop View' : 'Mobile/Tablet View'}
        </h3>
        <p className="text-fg-muted font-medium">Resize your browser window to cross the 1024px breakpoint.</p>
      </div>
    </div>
  );
}
