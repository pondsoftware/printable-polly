import { Metadata } from "next";
import MathFormulasClient from "./MathFormulasClient";

export const metadata: Metadata = {
  title: "Free Printable Math Formulas Cheat Sheet - Algebra, Geometry, Trig | Printable Polly",
  description:
    "Print a comprehensive math formulas cheat sheet covering algebra, geometry, trigonometry, and statistics. Customizable sections. Free printable PDF.",
  alternates: { canonical: "https://printablepolly.com/math-formulas" },
};

export default function MathFormulasPage() {
  return <MathFormulasClient />;
}
