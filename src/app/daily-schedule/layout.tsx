import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printable Daily Schedule Generator — Printable Polly",
  description: "Generate a printable daily time-block schedule. Set start/end hours and intervals (15, 30, or 60 min). Print or save as PDF.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
