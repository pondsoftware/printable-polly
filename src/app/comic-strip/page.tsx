import { Metadata } from "next";
import ComicStripClient from "./ComicStripClient";

export const metadata: Metadata = {
  title: "Free Printable Comic Strip Templates - Blank PDF Panels | Printable Polly",
  description:
    "Print blank comic strip panels for drawing stories. Choose your panel layout and border style, then start creating comics. Free and customizable.",
  alternates: { canonical: "https://printablepolly.com/comic-strip" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Comic Strip Templates",
  description: "Print blank comic strip panels for drawing stories. Choose your panel layout and border style, then start creating comics. Free and customizable.",
  url: "https://printablepolly.com/comic-strip",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function ComicStripPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ComicStripClient />
    </>
  );
}
