import { Metadata } from "next";
import ChoreChartClient from "./ChoreChartClient";

export const metadata: Metadata = {
  title: "Free Printable Chore Chart for Kids - PDF Generator | Printable Polly",
  description:
    "Create printable weekly chore charts for kids. Customize chore names and number of tasks, then print or download as PDF. Great for building responsibility.",
  alternates: { canonical: "https://printablepolly.com/chore-chart" },
};

export default function ChoreChartPage() {
  return <ChoreChartClient />;
}
