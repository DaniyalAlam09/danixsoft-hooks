'use client';

import CodeBlock from '@/components/docs/code-block';

export default function Page() {
  const codeString = `
import { useAudio } from '@danixsoft/hooks';

function Example() {
  const { playing, toggle } = useAudio('/sound.mp3');
  
  return <button onClick={toggle}>{playing ? 'Pause' : 'Play'}</button>;
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
