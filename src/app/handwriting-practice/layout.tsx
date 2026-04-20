import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printable Handwriting Practice Sheets — Printable Polly",
  description: "Generate printable handwriting practice sheets with adjustable line height, dotted or solid guide lines, and descender guides.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
