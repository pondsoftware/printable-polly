import { Metadata } from "next";
import GuitarChordsClient from "./GuitarChordsClient";

export const metadata: Metadata = {
  title: "Free Printable Guitar Chord Chart - Essential Open Chords PDF | Printable Polly",
  description:
    "Print a guitar chord chart with diagrams for essential open chords, barre chords, and seventh chords. Shows finger positions, open/muted strings. Free printable PDF.",
  alternates: { canonical: "https://printablepolly.com/guitar-chords" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Guitar Chord Chart",
  description: "Print a guitar chord chart with diagrams for essential open chords, barre chords, and seventh chords. Shows finger positions, open/muted strings. Free printable PDF.",
  url: "https://printablepolly.com/guitar-chords",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function GuitarChordsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <GuitarChordsClient />
    </>
  );
}
