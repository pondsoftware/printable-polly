import { Metadata } from "next";
import HandwritingPracticeClient from "./HandwritingPracticeClient";

export const metadata: Metadata = {
  title: "Free Printable Handwriting Practice Sheets - PDF Generator | Printable Polly",
  description:
    "Generate printable handwriting practice sheets with traceable text in print or cursive. Choose preset texts or type your own. Free and customizable.",
  alternates: { canonical: "https://printablepolly.com/handwriting-practice" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Handwriting Practice Sheets",
  description: "Generate printable handwriting practice sheets with traceable text in print or cursive. Choose preset texts or type your own. Free and customizable.",
  url: "https://printablepolly.com/handwriting-practice",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function HandwritingPracticePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <HandwritingPracticeClient />
    </>
  );
}
