'use client';

import { useState } from 'react';
import { CheckIcon, CopyIcon } from '@/components/ui/icons';

/** The only interactive part of a code block — kept tiny so it is all that hydrates. */
export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the code is still selectable */
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
      className="flex items-center gap-1.5 rounded-md border border-code-border bg-code-bg/80 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-code-fg/70 backdrop-blur transition-colors hover:text-code-fg"
    >
      {copied ? (
        <CheckIcon className="h-3.5 w-3.5 text-[#28c840]" />
      ) : (
        <CopyIcon className="h-3.5 w-3.5" />
      )}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}
