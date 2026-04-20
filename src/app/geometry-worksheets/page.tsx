import { Metadata } from "next";
import GeometryWorksheetsClient from "./GeometryWorksheetsClient";

export const metadata: Metadata = {
  title: "Free Printable Geometry Worksheets - PDF Generator | Printable Polly",
  description:
    "Generate free printable geometry worksheets with labeled shape diagrams. Practice perimeter, area, volume, and surface area with answer keys.",
  alternates: { canonical: "https://printablepolly.com/geometry-worksheets" },
};

export default function GeometryWorksheetsPage() {
  return <GeometryWorksheetsClient />;
}
