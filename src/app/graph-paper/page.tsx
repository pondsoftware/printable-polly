import { Metadata } from "next";
import GraphPaperClient from "./GraphPaperClient";

export const metadata: Metadata = {
  title: "Free Printable Graph Paper - Custom Grid PDF Generator | Printable Polly",
  description:
    "Create custom graph paper with adjustable grid size, line color, and weight. Perfect for math, science, engineering, and sketching. Print instantly.",
  alternates: { canonical: "https://printablepolly.com/graph-paper" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Graph Paper",
  description: "Create custom graph paper with adjustable grid size, line color, and weight. Perfect for math, science, engineering, and sketching. Print instantly.",
  url: "https://printablepolly.com/graph-paper",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function GraphPaperPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <GraphPaperClient />
    </>
  );
}
