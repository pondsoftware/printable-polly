import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printable Reading Log — Book Tracker — Printable Polly",
  description: "Generate a printable reading log to track books read with title, author, dates, star ratings, and notes. Customize rows and columns, then print instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
