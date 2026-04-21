import { Metadata } from "next";
import SpellingWorksheetsClient from "./SpellingWorksheetsClient";

export const metadata: Metadata = {
  title: "Free Printable Spelling Worksheets - Word Practice Generator | Printable Polly",
  description:
    "Generate printable spelling worksheets with write-each-word-3-times grids, fill-in-the-blank sentences, and word scrambles. Choose Easy, Medium, or Hard difficulty.",
  alternates: { canonical: "https://printablepolly.com/spelling-worksheets" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Spelling Worksheets",
  description: "Generate printable spelling worksheets with write-each-word-3-times grids, fill-in-the-blank sentences, and word scrambles. Choose Easy, Medium, or Hard difficulty.",
  url: "https://printablepolly.com/spelling-worksheets",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function SpellingWorksheetsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <SpellingWorksheetsClient />
    </>
  );
}
