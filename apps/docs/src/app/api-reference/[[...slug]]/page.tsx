import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import Link from 'next/link';

export default async function ApiReferencePage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];
  
  // Clean up slug if it ends with .md
  let slugPath = slugArray.join('/');
  if (slugPath.endsWith('.md')) {
    slugPath = slugPath.slice(0, -3);
  }
  
  const filePath = slugPath 
    ? path.join(process.cwd(), 'src/content/api-reference', `${slugPath}.md`)
    : path.join(process.cwd(), 'src/content/api-reference', 'README.md');
  
  if (!fs.existsSync(filePath)) {
    notFound();
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  return (
    <div className="p-8 md:p-12 max-w-4xl prose prose-neutral dark:prose-invert">
      <ReactMarkdown 
        rehypePlugins={[rehypeHighlight]}
        components={{
          a: ({ node, href, ...props }) => {
            if (!href) return <a {...(props as any)} />;
            // Transform internal markdown links by removing .md extension
            // and ensuring they're relative to /api-reference if they are relative links
            if (href.startsWith('http')) {
              return <a href={href} target="_blank" rel="noopener noreferrer" {...(props as any)} />;
            }
            const cleanHref = href.replace(/\.md(#.*)?$/, '$1');
            // If the link is relative (like 'functions/useAudio.md'), it should go to /api-reference/functions/useAudio
            const finalHref = cleanHref.startsWith('/') ? cleanHref : `/api-reference/${cleanHref}`;
            return <Link href={finalHref} {...(props as any)} />;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
