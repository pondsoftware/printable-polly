import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printable Checklist Generator — Printable Polly",
  description: "Generate a customizable blank checklist with 1-3 columns and any number of items. Add a title and print instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
