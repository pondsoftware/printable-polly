import { Metadata } from "next";
import IsometricPaperClient from "./IsometricPaperClient";

export const metadata: Metadata = {
  title: "Free Printable Isometric Paper - Triangle Grid PDF Generator | Printable Polly",
  description:
    "Create isometric and triangle grid paper for 3D drawing, architecture, and engineering. Customize grid size and line color. Print instantly.",
  alternates: { canonical: "https://printablepolly.com/isometric-paper" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Isometric Paper",
  description: "Create isometric and triangle grid paper for 3D drawing, architecture, and engineering. Customize grid size and line color. Print instantly.",
  url: "https://printablepolly.com/isometric-paper",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function IsometricPaperPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <IsometricPaperClient />
    </>
  );
}
