import { Metadata } from "next";
import ReadingLogClient from "./ReadingLogClient";

export const metadata: Metadata = {
  title: "Free Printable Reading Log - Book Tracker PDF Template | Printable Polly",
  description:
    "Create a printable reading log to track books. Customize the number of rows and choose which columns to include. Perfect for students and book lovers.",
  alternates: { canonical: "https://printablepolly.com/reading-log" },
};

export default function ReadingLogPage() {
  return <ReadingLogClient />;
}
