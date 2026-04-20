import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printable Bingo Cards Generator — Printable Polly",
  description: "Generate and print custom bingo cards with numbers (1-75) or your own words. Perfect for parties, classrooms, and game nights.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
