import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printable Weekly Planner Generator — Printable Polly",
  description: "Generate a customizable weekly planner. Choose start day, toggle time slots, add notes section. Print or save as PDF.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
