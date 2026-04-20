"use client";

import Link from "next/link";

import { useState, useRef, useEffect } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "What is isometric paper used for?", answer: "Isometric paper uses a triangular grid to help draw 3D objects, architectural designs, and engineering diagrams without needing perspective calculations." },
  { question: "What grid size should I use for isometric paper?", answer: "1cm (about 38px) is standard for most technical drawing. Smaller grids (24px) work for detailed work, while larger grids (48px) are better for rough sketches." },
  { question: "How is isometric paper different from graph paper?", answer: "Graph paper uses a square grid with perpendicular lines. Isometric paper uses equilateral triangles arranged at 60-degree angles, creating a grid suited for 3D representations." },
];

export default function IsometricPaperClient() {
  const [gridSize, setGridSize] = useState(30);
  const [lineColor, setLineColor] = useState("#c0c0c0");
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

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 0.5;

    const h = gridSize * Math.sin(Math.PI / 3);

    // Draw vertical lines
    for (let x = 0; x < width + gridSize; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Draw lines going down-right (60 degrees)
    for (let startY = -height; startY < height * 2; startY += h) {
      ctx.beginPath();
      ctx.moveTo(0, startY);
      ctx.lineTo(width, startY + width * Math.tan(Math.PI / 6));
      ctx.stroke();
    }

    // Draw lines going down-left (-60 degrees)
    for (let startY = -height; startY < height * 2; startY += h) {
      ctx.beginPath();
      ctx.moveTo(0, startY);
      ctx.lineTo(width, startY - width * Math.tan(Math.PI / 6));
      ctx.stroke();
    }
  }, [gridSize, lineColor, orientation, width, height]);

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
      { "@type": "ListItem", position: 2, name: "Isometric Paper", item: "https://printablepolly.com/isometric-paper" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Isometric Paper Generator</h1>
      <p className="text-gray-600 mb-6">Create isometric/triangle grid paper for 3D drawing, architecture, and engineering. Customize grid size and line color.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Grid Size ({gridSize}px)</label>
            <input type="range" min="15" max="60" step="5" value={gridSize} onChange={(e) => setGridSize(parseInt(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Line Color</label>
            <input type="color" value={lineColor} onChange={(e) => setLineColor(e.target.value)} className="w-full h-10 border border-gray-300 rounded cursor-pointer" />
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="isometric-paper" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm inline-block">
            <canvas ref={canvasRef} />
          </div>
        </div>
      </div>

      {/* Related Templates */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Templates</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link key="/graph-paper" href="/graph-paper" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">📐</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Graph Paper</h3>
            </Link>
            <Link key="/hex-paper" href="/hex-paper" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">⬡</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Hex Paper</h3>
            </Link>
            <Link key="/dot-grid" href="/dot-grid" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">⊡</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Dot Grid Paper</h3>
            </Link>
            <Link key="/geometry-worksheets" href="/geometry-worksheets" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
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
