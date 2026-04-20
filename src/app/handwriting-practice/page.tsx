"use client";

import { useState, useRef, useEffect } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "What line style is best for handwriting practice?", answer: "Dashed midlines help beginners learn letter proportions. Solid lines are better for intermediate writers who already know letter sizing." },
  { question: "What letter size should I use for children?", answer: "Start with large (1 inch) lines for kindergarteners learning to write. As fine motor skills develop, move to medium (3/4 inch) and then standard (1/2 inch) lines." },
  { question: "Should I include guide lines?", answer: "Yes! Guide lines (dashed midlines and descender lines) help children and adults form letters with consistent sizing and spacing." },
];

export default function HandwritingPractice() {
  const [lineHeight, setLineHeight] = useState(48);
  const [lineStyle, setLineStyle] = useState<"solid" | "dashed">("dashed");
  const [showGuideLines, setShowGuideLines] = useState(true);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = getDimensions(orientation);

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

    const marginLeft = 60;
    const marginRight = width - 40;
    const startY = 60;

    for (let y = startY; y < height - 40; y += lineHeight) {
      // Top line (solid)
      ctx.strokeStyle = "#333333";
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(marginLeft, y);
      ctx.lineTo(marginRight, y);
      ctx.stroke();

      if (showGuideLines) {
        // Midline (dashed or solid)
        ctx.strokeStyle = "#aaaaaa";
        ctx.lineWidth = 0.5;
        if (lineStyle === "dashed") {
          ctx.setLineDash([4, 4]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.beginPath();
        ctx.moveTo(marginLeft, y + lineHeight / 2);
        ctx.lineTo(marginRight, y + lineHeight / 2);
        ctx.stroke();
      }

      // Bottom line (solid)
      ctx.strokeStyle = "#333333";
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(marginLeft, y + lineHeight);
      ctx.lineTo(marginRight, y + lineHeight);
      ctx.stroke();

      // Descender area (lighter line below)
      if (showGuideLines && y + lineHeight + lineHeight * 0.4 < height - 40) {
        ctx.strokeStyle = "#cccccc";
        ctx.lineWidth = 0.5;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(marginLeft, y + lineHeight + lineHeight * 0.4);
        ctx.lineTo(marginRight, y + lineHeight + lineHeight * 0.4);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Add extra space after descender area
      if (showGuideLines) {
        y += lineHeight * 0.4;
      }
    }

    // Left margin line
    ctx.strokeStyle = "#ff9999";
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(marginLeft, 0);
    ctx.lineTo(marginLeft, height);
    ctx.stroke();
  }, [lineHeight, lineStyle, showGuideLines, orientation, width, height]);

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
      { "@type": "ListItem", position: 2, name: "Handwriting Practice", item: "https://printablepolly.com/handwriting-practice" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Handwriting Practice Sheets</h1>
      <p className="text-gray-600 mb-6">Generate printable handwriting practice sheets with adjustable line height, dotted or solid guide lines, and descender guides.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Line Height</label>
            <select value={lineHeight} onChange={(e) => setLineHeight(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="96">Large (1 inch)</option>
              <option value="72">Medium (3/4 inch)</option>
              <option value="48">Standard (1/2 inch)</option>
              <option value="36">Small (3/8 inch)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Midline Style</label>
            <select value={lineStyle} onChange={(e) => setLineStyle(e.target.value as "solid" | "dashed")} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="dashed">Dashed</option>
              <option value="solid">Solid</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={showGuideLines} onChange={(e) => setShowGuideLines(e.target.checked)} className="rounded" />
              Show Guide Lines
            </label>
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="handwriting-practice" />
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
