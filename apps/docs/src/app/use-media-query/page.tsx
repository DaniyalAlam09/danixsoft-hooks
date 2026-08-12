'use client';
import { useMediaQuery } from '@danixsoft/hooks';
import SandboxEmbed from '@/components/SandboxEmbed';

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
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useMediaQuery</h2>
        <p className="text-neutral-500 dark:text-neutral-400">React to CSS media queries in Javascript.</p>
      </div>
      <div className={`p-12 rounded transition-all duration-700 border shadow-md dark:shadow-none dark:border dark:border-white/10 mb-8 flex flex-col items-center justify-center min-h-[300px] ${isDesktop ? 'bg-blue-50 dark:bg-blue-900/20  dark:' : 'bg-white dark:bg-[#1e1e1e]  dark:'}`}>
        <div className={`text-6xl mb-6 transition-transform duration-700 ${isDesktop ? 'scale-110' : 'scale-90'}`}>
          {isDesktop ? '🖥️' : '📱'}
        </div>
        <h3 className="text-3xl text-neutral-900 dark:text-white font-bold mb-4">
          {isDesktop ? 'Desktop View' : 'Mobile/Tablet View'}
        </h3>
        <p className="text-neutral-500 dark:text-neutral-400 font-medium">Resize your browser window to cross the 1024px breakpoint.</p>
      </div>
      <SandboxEmbed code={codeString} />
    </div>
  );
}
