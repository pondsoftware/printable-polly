import { Metadata } from "next";
import WeeklyPlannerClient from "./WeeklyPlannerClient";

export const metadata: Metadata = {
  title: "Free Printable Weekly Planner - Customizable PDF Template | Printable Polly",
  description:
    "Create a customizable weekly planner with flexible start day, time slots, and notes section. Print or download your weekly planner for free.",
  alternates: { canonical: "https://printablepolly.com/weekly-planner" },
};

export default function WeeklyPlannerPage() {
  return <WeeklyPlannerClient />;
}
