import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printable Cleaning Schedule — Weekly Checklist — Printable Polly",
  description: "Generate a printable weekly cleaning schedule organized by room. Customize rooms, tasks per room, and print a checklist with day-of-week columns.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
