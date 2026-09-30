'use client';

import { useState } from 'react';
import { CheckIcon, CopyIcon } from '@/components/ui/icons';
import { cn } from '@/lib/cn';

const managers = [
  { id: 'npm', command: 'npm install @danixsoft/hooks' },
  { id: 'pnpm', command: 'pnpm add @danixsoft/hooks' },
  { id: 'yarn', command: 'yarn add @danixsoft/hooks' },
  { id: 'bun', command: 'bun add @danixsoft/hooks' },
] as const;

export default function InstallTabs({ className }: { className?: string }) {
  const [active, setActive] = useState<(typeof managers)[number]['id']>('npm');
  const [copied, setCopied] = useState(false);

  const command =
    managers.find((manager) => manager.id === active)?.command ?? '';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the command is still selectable */
    }
  };

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-code-border bg-code-bg',
        className,
      )}
    >
      <div
        role="tablist"
        aria-label="Package manager"
        className="flex border-b border-code-border bg-code-chrome px-1.5"
      >
        {managers.map((manager) => (
          <button
            key={manager.id}
            role="tab"
            aria-selected={active === manager.id}
            onClick={() => setActive(manager.id)}
            className={cn(
              'relative px-3.5 py-2.5 font-mono text-[13px] transition-colors',
              active === manager.id
                ? 'text-code-fg'
                : 'text-code-fg/45 hover:text-code-fg/75',
            )}
          >
            {manager.id}
            {active === manager.id && (
              <span
                aria-hidden
                className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent"
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 px-4 py-3.5">
        <span aria-hidden className="select-none font-mono text-sm text-accent">
          $
        </span>
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm text-code-fg custom-scrollbar">
          {command}
        </code>
        <button
          type="button"
          onClick={copy}
          data-track="Install"
          aria-label={copied ? 'Command copied' : 'Copy install command'}
          className="shrink-0 rounded-md border border-code-border p-1.5 text-code-fg/60 transition-colors hover:text-code-fg"
        >
          {copied ? (
            <CheckIcon className="h-4 w-4 text-[#28c840]" />
          ) : (
            <CopyIcon className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
