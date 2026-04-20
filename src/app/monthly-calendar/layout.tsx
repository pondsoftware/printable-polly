import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printable Monthly Calendar Generator — Printable Polly",
  description: "Generate a printable monthly calendar for any month and year. Choose start day, add notes area. Print or save as PDF.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
