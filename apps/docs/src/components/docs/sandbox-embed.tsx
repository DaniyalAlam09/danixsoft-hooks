'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

interface SandboxEmbedProps {
  code: string;
  dependencies?: Record<string, string>;
}

const EDITOR_HEIGHT = 440;

/*
 * Sandpack ships a code editor and boots a remote bundler in an iframe — by far
 * the heaviest thing on the site. It is only loaded once the reader asks for it,
 * so the page (and its server-rendered example) stays fast for everyone else.
 */
const Sandpack = dynamic(
  () => import('@codesandbox/sandpack-react').then((mod) => mod.Sandpack),
  {
    ssr: false,
    loading: () => <Placeholder label="Loading sandbox…" />,
  },
);

function Placeholder({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <div
      className="flex items-center justify-center bg-code-bg"
      style={{ height: EDITOR_HEIGHT }}
    >
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-fg transition-opacity hover:opacity-90"
        >
          {label}
        </button>
      ) : (
        <span className="text-sm text-code-fg/60">{label}</span>
      )}
    </div>
  );
}

/** Live, editable example, loaded on demand. Follows the site theme so it never clashes. */
export default function SandboxEmbed({
  code,
  dependencies = {},
}: SandboxEmbedProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-border">
      {open ? (
        <Sandpack
          template="react-ts"
          theme="dark" /* matches the always-dark code blocks */
          options={{
            showLineNumbers: true,
            showNavigator: false,
            editorHeight: EDITOR_HEIGHT,
            wrapContent: true,
          }}
          customSetup={{
            dependencies: {
              '@danixsoft/hooks': 'latest',
              ...dependencies,
            },
          }}
          files={{ '/App.tsx': code }}
        />
      ) : (
        <Placeholder
          label="Open the live, editable sandbox"
          onClick={() => setOpen(true)}
        />
      )}
    </div>
  );
}
