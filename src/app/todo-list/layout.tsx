import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printable To-Do List with Priority Sections — Printable Polly",
  description: "Generate a printable to-do list organized by High, Medium, and Low priority. Customize item counts and print instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
