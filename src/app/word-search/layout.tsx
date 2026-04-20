import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printable Word Search Puzzle Generator — Printable Polly",
  description: "Generate custom word search puzzles with your own words. Choose grid size, randomize placement, and print instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
