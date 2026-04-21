import { Metadata } from "next";
import TodoListClient from "./TodoListClient";

export const metadata: Metadata = {
  title: "Free Printable To-Do List - Priority Planner PDF Template | Printable Polly",
  description:
    "Create a printable to-do list with priority sections for high, medium, and low tasks. Stay organized by tackling important tasks first. Print for free.",
  alternates: { canonical: "https://printablepolly.com/todo-list" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "To",
  description: "Create a printable to-do list with priority sections for high, medium, and low tasks. Stay organized by tackling important tasks first. Print for free.",
  url: "https://printablepolly.com/todo-list",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function TodoListPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <TodoListClient />
    </>
  );
}
