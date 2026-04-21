import { Metadata } from "next";
import KeyboardShortcutsClient from "./KeyboardShortcutsClient";

export const metadata: Metadata = {
  title: "Free Printable Keyboard Shortcuts Cheat Sheet - Mac & Windows | Printable Polly",
  description:
    "Print a keyboard shortcuts cheat sheet for Mac or Windows. Covers general, text editing, browser, file management, and screenshot shortcuts. Free printable PDF.",
  alternates: { canonical: "https://printablepolly.com/keyboard-shortcuts" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Keyboard Shortcuts Cheat Sheet",
  description: "Print a keyboard shortcuts cheat sheet for Mac or Windows. Covers general, text editing, browser, file management, and screenshot shortcuts. Free printable PDF.",
  url: "https://printablepolly.com/keyboard-shortcuts",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function KeyboardShortcutsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <KeyboardShortcutsClient />
    </>
  );
}
