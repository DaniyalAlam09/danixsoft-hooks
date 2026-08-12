'use client';

import { Sandpack } from '@codesandbox/sandpack-react';

interface SandboxEmbedProps {
  code: string;
  dependencies?: Record<string, string>;
}

export default function SandboxEmbed({ code, dependencies = {} }: SandboxEmbedProps) {
  return (
    <div className="mt-8 mb-8 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
      <Sandpack
        template="react-ts"
        theme="dark"
        options={{
          showLineNumbers: true,
          showNavigator: false,
          editorHeight: 450,
          wrapContent: true,
        }}
        customSetup={{
          dependencies: {
            '@danixsoft/hooks': 'latest',
            ...dependencies,
          },
        }}
        files={{
          '/App.tsx': code,
        }}
      />
    </div>
  );
}
