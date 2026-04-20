import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printable Math Worksheets — Addition, Subtraction, Multiplication — Printable Polly",
  description: "Generate free printable math worksheets with random problems. Choose addition, subtraction, multiplication, division, or mixed operations at any difficulty level.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
