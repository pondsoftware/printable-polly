import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printable Monthly Budget Tracker — Printable Polly",
  description: "Track monthly income and expenses by category. Customize line items per category, total everything up, and print instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
