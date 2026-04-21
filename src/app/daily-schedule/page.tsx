import { Metadata } from "next";
import DailyScheduleClient from "./DailyScheduleClient";

export const metadata: Metadata = {
  title: "Free Printable Daily Schedule - Time Block PDF Planner | Printable Polly",
  description:
    "Create a printable daily time-block schedule with customizable start and end hours. Perfect for structured planning and productivity.",
  alternates: { canonical: "https://printablepolly.com/daily-schedule" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Daily Schedule",
  description: "Create a printable daily time-block schedule with customizable start and end hours. Perfect for structured planning and productivity.",
  url: "https://printablepolly.com/daily-schedule",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function DailySchedulePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <DailyScheduleClient />
    </>
  );
}
