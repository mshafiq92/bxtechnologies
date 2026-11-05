/**
 * Renders schema.org JSON-LD. `<` is escaped so content can never close the script tag.
 * Server component: adds no client JavaScript.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | null | undefined }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"

      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
