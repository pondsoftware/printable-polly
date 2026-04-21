import { Metadata } from "next";
import HabitTrackerClient from "./HabitTrackerClient";

export const metadata: Metadata = {
  title: "Free Printable Habit Tracker - Monthly PDF Template | Printable Polly",
  description:
    "Create a printable monthly habit tracker to build better routines. Customize the number of habits, days, and labels. Print instantly for free.",
  alternates: { canonical: "https://printablepolly.com/habit-tracker" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Habit Tracker",
  description: "Create a printable monthly habit tracker to build better routines. Customize the number of habits, days, and labels. Print instantly for free.",
  url: "https://printablepolly.com/habit-tracker",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function HabitTrackerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <HabitTrackerClient />
    </>
  );
}
