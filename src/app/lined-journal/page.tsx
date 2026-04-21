import { Metadata } from "next";
import LinedJournalClient from "./LinedJournalClient";

export const metadata: Metadata = {
  title: "Free Printable Journal Pages - Lined Writing Paper with Drawing Area | Printable Polly",
  description:
    "Generate printable journal pages with lines and an optional drawing area. Choose wide, medium, or narrow line spacing. Perfect for elementary creative writing.",
  alternates: { canonical: "https://printablepolly.com/lined-journal" },
};

export default function LinedJournalPage() {
  return <LinedJournalClient />;
}
