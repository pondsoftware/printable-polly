import { Metadata } from "next";
import DotGridClient from "./DotGridClient";

export const metadata: Metadata = {
  title: "Free Printable Dot Grid Paper - Custom PDF Generator | Printable Polly",
  description:
    "Create custom dot grid paper for bullet journaling, sketching, and note-taking. Adjust dot spacing, size, and color. Print instantly for free.",
  alternates: { canonical: "https://printablepolly.com/dot-grid" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Dot Grid Paper",
  description: "Create custom dot grid paper for bullet journaling, sketching, and note-taking. Adjust dot spacing, size, and color. Print instantly for free.",
  url: "https://printablepolly.com/dot-grid",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function DotGridPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <DotGridClient />
    </>
  );
}
