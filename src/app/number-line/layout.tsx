import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printable Number Line Generator — Printable Polly",
  description: "Generate printable number lines with custom start, end, and interval. Print labeled for reference or blank for student practice.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
