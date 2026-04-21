import { Metadata } from "next";
import LinedJournalClient from "./LinedJournalClient";

export const metadata: Metadata = {
  title: "Free Printable Journal Pages - Lined Writing Paper with Drawing Area | Printable Polly",
  description:
    "Generate printable journal pages with lines and an optional drawing area. Choose wide, medium, or narrow line spacing. Perfect for elementary creative writing.",
  alternates: { canonical: "https://printablepolly.com/lined-journal" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Journal Pages",
  description: "Generate printable journal pages with lines and an optional drawing area. Choose wide, medium, or narrow line spacing. Perfect for elementary creative writing.",
  url: "https://printablepolly.com/lined-journal",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function LinedJournalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <LinedJournalClient />
    </>
  );
}
