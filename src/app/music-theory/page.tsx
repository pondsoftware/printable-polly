import { Metadata } from "next";
import MusicTheoryClient from "./MusicTheoryClient";

export const metadata: Metadata = {
  title: "Free Printable Music Theory Cheat Sheet - Notes, Keys, Intervals | Printable Polly",
  description:
    "Print a music theory reference covering note values, time signatures, key signatures, intervals, dynamics, and tempo markings. Free printable PDF.",
  alternates: { canonical: "https://printablepolly.com/music-theory" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Music Theory Cheat Sheet",
  description: "Print a music theory reference covering note values, time signatures, key signatures, intervals, dynamics, and tempo markings. Free printable PDF.",
  url: "https://printablepolly.com/music-theory",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function MusicTheoryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <MusicTheoryClient />
    </>
  );
}
