import { Metadata } from "next";
import CornellNotesClient from "./CornellNotesClient";

export const metadata: Metadata = {
  title: "Free Printable Cornell Notes Template - PDF Generator | Printable Polly",
  description:
    "Print Cornell note-taking templates with cue column, notes section, and summary area. The proven method for effective studying. Customize and print free.",
  alternates: { canonical: "https://printablepolly.com/cornell-notes" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Cornell Notes Template",
  description: "Print Cornell note-taking templates with cue column, notes section, and summary area. The proven method for effective studying. Customize and print free.",
  url: "https://printablepolly.com/cornell-notes",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function CornellNotesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <CornellNotesClient />
    </>
  );
}
