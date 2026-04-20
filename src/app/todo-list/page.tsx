import { Metadata } from "next";
import TodoListClient from "./TodoListClient";

export const metadata: Metadata = {
  title: "Free Printable To-Do List - Priority Planner PDF Template | Printable Polly",
  description:
    "Create a printable to-do list with priority sections for high, medium, and low tasks. Stay organized by tackling important tasks first. Print for free.",
  alternates: { canonical: "https://printablepolly.com/todo-list" },
};

export default function TodoListPage() {
  return <TodoListClient />;
}
