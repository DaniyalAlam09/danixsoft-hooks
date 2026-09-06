'use client';

import { Sandpack } from '@codesandbox/sandpack-react';

interface SandboxEmbedProps {
  code: string;
  dependencies?: Record<string, string>;
}

/** Live, editable example. Follows the site theme so it never clashes. */
export default function SandboxEmbed({
  code,
  dependencies = {},
}: SandboxEmbedProps) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-border">
      <Sandpack
        template="react-ts"
        theme="dark"  /* matches the always-dark code blocks */
        options={{
          showLineNumbers: true,
          showNavigator: false,
          editorHeight: 440,
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
    </div>
  );
}
