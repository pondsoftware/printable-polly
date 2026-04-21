import { Metadata } from "next";
import MathFormulasClient from "./MathFormulasClient";

export const metadata: Metadata = {
  title: "Free Printable Math Formulas Cheat Sheet - Algebra, Geometry, Trig | Printable Polly",
  description:
    "Print a comprehensive math formulas cheat sheet covering algebra, geometry, trigonometry, and statistics. Customizable sections. Free printable PDF.",
  alternates: { canonical: "https://printablepolly.com/math-formulas" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Math Formulas Cheat Sheet",
  description: "Print a comprehensive math formulas cheat sheet covering algebra, geometry, trigonometry, and statistics. Customizable sections. Free printable PDF.",
  url: "https://printablepolly.com/math-formulas",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function MathFormulasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <MathFormulasClient />
    </>
  );
}
