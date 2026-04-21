import { Metadata } from "next";
import ColoringPagesClient from "./ColoringPagesClient";

export const metadata: Metadata = {
  title: "Free Printable Geometric Coloring Pages - PDF Generator | Printable Polly",
  description:
    "Generate beautiful geometric coloring pages including mandalas, mosaics, kaleidoscopes, and tessellations. Customize patterns and print for free.",
  alternates: { canonical: "https://printablepolly.com/coloring-pages" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Geometric Coloring Pages",
  description: "Generate beautiful geometric coloring pages including mandalas, mosaics, kaleidoscopes, and tessellations. Customize patterns and print for free.",
  url: "https://printablepolly.com/coloring-pages",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function ColoringPagesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ColoringPagesClient />
    </>
  );
}
