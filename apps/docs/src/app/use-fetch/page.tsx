'use client';
import { useFetch } from '@danixsoft/hooks';
import CodeBlock from '@/components/CodeBlock';

export default function UseFetchPage() {
  const { data, error, isLoading } = useFetch<{ title: string }>('https://jsonplaceholder.typicode.com/todos/1');

  const codeString = `
import { useFetch } from '@danixsoft/hooks';

function TodoItem() {
  const { data, error, isLoading } = useFetch('https://jsonplaceholder.typicode.com/todos/1');

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div>{JSON.stringify(data)}</div>;
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useFetch</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Simple data fetching wrapper.</p>
      </div>
      <div id="demo" className="bg-white dark:bg-[#1e1e1e]  rounded p-8 shadow-md dark:shadow-none dark:border dark:border-white/10 mb-8 font-mono text-sm text-neutral-800 dark:text-neutral-300">
        {isLoading && <div className="flex space-x-2 animate-pulse"><div className="w-2 h-2 bg-blue-500 rounded-full"></div><div className="w-2 h-2 bg-blue-500 rounded-full"></div></div>}
        {error && <p className="text-red-500 dark:text-red-400">Error: {error.message}</p>}
        {data && (
          <pre className="bg-neutral-50 dark:bg-[#121212] p-4 rounded overflow-x-auto  shadow-inner">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
      <CodeBlock code={codeString} />
    </div>
  );
}
