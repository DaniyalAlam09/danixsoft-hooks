'use client';

import CodeBlock from '@/components/CodeBlock';

export default function Page() {
  const codeString = `
import { useGeolocation } from '@danixsoft/hooks';

function Example() {
  const state = useGeolocation();
  
  if (state.loading) return <p>Loading...</p>;
  if (state.error) return <p>Error: {state.error.message}</p>;
  
  return <p>{state.latitude}, {state.longitude}</p>;
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useGeolocation</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Track device location via Geolocation API.</p>
      </div>
      <CodeBlock code={codeString} />
    </div>
  );
}
