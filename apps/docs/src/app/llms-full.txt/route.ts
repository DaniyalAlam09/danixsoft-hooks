import { buildCorpus } from '@/lib/llms-corpus';

export const dynamic = 'force-static';

/**
 * /llms-full.txt — the complete corpus in one plain-text file: every hook with
 * its signature and usage, plus the full text of every guide and comparison.
 * /llms-hooks.txt and /llms-guides.txt split the same content in two.
 */
export function GET() {
  return new Response(buildCorpus('all'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
