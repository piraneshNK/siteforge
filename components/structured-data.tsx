export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SiteForge SEO Analyzer",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free AI-powered SEO analyzer tool that provides instant website audits and optimization recommendations.",
    screenshot: "https://siteforge.diy/og-image.png",
    featureList: ["Instant SEO Score", "Fix Recommendations", "Mobile + Speed Checks", "No Login Needed"],
    author: {
      "@type": "Organization",
      name: "SiteForge",
      url: "https://siteforge.diy",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
