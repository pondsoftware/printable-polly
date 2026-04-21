import { Metadata } from "next";
import WeeklyPlannerClient from "./WeeklyPlannerClient";

export const metadata: Metadata = {
  title: "Free Printable Weekly Planner - Customizable PDF Template | Printable Polly",
  description:
    "Create a customizable weekly planner with flexible start day, time slots, and notes section. Print or download your weekly planner for free.",
  alternates: { canonical: "https://printablepolly.com/weekly-planner" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Weekly Planner",
  description: "Create a customizable weekly planner with flexible start day, time slots, and notes section. Print or download your weekly planner for free.",
  url: "https://printablepolly.com/weekly-planner",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function WeeklyPlannerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <WeeklyPlannerClient />
    </>
  );
}
