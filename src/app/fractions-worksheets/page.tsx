import { Metadata } from "next";
import FractionsWorksheetsClient from "./FractionsWorksheetsClient";

export const metadata: Metadata = {
  title: "Free Printable Fractions Worksheets - PDF Generator | Printable Polly",
  description:
    "Generate free printable fractions worksheets with answer keys. Practice adding, subtracting, and simplifying fractions at any difficulty level.",
  alternates: { canonical: "https://printablepolly.com/fractions-worksheets" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Fractions Worksheets",
  description: "Generate free printable fractions worksheets with answer keys. Practice adding, subtracting, and simplifying fractions at any difficulty level.",
  url: "https://printablepolly.com/fractions-worksheets",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function FractionsWorksheetsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <FractionsWorksheetsClient />
    </>
  );
}
