import { Metadata } from "next";
import LinedPaperClient from "./LinedPaperClient";

export const metadata: Metadata = {
  title: "Free Printable Lined Paper - Ruled Paper PDF Generator | Printable Polly",
  description:
    "Create custom ruled paper with college, wide, or narrow line spacing. Add or remove margins and choose your line color. Print free lined paper instantly.",
  alternates: { canonical: "https://printablepolly.com/lined-paper" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Lined Paper",
  description: "Create custom ruled paper with college, wide, or narrow line spacing. Add or remove margins and choose your line color. Print free lined paper instantly.",
  url: "https://printablepolly.com/lined-paper",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function LinedPaperPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <LinedPaperClient />
    </>
  );
}
