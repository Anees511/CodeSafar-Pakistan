interface SEOHeadProps {
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export default function SEOHead({ jsonLd }: SEOHeadProps) {
  if (!jsonLd) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
