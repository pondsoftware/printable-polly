"use client";

import { useState, useRef, useEffect } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "What is a number line used for?", answer: "Number lines help visualize addition, subtraction, counting, fractions, and number relationships. They are a fundamental math tool for students learning arithmetic." },
  { question: "Should I use labeled or blank number lines?", answer: "Labeled number lines work as reference tools. Blank number lines are better for practice — students fill in the numbers themselves, building number sense." },
  { question: "What range should a number line cover?", answer: "For young learners, 0-10 or 0-20. For addition/subtraction practice, 0-100. For negative numbers, use -10 to 10. Adjust the start, end, and interval to match your lesson." },
];

export default function NumberLine() {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(20);
  const [interval, setInterval] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
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

    const marginX = 60;
    const lineWidth = width - marginX * 2;
    const numTicks = Math.floor((end - start) / interval) + 1;
    const tickSpacing = lineWidth / (numTicks - 1);

    // Draw multiple number lines down the page
    const linesPerPage = Math.min(12, Math.max(4, Math.floor(900 / 80)));
    const lineSpacingY = 900 / linesPerPage;
    const startY = 80;

    for (let line = 0; line < linesPerPage; line++) {
      const y = startY + line * lineSpacingY;

      // Main line
      ctx.strokeStyle = "#333333";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(marginX, y);
      ctx.lineTo(width - marginX, y);
      ctx.stroke();

      // Arrow tips
      ctx.beginPath();
      ctx.moveTo(marginX - 10, y);
      ctx.lineTo(marginX + 5, y - 5);
      ctx.lineTo(marginX + 5, y + 5);
      ctx.closePath();
      ctx.fillStyle = "#333333";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(width - marginX + 10, y);
      ctx.lineTo(width - marginX - 5, y - 5);
      ctx.lineTo(width - marginX - 5, y + 5);
      ctx.closePath();
      ctx.fill();

      // Tick marks and labels
      for (let i = 0; i < numTicks; i++) {
        const x = marginX + i * tickSpacing;
        const value = start + i * interval;

        ctx.strokeStyle = "#333333";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x, y - 10);
        ctx.lineTo(x, y + 10);
        ctx.stroke();

        if (showLabels) {
          ctx.fillStyle = "#333333";
          ctx.font = "12px Arial";
          ctx.textAlign = "center";
          ctx.fillText(value.toString(), x, y + 25);
        }
      }
    }
  }, [start, end, interval, showLabels, orientation, width, height]);

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
      { "@type": "ListItem", position: 2, name: "Number Line", item: "https://printablepolly.com/number-line" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Number Line Generator</h1>
      <p className="text-gray-600 mb-6">Generate printable number lines with customizable start, end, and interval. Choose labeled or blank for practice.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start</label>
            <input type="number" value={start} onChange={(e) => setStart(parseInt(e.target.value) || 0)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End</label>
            <input type="number" value={end} onChange={(e) => setEnd(parseInt(e.target.value) || 20)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interval</label>
            <select value={interval} onChange={(e) => setInterval(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={showLabels} onChange={(e) => setShowLabels(e.target.checked)} className="rounded" />
              Show Labels
            </label>
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="number-line" />
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
