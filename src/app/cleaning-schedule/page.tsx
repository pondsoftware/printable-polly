import { Metadata } from "next";
import CleaningScheduleClient from "./CleaningScheduleClient";

export const metadata: Metadata = {
  title: "Free Printable Cleaning Schedule - Weekly Checklist PDF | Printable Polly",
  description:
    "Create a printable weekly cleaning checklist organized by room. Customize room names and tasks, then print or download your cleaning schedule.",
  alternates: { canonical: "https://printablepolly.com/cleaning-schedule" },
};

export default function CleaningSchedulePage() {
  return <CleaningScheduleClient />;
}
