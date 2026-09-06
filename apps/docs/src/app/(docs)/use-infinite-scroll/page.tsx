'use client';
import { useState } from 'react';
import { useInfiniteScroll } from '@danixsoft/hooks';
import CodeBlock from '@/components/docs/code-block';

export default function UseInfiniteScrollPage() {
  const [items, setItems] = useState<number[]>(Array.from({ length: 15 }, (_, i) => i));
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = () => {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setItems(prev => [...prev, ...Array.from({ length: 10 }, (_, i) => prev.length + i)]);
      setIsLoading(false);
    }, 800);
  };
  
  const ref = useInfiniteScroll<HTMLDivElement>(loadMore, { threshold: 1 });

  const codeString = `
import { useState } from 'react';
import { useInfiniteScroll } from '@danixsoft/hooks';

function Feed() {
  const [items, setItems] = useState([1, 2, 3]);
  
  const loadMore = () => {
    // Fetch more items...
    setItems(prev => [...prev, 4, 5, 6]);
  };
  
  // Attach this ref to the element at the bottom of your list
  const bottomRef = useInfiniteScroll<HTMLDivElement>(loadMore);

  return (
    <div style={{ height: '400px', overflow: 'auto' }}>
      {items.map(i => <div key={i}>Item {i}</div>)}
      
      <div ref={bottomRef}>Loading more...</div>
    </div>
  );
}
  `;

  return (
    <div>
      <div className="bg-surface rounded p-8 max-h-[400px] overflow-y-auto shadow-[var(--shadow-md)] border border-border mb-8 relative">
        <div className="space-y-3">
          {items.map(item => (
            <div key={item} className="p-4 bg-bg-subtle rounded text-fg-muted shadow-[var(--shadow-sm)] border border-border">
              Infinite List Item <span className="font-mono font-bold text-blue-500">#{item}</span>
            </div>
          ))}
        </div>
        <div ref={ref} className="h-24 flex items-center justify-center text-fg-muted mt-4">
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          ) : (
            <span>Scroll down for more</span>
          )}
        </div>
      </div>
      <div id="usage" className="scroll-mt-24">
        <CodeBlock code={codeString} />
      </div>
    </div>
  );
}
