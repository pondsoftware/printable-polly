import { Metadata } from "next";
import KeyboardShortcutsClient from "./KeyboardShortcutsClient";

export const metadata: Metadata = {
  title: "Free Printable Keyboard Shortcuts Cheat Sheet - Mac & Windows | Printable Polly",
  description:
    "Print a keyboard shortcuts cheat sheet for Mac or Windows. Covers general, text editing, browser, file management, and screenshot shortcuts. Free printable PDF.",
  alternates: { canonical: "https://printablepolly.com/keyboard-shortcuts" },
};

export default function KeyboardShortcutsPage() {
  return <KeyboardShortcutsClient />;
}
