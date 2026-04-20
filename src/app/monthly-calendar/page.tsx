import { Metadata } from "next";
import MonthlyCalendarClient from "./MonthlyCalendarClient";

export const metadata: Metadata = {
  title: "Free Printable Monthly Calendar - PDF Generator | Printable Polly",
  description:
    "Generate a printable monthly calendar for any month and year. Choose your start day, add a notes section, and print or download as PDF.",
  alternates: { canonical: "https://printablepolly.com/monthly-calendar" },
};

export default function MonthlyCalendarPage() {
  return <MonthlyCalendarClient />;
}
