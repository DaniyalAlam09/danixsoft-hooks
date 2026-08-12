'use client';

import SandboxEmbed from '@/components/SandboxEmbed';

export default function Page() {
  const codeString = `
import { useSwipe } from '@danixsoft/hooks';

export default function App() {
  const { direction, swiping } = useSwipe();
  
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1e1e1e', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '4rem', border: '2px dashed #4b5563', borderRadius: '12px', textAlign: 'center', userSelect: 'none', width: '80%', maxWidth: '400px' }}>
        <h2>Swipe Here!</h2>
        <p style={{ fontSize: '1.5rem', marginTop: '1rem', color: swiping ? '#60a5fa' : '#9ca3af' }}>
          {swiping ? \`Swiping \${direction}...\` : (direction ? \`Last swipe: \${direction}\` : 'No swipe yet')}
        </p>
      </div>
    </div>
  );
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useSwipe</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Detect directional swipe gestures.</p>
      </div>
      <SandboxEmbed code={codeString} />
    </div>
  );
}
