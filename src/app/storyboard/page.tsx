import { Metadata } from "next";
import StoryboardClient from "./StoryboardClient";

export const metadata: Metadata = {
  title: "Free Printable Storyboard Templates - PDF Generator | Printable Polly",
  description:
    "Print storyboard panels with space for drawing and notes. Ideal for planning films, animations, videos, and creative projects. Customizable and free.",
  alternates: { canonical: "https://printablepolly.com/storyboard" },
};

export default function StoryboardPage() {
  return <StoryboardClient />;
}
