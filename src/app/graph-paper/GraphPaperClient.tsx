"use client";

import { useState, useRef, useEffect } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "What grid size should I use for graph paper?", answer: "1/4 inch (0.25\") is the most common for math and science. 1/2 inch works well for younger students, and 1cm is standard for metric measurements." },
  { question: "Can I print graph paper on A4?", answer: "Yes! The graph paper scales to fit any paper size. Select 'Save as PDF' or print directly — your browser will adjust to your paper settings." },
  { question: "What line weight is best for graph paper?", answer: "0.5px gives a subtle grid that won't interfere with your writing. Use 1px for more visible lines, especially for engineering or architectural work." },
];

export default function GraphPaperClient() {
  const [gridSize, setGridSize] = useState<string>("0.25in");
  const [lineColor, setLineColor] = useState("#a0d0ff");
  const [lineWeight, setLineWeight] = useState(0.5);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = getDimensions(orientation);

  const gridSizePixels: Record<string, number> = {
    "0.25in": 24,
    "0.5in": 48,
    "1cm": 38,
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

    const spacing = gridSizePixels[gridSize] || 24;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWeight;

    for (let x = spacing; x < width; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = spacing; y < height; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }, [gridSize, lineColor, lineWeight, orientation, width, height]);

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
      { "@type": "ListItem", position: 2, name: "Graph Paper", item: "https://printablepolly.com/graph-paper" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Graph Paper Generator</h1>
      <p className="text-gray-600 mb-6">Create custom graph paper with adjustable grid size, line color, and line weight. Perfect for math, science, engineering, and sketching.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Grid Size</label>
            <select value={gridSize} onChange={(e) => setGridSize(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="0.25in">1/4 inch</option>
              <option value="0.5in">1/2 inch</option>
              <option value="1cm">1 cm</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Line Color</label>
            <input type="color" value={lineColor} onChange={(e) => setLineColor(e.target.value)} className="w-full h-10 border border-gray-300 rounded cursor-pointer" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Line Weight ({lineWeight}px)</label>
            <input type="range" min="0.25" max="2" step="0.25" value={lineWeight} onChange={(e) => setLineWeight(parseFloat(e.target.value))} className="w-full" />
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="graph-paper" />
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
