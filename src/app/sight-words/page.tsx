import { Metadata } from "next";
import SightWordsClient from "./SightWordsClient";

export const metadata: Metadata = {
  title: "Free Printable Sight Word Practice Sheets - PDF Generator | Printable Polly",
  description:
    "Generate printable sight word practice sheets by grade level. Each word includes a printed example, dotted tracing guide, and blank lines for writing practice.",
  alternates: { canonical: "https://printablepolly.com/sight-words" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Sight Word Practice Sheets",
  description: "Generate printable sight word practice sheets by grade level. Each word includes a printed example, dotted tracing guide, and blank lines for writing practice.",
  url: "https://printablepolly.com/sight-words",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function SightWordsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <SightWordsClient />
    </>
  );
}
