import { Metadata } from "next";
import GeometryWorksheetsClient from "./GeometryWorksheetsClient";

export const metadata: Metadata = {
  title: "Free Printable Geometry Worksheets - PDF Generator | Printable Polly",
  description:
    "Generate free printable geometry worksheets with labeled shape diagrams. Practice perimeter, area, volume, and surface area with answer keys.",
  alternates: { canonical: "https://printablepolly.com/geometry-worksheets" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Geometry Worksheets",
  description: "Generate free printable geometry worksheets with labeled shape diagrams. Practice perimeter, area, volume, and surface area with answer keys.",
  url: "https://printablepolly.com/geometry-worksheets",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function GeometryWorksheetsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <GeometryWorksheetsClient />
    </>
  );
}
