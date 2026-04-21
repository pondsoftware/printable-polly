import { Metadata } from "next";
import HtmlCssReferenceClient from "./HtmlCssReferenceClient";

export const metadata: Metadata = {
  title: "Free Printable HTML & CSS Reference Sheet - Quick Guide | Printable Polly",
  description:
    "Print an HTML & CSS quick reference covering common tags, selectors, box model, flexbox, grid, and essential properties. Compact and readable. Free PDF.",
  alternates: { canonical: "https://printablepolly.com/html-css-reference" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "HTML & CSS Reference Sheet",
  description: "Print an HTML & CSS quick reference covering common tags, selectors, box model, flexbox, grid, and essential properties. Compact and readable. Free PDF.",
  url: "https://printablepolly.com/html-css-reference",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function HtmlCssReferencePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <HtmlCssReferenceClient />
    </>
  );
}
