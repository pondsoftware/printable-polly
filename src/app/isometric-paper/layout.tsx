import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printable Isometric Paper Generator — Printable Polly",
  description: "Generate custom isometric/triangle grid paper for 3D drawing and engineering. Adjust grid size and line color. Print or save as PDF.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
