import { Metadata } from "next";
import WordSearchClient from "./WordSearchClient";

export const metadata: Metadata = {
  title: "Free Printable Word Search Puzzles - Custom PDF Generator | Printable Polly",
  description:
    "Create custom word search puzzles with your own words. Choose grid size, enter your words, and print or download. Fun for classrooms and parties.",
  alternates: { canonical: "https://printablepolly.com/word-search" },
};

export default function WordSearchPage() {
  return <WordSearchClient />;
}
