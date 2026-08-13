import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

export default async function ApiReferencePage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];
  const filePath = path.join(process.cwd(), 'src/content/api-reference', `${slugArray.join('/')}.md`);
  
  if (!fs.existsSync(filePath)) {
    // If it's the root /api-reference, maybe point to README.md
    if (slugArray.length === 0) {
      const readmePath = path.join(process.cwd(), 'src/content/api-reference', 'README.md');
      if (fs.existsSync(readmePath)) {
        const content = fs.readFileSync(readmePath, 'utf8');
        return (
          <div className="p-8 md:p-12 max-w-4xl prose prose-neutral dark:prose-invert">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
          </div>
        );
      }
    }
    notFound();
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  return (
    <div className="p-8 md:p-12 max-w-4xl prose prose-neutral dark:prose-invert">
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
