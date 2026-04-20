import { Metadata } from "next";
import GoalSettingClient from "./GoalSettingClient";

export const metadata: Metadata = {
  title: "Free Printable SMART Goal Setting Worksheet - PDF Template | Printable Polly",
  description:
    "Create printable SMART goal-setting worksheets. Define specific, measurable, achievable, relevant, and time-bound goals. Download and print for free.",
  alternates: { canonical: "https://printablepolly.com/goal-setting" },
};

export default function GoalSettingPage() {
  return <GoalSettingClient />;
}
