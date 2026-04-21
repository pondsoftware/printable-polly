import { Metadata } from "next";
import WordSearchClient from "./WordSearchClient";

export const metadata: Metadata = {
  title: "Free Printable Word Search Puzzles - Custom PDF Generator | Printable Polly",
  description:
    "Create custom word search puzzles with your own words. Choose grid size, enter your words, and print or download. Fun for classrooms and parties.",
  alternates: { canonical: "https://printablepolly.com/word-search" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Word Search Puzzles",
  description: "Create custom word search puzzles with your own words. Choose grid size, enter your words, and print or download. Fun for classrooms and parties.",
  url: "https://printablepolly.com/word-search",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function WordSearchPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <WordSearchClient />
    </>
  );
}
