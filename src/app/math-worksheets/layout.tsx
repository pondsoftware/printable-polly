import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printable Math Worksheets — Arithmetic, Fractions, Algebra, Geometry — Printable Polly",
  description: "Generate free printable math worksheets with random problems. Choose arithmetic, fractions, algebra, or geometry at easy, medium, or hard difficulty. Includes answer keys.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
