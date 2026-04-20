import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printable Weekly Meal Planner — Printable Polly",
  description: "Plan breakfast, lunch, dinner, and snacks for the entire week. Customize start day, toggle snack rows, and print instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
