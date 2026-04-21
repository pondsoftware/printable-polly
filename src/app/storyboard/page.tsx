import { Metadata } from "next";
import StoryboardClient from "./StoryboardClient";

export const metadata: Metadata = {
  title: "Free Printable Storyboard Templates - PDF Generator | Printable Polly",
  description:
    "Print storyboard panels with space for drawing and notes. Ideal for planning films, animations, videos, and creative projects. Customizable and free.",
  alternates: { canonical: "https://printablepolly.com/storyboard" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Storyboard Templates",
  description: "Print storyboard panels with space for drawing and notes. Ideal for planning films, animations, videos, and creative projects. Customizable and free.",
  url: "https://printablepolly.com/storyboard",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function StoryboardPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <StoryboardClient />
    </>
  );
}
