import { Metadata } from "next";
import RegexCheatSheetClient from "./RegexCheatSheetClient";

export const metadata: Metadata = {
  title: "Free Printable Regex Cheat Sheet - Regular Expressions Reference | Printable Polly",
  description:
    "Print a regular expressions cheat sheet covering character classes, quantifiers, anchors, groups, lookaround, and common patterns. Free printable PDF.",
  alternates: { canonical: "https://printablepolly.com/regex-cheat-sheet" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Regex Cheat Sheet",
  description: "Print a regular expressions cheat sheet covering character classes, quantifiers, anchors, groups, lookaround, and common patterns. Free printable PDF.",
  url: "https://printablepolly.com/regex-cheat-sheet",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function RegexCheatSheetPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <RegexCheatSheetClient />
    </>
  );
}
