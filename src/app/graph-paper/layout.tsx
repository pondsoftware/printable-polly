import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printable Graph Paper Generator — Printable Polly",
  description: "Generate custom graph paper with adjustable grid size (1/4\", 1/2\", 1cm), line color, and line weight. Print or save as PDF instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
