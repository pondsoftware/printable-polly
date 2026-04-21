import { Metadata } from "next";
import CleaningScheduleClient from "./CleaningScheduleClient";

export const metadata: Metadata = {
  title: "Free Printable Cleaning Schedule - Weekly Checklist PDF | Printable Polly",
  description:
    "Create a printable weekly cleaning checklist organized by room. Customize room names and tasks, then print or download your cleaning schedule.",
  alternates: { canonical: "https://printablepolly.com/cleaning-schedule" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Cleaning Schedule",
  description: "Create a printable weekly cleaning checklist organized by room. Customize room names and tasks, then print or download your cleaning schedule.",
  url: "https://printablepolly.com/cleaning-schedule",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function CleaningSchedulePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <CleaningScheduleClient />
    </>
  );
}
