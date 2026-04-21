import { Metadata } from "next";
import PeriodicTableClient from "./PeriodicTableClient";

export const metadata: Metadata = {
  title: "Free Printable Periodic Table of Elements - Color PDF | Printable Polly",
  description:
    "Print a color-coded periodic table of elements with atomic number, symbol, name, and atomic mass. Full or simplified version. Free printable PDF.",
  alternates: { canonical: "https://printablepolly.com/periodic-table" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Periodic Table of Elements",
  description: "Print a color-coded periodic table of elements with atomic number, symbol, name, and atomic mass. Full or simplified version. Free printable PDF.",
  url: "https://printablepolly.com/periodic-table",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function PeriodicTablePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <PeriodicTableClient />
    </>
  );
}
