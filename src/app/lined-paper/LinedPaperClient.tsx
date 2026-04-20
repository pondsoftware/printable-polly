"use client";

import { useState, useRef, useEffect } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "What is the difference between college ruled and wide ruled paper?", answer: "College ruled paper has lines spaced 9/32\" (7.1mm) apart, while wide ruled paper has lines spaced 11/32\" (8.7mm) apart. Narrow ruled is even tighter at 1/4\" (6.35mm)." },
  { question: "Should I include a margin on my lined paper?", answer: "A left margin is standard for most school and professional use. It provides space for hole-punching and helps keep writing aligned." },
  { question: "What line color is best for lined paper?", answer: "Light blue (#a0d0ff) is the traditional choice as it's visible enough to guide writing but subtle enough to not distract from the content." },
];

export default function LinedPaperClient() {
  const [spacing, setSpacing] = useState<string>("college");
  const [showMargin, setShowMargin] = useState(true);
  const [lineColor, setLineColor] = useState("#a0d0ff");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = getDimensions(orientation);

  const spacingPixels: Record<string, number> = {
    college: 29,
    wide: 35,
    narrow: 24,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = 2;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    const lineSpacing = spacingPixels[spacing] || 29;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 0.5;

    const startY = 80;
    for (let y = startY; y < height - 40; y += lineSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    if (showMargin) {
      ctx.strokeStyle = "#ff9999";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(96, 0);
      ctx.lineTo(96, height);
      ctx.stroke();
    }
  }, [spacing, showMargin, lineColor, orientation, width, height]);

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
      { "@type": "ListItem", position: 2, name: "Lined Paper", item: "https://printablepolly.com/lined-paper" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Lined Paper Generator</h1>
      <p className="text-gray-600 mb-6">Create custom ruled paper with college, wide, or narrow line spacing. Add or remove margins and choose your line color.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Line Spacing</label>
            <select value={spacing} onChange={(e) => setSpacing(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="college">College Ruled</option>
              <option value="wide">Wide Ruled</option>
              <option value="narrow">Narrow Ruled</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={showMargin} onChange={(e) => setShowMargin(e.target.checked)} className="rounded" />
              Show Margin
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Line Color</label>
            <input type="color" value={lineColor} onChange={(e) => setLineColor(e.target.value)} className="w-full h-10 border border-gray-300 rounded cursor-pointer" />
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="lined-paper" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm inline-block">
            <canvas ref={canvasRef} />
          </div>
        </div>
      </div>

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
