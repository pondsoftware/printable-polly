import { Metadata } from "next";
import GitCheatSheetClient from "./GitCheatSheetClient";

export const metadata: Metadata = {
  title: "Free Printable Git Commands Cheat Sheet - Reference PDF | Printable Polly",
  description:
    "Print a Git commands cheat sheet covering setup, workflow, branching, history, undo, and remote operations. Common flags included. Free printable PDF.",
  alternates: { canonical: "https://printablepolly.com/git-cheat-sheet" },
};

export default function GitCheatSheetPage() {
  return <GitCheatSheetClient />;
}
