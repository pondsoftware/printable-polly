import { Metadata } from "next";
import HexPaperClient from "./HexPaperClient";

export const metadata: Metadata = {
  title: "Free Printable Hexagonal Graph Paper - PDF Generator | Printable Polly",
  description:
    "Create printable hexagonal grid paper with adjustable hex size and line color. Ideal for organic chemistry, RPG maps, game boards, and tessellation design.",
  alternates: { canonical: "https://printablepolly.com/hex-paper" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Hexagonal Graph Paper",
  description: "Create printable hexagonal grid paper with adjustable hex size and line color. Ideal for organic chemistry, RPG maps, game boards, and tessellation design.",
  url: "https://printablepolly.com/hex-paper",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function HexPaperPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <HexPaperClient />
    </>
  );
}
