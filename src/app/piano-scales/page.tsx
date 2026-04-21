import { Metadata } from "next";
import PianoScalesClient from "./PianoScalesClient";

export const metadata: Metadata = {
  title: "Free Printable Piano Scales Reference - Major, Minor, Pentatonic | Printable Polly",
  description:
    "Print piano scale diagrams with highlighted keys for all major and minor scales, plus pentatonic and blues scales. Includes finger numbers. Free printable PDF.",
  alternates: { canonical: "https://printablepolly.com/piano-scales" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Piano Scales Reference",
  description: "Print piano scale diagrams with highlighted keys for all major and minor scales, plus pentatonic and blues scales. Includes finger numbers. Free printable PDF.",
  url: "https://printablepolly.com/piano-scales",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function PianoScalesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <PianoScalesClient />
    </>
  );
}
