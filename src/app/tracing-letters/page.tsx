import { Metadata } from "next";
import TracingLettersClient from "./TracingLettersClient";

export const metadata: Metadata = {
  title: "Free Printable Letter Tracing Worksheets - Pre-K & Kindergarten | Printable Polly",
  description:
    "Generate printable letter tracing worksheets for pre-K and kindergarten. Dotted/dashed uppercase and lowercase letters with full-line tracing practice.",
  alternates: { canonical: "https://printablepolly.com/tracing-letters" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Letter Tracing Worksheets",
  description: "Generate printable letter tracing worksheets for pre-K and kindergarten. Dotted/dashed uppercase and lowercase letters with full-line tracing practice.",
  url: "https://printablepolly.com/tracing-letters",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function TracingLettersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <TracingLettersClient />
    </>
  );
}
