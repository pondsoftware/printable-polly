import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printable Habit Tracker Generator — Printable Polly",
  description: "Generate a printable monthly habit tracker. Customize number of habits, days, and labels. Track daily habits visually.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
