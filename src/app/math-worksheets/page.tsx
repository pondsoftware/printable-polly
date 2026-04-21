import { Metadata } from "next";
import MathWorksheetsClient from "./MathWorksheetsClient";

export const metadata: Metadata = {
  title: "Free Printable Math Worksheets - PDF Generator with Answer Keys | Printable Polly",
  description:
    "Generate printable math worksheets with random problems. Choose arithmetic, fractions, algebra, or geometry at any difficulty level. Includes answer keys.",
  alternates: { canonical: "https://printablepolly.com/math-worksheets" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Math Worksheets",
  description: "Generate printable math worksheets with random problems. Choose arithmetic, fractions, algebra, or geometry at any difficulty level. Includes answer keys.",
  url: "https://printablepolly.com/math-worksheets",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function MathWorksheetsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <MathWorksheetsClient />
    </>
  );
}
