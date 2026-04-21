import { Metadata } from "next";
import GrammarRulesClient from "./GrammarRulesClient";

export const metadata: Metadata = {
  title: "Free Printable English Grammar Cheat Sheet - Rules & Examples | Printable Polly",
  description:
    "Print an English grammar cheat sheet with parts of speech, punctuation rules, common mistakes, sentence structure, and confused words. Free PDF.",
  alternates: { canonical: "https://printablepolly.com/grammar-rules" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "English Grammar Cheat Sheet",
  description: "Print an English grammar cheat sheet with parts of speech, punctuation rules, common mistakes, sentence structure, and confused words. Free PDF.",
  url: "https://printablepolly.com/grammar-rules",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function GrammarRulesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <GrammarRulesClient />
    </>
  );
}
