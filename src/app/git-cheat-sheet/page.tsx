import { Metadata } from "next";
import GitCheatSheetClient from "./GitCheatSheetClient";

export const metadata: Metadata = {
  title: "Free Printable Git Commands Cheat Sheet - Reference PDF | Printable Polly",
  description:
    "Print a Git commands cheat sheet covering setup, workflow, branching, history, undo, and remote operations. Common flags included. Free printable PDF.",
  alternates: { canonical: "https://printablepolly.com/git-cheat-sheet" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Git Commands Cheat Sheet",
  description: "Print a Git commands cheat sheet covering setup, workflow, branching, history, undo, and remote operations. Common flags included. Free printable PDF.",
  url: "https://printablepolly.com/git-cheat-sheet",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function GitCheatSheetPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <GitCheatSheetClient />
    </>
  );
}
