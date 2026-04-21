"use client";

import Link from "next/link";
import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "What math formulas should I memorize?", answer: "Focus on the quadratic formula, Pythagorean theorem, area/volume formulas for common shapes, and basic trig ratios (SOH-CAH-TOA). These cover most high school and college math needs." },
  { question: "What grade level is this cheat sheet for?", answer: "This cheat sheet covers formulas from pre-algebra through pre-calculus, making it useful for students in grades 7-12 and college-level math courses." },
  { question: "Can I use this cheat sheet on tests?", answer: "Check with your instructor. Many teachers allow formula sheets on exams. This printable is designed to be a comprehensive reference for studying and open-note tests." },
];

type Section = "algebra" | "geometry" | "trigonometry" | "statistics";

export default function MathFormulasClient() {
  const [sections, setSections] = useState<Record<Section, boolean>>({
    algebra: true,
    geometry: true,
    trigonometry: true,
    statistics: true,
  });
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const { width, height } = getDimensions(orientation);

  const toggleSection = (s: Section) => setSections((prev) => ({ ...prev, [s]: !prev[s] }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://printablepolly.com" },
      { "@type": "ListItem", position: 2, name: "Math Formulas", item: "https://printablepolly.com/math-formulas" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Math Formulas Cheat Sheet</h1>
      <p className="text-gray-600 mb-6">A comprehensive printable reference covering algebra, geometry, trigonometry, and statistics formulas. Select which sections to include.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sections</label>
            {(["algebra", "geometry", "trigonometry", "statistics"] as Section[]).map((s) => (
              <label key={s} className="flex items-center gap-2 mb-1 text-sm">
                <input type="checkbox" checked={sections[s]} onChange={() => toggleSection(s)} className="rounded border-gray-300 text-emerald-600" />
                <span className="capitalize">{s}</span>
              </label>
            ))}
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="math-formulas-cheat-sheet" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            <h2 className="text-xl font-bold text-center mb-1">Math Formulas Cheat Sheet</h2>
            <p className="text-[9px] text-center text-gray-400 mb-4">printablepolly.com</p>

            <div className="grid grid-cols-2 gap-4 text-[11px] leading-relaxed">
              {sections.algebra && (
                <div className="border border-emerald-200 rounded p-3">
                  <h3 className="font-bold text-emerald-700 text-sm mb-2 border-b border-emerald-100 pb-1">Algebra</h3>
                  <div className="space-y-1.5">
                    <div><span className="font-semibold">Slope:</span> m = (y&#8322; - y&#8321;) / (x&#8322; - x&#8321;)</div>
                    <div><span className="font-semibold">Slope-Intercept:</span> y = mx + b</div>
                    <div><span className="font-semibold">Point-Slope:</span> y - y&#8321; = m(x - x&#8321;)</div>
                    <div><span className="font-semibold">Standard Form:</span> Ax + By = C</div>
                    <div><span className="font-semibold">Quadratic Formula:</span> x = (-b &#177; &#8730;(b&#178; - 4ac)) / 2a</div>
                    <div><span className="font-semibold">Discriminant:</span> D = b&#178; - 4ac</div>
                    <div><span className="font-semibold">Distance:</span> d = &#8730;((x&#8322;-x&#8321;)&#178; + (y&#8322;-y&#8321;)&#178;)</div>
                    <div><span className="font-semibold">Midpoint:</span> ((x&#8321;+x&#8322;)/2, (y&#8321;+y&#8322;)/2)</div>
                    <div><span className="font-semibold">Difference of Squares:</span> a&#178; - b&#178; = (a+b)(a-b)</div>
                    <div><span className="font-semibold">Perfect Square:</span> (a+b)&#178; = a&#178; + 2ab + b&#178;</div>
                    <div><span className="font-semibold">Exponent Rules:</span> a&#7504; &#183; a&#8319; = a&#7504;&#8314;&#8319;, (a&#7504;)&#8319; = a&#7504;&#8319;</div>
                    <div><span className="font-semibold">Log Rules:</span> log(ab) = log a + log b</div>
                  </div>
                </div>
              )}

              {sections.geometry && (
                <div className="border border-emerald-200 rounded p-3">
                  <h3 className="font-bold text-emerald-700 text-sm mb-2 border-b border-emerald-100 pb-1">Geometry</h3>
                  <div className="space-y-1.5">
                    <div className="font-semibold text-gray-700 mt-1">2D Shapes</div>
                    <div><span className="font-semibold">Rectangle:</span> A = lw, P = 2l + 2w</div>
                    <div><span className="font-semibold">Square:</span> A = s&#178;, P = 4s</div>
                    <div><span className="font-semibold">Triangle:</span> A = &#189;bh, P = a + b + c</div>
                    <div><span className="font-semibold">Circle:</span> A = &#960;r&#178;, C = 2&#960;r</div>
                    <div><span className="font-semibold">Trapezoid:</span> A = &#189;(b&#8321; + b&#8322;)h</div>
                    <div><span className="font-semibold">Parallelogram:</span> A = bh</div>
                    <div className="font-semibold text-gray-700 mt-2">3D Shapes</div>
                    <div><span className="font-semibold">Rectangular Prism:</span> V = lwh, SA = 2(lw+lh+wh)</div>
                    <div><span className="font-semibold">Cylinder:</span> V = &#960;r&#178;h, SA = 2&#960;rh + 2&#960;r&#178;</div>
                    <div><span className="font-semibold">Sphere:</span> V = (4/3)&#960;r&#179;, SA = 4&#960;r&#178;</div>
                    <div><span className="font-semibold">Cone:</span> V = (1/3)&#960;r&#178;h</div>
                    <div><span className="font-semibold">Pythagorean:</span> a&#178; + b&#178; = c&#178;</div>
                  </div>
                </div>
              )}

              {sections.trigonometry && (
                <div className="border border-emerald-200 rounded p-3">
                  <h3 className="font-bold text-emerald-700 text-sm mb-2 border-b border-emerald-100 pb-1">Trigonometry</h3>
                  <div className="space-y-1.5">
                    <div className="font-semibold text-gray-700">SOH-CAH-TOA</div>
                    <div><span className="font-semibold">sin &#952;</span> = opposite / hypotenuse</div>
                    <div><span className="font-semibold">cos &#952;</span> = adjacent / hypotenuse</div>
                    <div><span className="font-semibold">tan &#952;</span> = opposite / adjacent</div>
                    <div className="font-semibold text-gray-700 mt-2">Key Values</div>
                    <div>sin 0&#176;=0, sin 30&#176;=&#189;, sin 45&#176;=&#8730;2/2, sin 60&#176;=&#8730;3/2, sin 90&#176;=1</div>
                    <div>cos 0&#176;=1, cos 30&#176;=&#8730;3/2, cos 45&#176;=&#8730;2/2, cos 60&#176;=&#189;, cos 90&#176;=0</div>
                    <div className="font-semibold text-gray-700 mt-2">Identities</div>
                    <div>sin&#178;&#952; + cos&#178;&#952; = 1</div>
                    <div>tan &#952; = sin &#952; / cos &#952;</div>
                    <div>sin(2&#952;) = 2 sin &#952; cos &#952;</div>
                    <div>cos(2&#952;) = cos&#178;&#952; - sin&#178;&#952;</div>
                    <div className="font-semibold text-gray-700 mt-2">Law of Sines / Cosines</div>
                    <div>a/sin A = b/sin B = c/sin C</div>
                    <div>c&#178; = a&#178; + b&#178; - 2ab cos C</div>
                  </div>
                </div>
              )}

              {sections.statistics && (
                <div className="border border-emerald-200 rounded p-3">
                  <h3 className="font-bold text-emerald-700 text-sm mb-2 border-b border-emerald-100 pb-1">Statistics</h3>
                  <div className="space-y-1.5">
                    <div><span className="font-semibold">Mean:</span> x&#772; = &#931;x / n</div>
                    <div><span className="font-semibold">Median:</span> Middle value when data is ordered</div>
                    <div><span className="font-semibold">Mode:</span> Most frequently occurring value</div>
                    <div><span className="font-semibold">Range:</span> max - min</div>
                    <div><span className="font-semibold">Variance:</span> &#963;&#178; = &#931;(x - x&#772;)&#178; / n</div>
                    <div><span className="font-semibold">Std Dev:</span> &#963; = &#8730;(&#931;(x - x&#772;)&#178; / n)</div>
                    <div><span className="font-semibold">Sample Std Dev:</span> s = &#8730;(&#931;(x - x&#772;)&#178; / (n-1))</div>
                    <div className="font-semibold text-gray-700 mt-2">Probability</div>
                    <div><span className="font-semibold">P(A or B):</span> P(A) + P(B) - P(A&#8745;B)</div>
                    <div><span className="font-semibold">P(A and B):</span> P(A) &#183; P(B|A)</div>
                    <div><span className="font-semibold">Combinations:</span> C(n,r) = n! / (r!(n-r)!)</div>
                    <div><span className="font-semibold">Permutations:</span> P(n,r) = n! / (n-r)!</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Templates */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Templates</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href="/periodic-table" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">⚛️</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Periodic Table</h3>
          </Link>
          <Link href="/unit-conversions" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">📏</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Unit Conversions</h3>
          </Link>
          <Link href="/algebra-worksheets" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">𝑥</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Algebra Worksheets</h3>
          </Link>
          <Link href="/geometry-worksheets" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">△</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Geometry Worksheets</h3>
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{faq.question}</h3>
              <p className="text-gray-600 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
