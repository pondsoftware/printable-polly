import { Metadata } from "next";
import PlaceValueClient from "./PlaceValueClient";

export const metadata: Metadata = {
  title: "Free Printable Place Value Worksheets - Ones, Tens, Hundreds | Printable Polly",
  description:
    "Generate printable place value worksheets. Identify digit values, expanded form, compare numbers, and write in standard form. Easy through Hard difficulty levels.",
  alternates: { canonical: "https://printablepolly.com/place-value" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Place Value Worksheets",
  description: "Generate printable place value worksheets. Identify digit values, expanded form, compare numbers, and write in standard form. Easy through Hard difficulty levels.",
  url: "https://printablepolly.com/place-value",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function PlaceValuePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <PlaceValueClient />
    </>
  );
}
