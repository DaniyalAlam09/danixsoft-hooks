'use client';

import SandboxEmbed from '@/components/SandboxEmbed';

export default function Page() {
  const codeString = `
import { useMouse } from '@danixsoft/hooks';

export default function App() {
  const { x, y } = useMouse();
  
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1e1e1e', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '2rem', backgroundColor: '#2d2d2d', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 1rem' }}>Mouse Tracker</h2>
        <p style={{ margin: '0.5rem 0', fontSize: '1.2rem' }}>X: {x}</p>
        <p style={{ margin: '0.5rem 0', fontSize: '1.2rem' }}>Y: {y}</p>
      </div>
    </div>
  );
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useMouse</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Track mouse coordinates.</p>
      </div>
      <SandboxEmbed code={codeString} />
    </div>
  );
}
