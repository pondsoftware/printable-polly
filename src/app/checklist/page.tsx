import { Metadata } from "next";
import ChecklistClient from "./ChecklistClient";

export const metadata: Metadata = {
  title: "Free Printable Checklist - Custom PDF Generator | Printable Polly",
  description:
    "Create blank printable checklists with customizable items, columns, and titles. Perfect for to-dos, packing lists, and daily planning. Print instantly.",
  alternates: { canonical: "https://printablepolly.com/checklist" },
};

export default function ChecklistPage() {
  return <ChecklistClient />;
}
