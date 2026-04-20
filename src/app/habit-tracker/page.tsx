import { Metadata } from "next";
import HabitTrackerClient from "./HabitTrackerClient";

export const metadata: Metadata = {
  title: "Free Printable Habit Tracker - Monthly PDF Template | Printable Polly",
  description:
    "Create a printable monthly habit tracker to build better routines. Customize the number of habits, days, and labels. Print instantly for free.",
  alternates: { canonical: "https://printablepolly.com/habit-tracker" },
};

export default function HabitTrackerPage() {
  return <HabitTrackerClient />;
}
