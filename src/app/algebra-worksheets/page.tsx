import { Metadata } from "next";
import AlgebraWorksheetsClient from "./AlgebraWorksheetsClient";

export const metadata: Metadata = {
  title: "Free Printable Algebra Worksheets - PDF Generator | Printable Polly",
  description:
    "Generate free printable algebra worksheets with answer keys. Practice one-step, two-step, and multi-step equations. Customize difficulty and print instantly.",
  alternates: { canonical: "https://printablepolly.com/algebra-worksheets" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Algebra Worksheets",
  description: "Generate free printable algebra worksheets with answer keys. Practice one-step, two-step, and multi-step equations. Customize difficulty and print instantly.",
  url: "https://printablepolly.com/algebra-worksheets",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function AlgebraWorksheetsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <AlgebraWorksheetsClient />
    </>
  );
}
