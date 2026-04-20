"use client";

import Link from "next/link";

import { useState, useRef, useEffect } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "What is dot grid paper used for?", answer: "Dot grid paper is popular for bullet journaling, sketching, hand lettering, and note-taking. The dots provide subtle guidance without the visual clutter of full grid lines." },
  { question: "What dot spacing should I use?", answer: "5mm spacing is the most common for bullet journals. Use 3mm for detailed work or 7mm for larger writing and sketches." },
  { question: "What dot size is best?", answer: "1px dots are subtle and won't interfere with your writing. Use 1.5-2px if you want the dots more visible as guides." },
];

export default function DotGridClient() {
  const [dotSpacing, setDotSpacing] = useState(20);
  const [dotSize, setDotSize] = useState(1);
  const [dotColor, setDotColor] = useState("#cccccc");
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

    ctx.fillStyle = dotColor;
    for (let x = dotSpacing; x < width; x += dotSpacing) {
      for (let y = dotSpacing; y < height; y += dotSpacing) {
        ctx.beginPath();
        ctx.arc(x, y, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [dotSpacing, dotSize, dotColor, orientation, width, height]);

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
      { "@type": "ListItem", position: 2, name: "Dot Grid Paper", item: "https://printablepolly.com/dot-grid" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Dot Grid Paper Generator</h1>
      <p className="text-gray-600 mb-6">Create custom dot grid paper for bullet journaling, sketching, and note-taking. Adjust dot spacing, size, and color.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dot Spacing ({dotSpacing}px)</label>
            <input type="range" min="10" max="40" step="2" value={dotSpacing} onChange={(e) => setDotSpacing(parseInt(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dot Size ({dotSize}px)</label>
            <input type="range" min="0.5" max="3" step="0.5" value={dotSize} onChange={(e) => setDotSize(parseFloat(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dot Color</label>
            <input type="color" value={dotColor} onChange={(e) => setDotColor(e.target.value)} className="w-full h-10 border border-gray-300 rounded cursor-pointer" />
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="dot-grid" />
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
            <Link key="/lined-paper" href="/lined-paper" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">📝</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Lined Paper</h3>
            </Link>
            <Link key="/hex-paper" href="/hex-paper" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">⬡</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Hex Paper</h3>
            </Link>
            <Link key="/cornell-notes" href="/cornell-notes" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">🎓</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Cornell Notes</h3>
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
