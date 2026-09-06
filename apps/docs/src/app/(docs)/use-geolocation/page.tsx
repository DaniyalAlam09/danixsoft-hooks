'use client';

import CodeBlock from '@/components/docs/code-block';

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
    <div>
      <div id="usage" className="scroll-mt-24">
        <CodeBlock code={codeString} />
      </div>
    </div>
  );
}
