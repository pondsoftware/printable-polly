import { Metadata } from "next";
import BingoCardsClient from "./BingoCardsClient";

export const metadata: Metadata = {
  title: "Free Printable Bingo Cards - Custom PDF Generator | Printable Polly",
  description:
    "Create and print custom bingo cards with classic numbers or your own words. Perfect for parties, classrooms, and game nights. No signup required.",
  alternates: { canonical: "https://printablepolly.com/bingo-cards" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Bingo Cards",
  description: "Create and print custom bingo cards with classic numbers or your own words. Perfect for parties, classrooms, and game nights. No signup required.",
  url: "https://printablepolly.com/bingo-cards",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function BingoCardsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <BingoCardsClient />
    </>
  );
}
