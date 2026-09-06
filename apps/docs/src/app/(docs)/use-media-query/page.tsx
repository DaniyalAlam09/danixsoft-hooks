'use client';
import { useMediaQuery } from '@danixsoft/hooks';
import SandboxEmbed from '@/components/docs/sandbox-embed';

export default function UseMediaQueryPage() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const codeString = `
import { useMediaQuery } from '@danixsoft/hooks';

export default function App() {
  const isDesktop = useMediaQuery('(min-width: 800px)');

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: isDesktop ? '#eff6ff' : '#1e1e1e',
      color: isDesktop ? '#1e3a8a' : 'white',
      fontFamily: 'sans-serif',
      transition: 'all 0.5s ease'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
          {isDesktop ? '🖥️' : '📱'}
        </div>
        <h2 style={{ margin: 0 }}>
          {isDesktop ? 'Desktop View' : 'Mobile/Tablet View'}
        </h2>
        <p>Resize the sandbox preview pane to see it change!</p>
      </div>
    </div>
  );
}
  `;

  return (
    <div>
      <div className={`p-12 rounded transition-all duration-700 border shadow-[var(--shadow-md)] border border-border mb-8 flex flex-col items-center justify-center min-h-[300px] ${isDesktop ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-surface'}`}>
        <div className={`text-6xl mb-6 transition-transform duration-700 ${isDesktop ? 'scale-110' : 'scale-90'}`}>
          {isDesktop ? '🖥️' : '📱'}
        </div>
        <h3 className="text-3xl text-fg font-bold mb-4">
          {isDesktop ? 'Desktop View' : 'Mobile/Tablet View'}
        </h3>
        <p className="text-fg-muted font-medium">Resize your browser window to cross the 1024px breakpoint.</p>
      </div>
      <div id="usage" className="scroll-mt-24">
        <SandboxEmbed code={codeString} />
      </div>
    </div>
  );
}
