'use client';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';

export default function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="usage" className="relative group rounded overflow-hidden shadow-md bg-[#1e1e1e] mt-8 transition-all">
      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={handleCopy}
          className="bg-[#121212]/80 hover:bg-[#121212] text-neutral-300 text-xs px-3 py-1.5 rounded-lg backdrop-blur-sm border border-neutral-700 transition-all uppercase tracking-wider"
        >
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
      <div className="bg-[#121212] px-4 py-2 border-b border-neutral-800 flex items-center space-x-2">
        <div className="flex space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <span className="text-xs text-neutral-500 font-mono ml-2">Usage Example</span>
      </div>
      <SyntaxHighlighter 
        language="tsx" 
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          background: 'transparent',
          fontSize: '0.9rem',
          lineHeight: '1.5',
        }}
        showLineNumbers={true}
        lineNumberStyle={{
          minWidth: '2em',
          paddingRight: '1em',
          color: '#4b5563',
          textAlign: 'right'
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
