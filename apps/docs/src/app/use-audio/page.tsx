'use client';

import CodeBlock from '@/components/CodeBlock';

export default function Page() {
  const codeString = `
import { useAudio } from '@danixsoft/hooks';

function Example() {
  const { playing, toggle } = useAudio('/sound.mp3');
  
  return <button onClick={toggle}>{playing ? 'Pause' : 'Play'}</button>;
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useAudio</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Easily play and control audio files.</p>
      </div>
      <CodeBlock code={codeString} />
    </div>
  );
}
