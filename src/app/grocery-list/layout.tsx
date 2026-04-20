import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printable Grocery List by Store Section — Printable Polly",
  description: "Generate a printable grocery list organized by store section (produce, dairy, meat, etc.). Customize sections and print instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
