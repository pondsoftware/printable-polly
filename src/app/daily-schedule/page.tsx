import { Metadata } from "next";
import DailyScheduleClient from "./DailyScheduleClient";

export const metadata: Metadata = {
  title: "Free Printable Daily Schedule - Time Block PDF Planner | Printable Polly",
  description:
    "Create a printable daily time-block schedule with customizable start and end hours. Perfect for structured planning and productivity.",
  alternates: { canonical: "https://printablepolly.com/daily-schedule" },
};

export default function DailySchedulePage() {
  return <DailyScheduleClient />;
}
