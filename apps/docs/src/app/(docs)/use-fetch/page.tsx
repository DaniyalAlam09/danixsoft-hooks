'use client';
import { useFetch } from '@danixsoft/hooks';

export default function UseFetchPage() {
  const { data, error, isLoading } = useFetch<{ title: string }>('https://jsonplaceholder.typicode.com/todos/1');

  return (
    <div>
      <div className="bg-surface rounded p-8 shadow-[var(--shadow-md)] border border-border mb-8 font-mono text-sm text-fg">
        {isLoading && <div className="flex space-x-2 animate-pulse"><div className="w-2 h-2 bg-blue-500 rounded-full"></div><div className="w-2 h-2 bg-blue-500 rounded-full"></div></div>}
        {error && <p className="text-red-500 dark:text-red-400">Error: {error.message}</p>}
        {data && (
          <pre className="bg-bg-subtle p-4 rounded overflow-x-auto shadow-inner">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
