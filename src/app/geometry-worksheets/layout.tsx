import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printable Geometry Worksheets — Perimeter, Area & Volume — Printable Polly",
  description: "Free printable geometry worksheets. Practice perimeter, area, volume, and surface area calculations for squares, rectangles, triangles, circles, and prisms. Answer keys included.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
