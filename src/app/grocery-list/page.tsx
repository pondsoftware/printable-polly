import { Metadata } from "next";
import GroceryListClient from "./GroceryListClient";

export const metadata: Metadata = {
  title: "Free Printable Grocery List - Organized PDF Template | Printable Polly",
  description:
    "Create printable grocery lists organized by store section. Customize section names and items for efficient shopping. Print or download as PDF.",
  alternates: { canonical: "https://printablepolly.com/grocery-list" },
};

export default function GroceryListPage() {
  return <GroceryListClient />;
}
