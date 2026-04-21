import { Metadata } from "next";
import NumberLineClient from "./NumberLineClient";

export const metadata: Metadata = {
  title: "Free Printable Number Lines - Custom PDF Generator | Printable Polly",
  description:
    "Generate printable number lines with customizable start, end, and interval values. Choose labeled or blank for practice. Print instantly for free.",
  alternates: { canonical: "https://printablepolly.com/number-line" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Number Lines",
  description: "Generate printable number lines with customizable start, end, and interval values. Choose labeled or blank for practice. Print instantly for free.",
  url: "https://printablepolly.com/number-line",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function NumberLinePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <NumberLineClient />
    </>
  );
}
