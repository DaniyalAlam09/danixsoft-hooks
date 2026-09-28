'use client';
import { usePagination } from '@danixsoft/hooks';

const mockData = Array.from({ length: 45 }, (_, i) => `Item ${i + 1}`);

export default function UsePaginationPage() {
  const { currentData, currentPage, totalPages, next, prev } = usePagination(mockData, 5);

  return (
    <div>
      <div className="bg-surface rounded p-8 shadow-[var(--shadow-md)] border border-border mb-8">
        <div className="space-y-2 mb-6">
          {currentData.map(item => (
            <div key={item} className="p-3 bg-bg-subtle rounded text-fg transition-colors">
              {item}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <button onClick={prev} disabled={currentPage === 1} className="px-5 py-2 bg-bg-muted dark:border-transparent disabled:opacity-50 text-fg-muted dark:text-white font-medium rounded hover:bg-bg-muted hover:bg-bg-muted transition-colors shadow-[var(--shadow-sm)] border border-border uppercase tracking-wider">Previous</button>
          <span className="text-fg-muted font-medium">Page {currentPage} of {totalPages}</span>
          <button onClick={next} disabled={currentPage === totalPages} className="px-5 py-2 bg-bg-muted dark:border-transparent disabled:opacity-50 text-fg-muted dark:text-white font-medium rounded hover:bg-bg-muted hover:bg-bg-muted transition-colors shadow-[var(--shadow-sm)] border border-border uppercase tracking-wider">Next</button>
        </div>
      </div>
    </div>
  );
}
