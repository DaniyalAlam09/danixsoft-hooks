'use client';

import { useToggle } from '@danixsoft/hooks';

export default function UseTogglePage() {
  const [value, toggle, setTrue, setFalse] = useToggle(false);

  return (
    <div>
      
      <div className="bg-surface rounded overflow-hidden shadow-[var(--shadow-md)] border border-border mb-8">
        <div className="p-4 border-b bg-bg-subtle flex items-center justify-between">
          <span className="text-sm font-medium text-fg-muted">Live Demo</span>
        </div>
        <div className="p-8 flex flex-col items-center justify-center min-h-[300px] bg-gradient-to-b from-bg-subtle to-bg-muted dark:from-bg-subtle dark:to-bg">
          <div className={`w-32 h-32 rounded mb-8 flex items-center justify-center transition-all duration-500 shadow-[var(--shadow-md)] border border-border ${value ? 'bg-blue-500 shadow-blue-500/20 rotate-12 scale-110' : 'bg-surface-raised shadow-[var(--shadow-md)]  dark:border-transparent -rotate-6'}`}>
            <span className="text-4xl">{value ? '🌞' : '🌙'}</span>
          </div>
          
          <div className="flex space-x-3 bg-white/50 dark:bg-surface/50 p-2 rounded backdrop-blur-sm shadow-[var(--shadow-sm)] border border-border">
            <button onClick={toggle} className="px-6 py-2.5 rounded font-medium text-sm bg-surface dark:bg-bg text-white shadow-[var(--shadow-sm)] border border-border hover:bg-bg-muted transition-colors uppercase tracking-wider">Toggle</button>
            <button onClick={setTrue} className="px-6 py-2.5 rounded font-medium text-sm bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 hover:bg-blue-100 transition-colors uppercase tracking-wider">Set True</button>
            <button onClick={setFalse} className="px-6 py-2.5 rounded font-medium text-sm bg-bg-muted text-fg-muted dark:bg-surface-raised dark:text-fg-muted hover:bg-bg-muted transition-colors uppercase tracking-wider">Set False</button>
          </div>
        </div>
      </div>
    </div>
  );
}
