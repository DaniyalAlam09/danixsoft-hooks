'use client';

import SandboxEmbed from '@/components/SandboxEmbed';

export default function Page() {
  const codeString = `
import { useCountdown } from '@danixsoft/hooks';

export default function App() {
  const [count, { start, stop, reset }] = useCountdown({ countStart: 60, intervalMs: 1000 });
  
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#1e1e1e', color: 'white', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '4rem', margin: '0 0 2rem' }}>{count}</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={start} style={btnStyle}>Start</button>
        <button onClick={stop} style={btnStyle}>Stop</button>
        <button onClick={reset} style={btnStyle}>Reset</button>
      </div>
    </div>
  );
}

const btnStyle = { padding: '10px 20px', fontSize: '1rem', cursor: 'pointer', borderRadius: '6px', border: 'none', backgroundColor: '#3b82f6', color: 'white', fontWeight: 'bold' };
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useCountdown</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Manage countdown timers with easy controls.</p>
      </div>
      <SandboxEmbed code={codeString} />
    </div>
  );
}
