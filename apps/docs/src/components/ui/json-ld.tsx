/**
 * Renders a schema.org document. Keep one per page — search engines and
 * LLM crawlers read the @graph, so bundling nodes together beats emitting
 * several competing scripts.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
