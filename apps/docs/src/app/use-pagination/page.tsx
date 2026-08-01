'use client';
import { usePagination } from '@danixsoft/hooks';
import CodeBlock from '@/components/CodeBlock';

const mockData = Array.from({ length: 45 }, (_, i) => `Item ${i + 1}`);

export default function UsePaginationPage() {
  const { currentData, currentPage, totalPages, next, prev } = usePagination(mockData, 5);

  const codeString = `
import { usePagination } from '@danixsoft/hooks';

const data = ['A', 'B', 'C', 'D', 'E']; // Lots of data

function PaginatedList() {
  const { currentData, currentPage, totalPages, next, prev } = usePagination(data, 10);

  return (
    <div>
      {currentData.map(item => <div key={item}>{item}</div>)}
      
      <button onClick={prev} disabled={currentPage === 1}>Prev</button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={next} disabled={currentPage === totalPages}>Next</button>
    </div>
  );
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">usePagination</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Client-side array pagination.</p>
      </div>
      <div id="demo" className="bg-white dark:bg-[#1e1e1e]  rounded p-8 shadow-md dark:shadow-none dark:border dark:border-white/10 mb-8">
        <div className="space-y-2 mb-6">
          {currentData.map(item => (
            <div key={item} className="p-3 bg-neutral-50 dark:bg-[#121212]  rounded text-neutral-800 dark:text-neutral-300 transition-colors">
              {item}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <button onClick={prev} disabled={currentPage === 1} className="px-5 py-2 bg-neutral-100 dark:bg-neutral-800  dark:border-transparent disabled:opacity-50 text-neutral-700 dark:text-white font-medium rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors shadow-sm dark:shadow-none dark:border dark:border-white/10 uppercase tracking-wider">Previous</button>
          <span className="text-neutral-600 dark:text-neutral-400 font-medium">Page {currentPage} of {totalPages}</span>
          <button onClick={next} disabled={currentPage === totalPages} className="px-5 py-2 bg-neutral-100 dark:bg-neutral-800  dark:border-transparent disabled:opacity-50 text-neutral-700 dark:text-white font-medium rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors shadow-sm dark:shadow-none dark:border dark:border-white/10 uppercase tracking-wider">Next</button>
        </div>
      </div>
      <CodeBlock code={codeString} />
    </div>
  );
}
