import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printable Multiplication Table Generator — Printable Polly",
  description: "Generate a printable multiplication table (1-12 or 1-20). Print filled for reference or blank for practice. Great for students.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
