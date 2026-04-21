import { Metadata } from "next";
import SpiceGuideClient from "./SpiceGuideClient";

export const metadata: Metadata = {
  title: "Free Printable Spice & Herb Pairing Guide - Cooking Cheat Sheet | Printable Polly",
  description:
    "Print a spice and herb pairing guide with flavor profiles, cuisine pairings, and common spice blends. Italian, Mexican, Indian, Asian, Mediterranean, and BBQ. Free PDF.",
  alternates: { canonical: "https://printablepolly.com/spice-guide" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Spice & Herb Pairing Guide",
  description: "Print a spice and herb pairing guide with flavor profiles, cuisine pairings, and common spice blends. Italian, Mexican, Indian, Asian, Mediterranean, and BBQ. Free PDF.",
  url: "https://printablepolly.com/spice-guide",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function SpiceGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <SpiceGuideClient />
    </>
  );
}
