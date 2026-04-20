"use client";

import { useState, useRef, useEffect } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "What is staff paper used for?", answer: "Staff paper (also called manuscript paper) is used by musicians, composers, and music students to write musical notation by hand. Each staff consists of 5 horizontal lines where notes, rests, and other symbols are placed." },
  { question: "How many staves should I use per page?", answer: "For standard sheet music, 10-12 staves per page is typical. Use 6-8 staves if you need extra room for lyrics, annotations, or larger notation. Fewer staves also work well for beginners and young students." },
  { question: "What is the difference between treble and bass clef?", answer: "The treble clef (G clef) is used for higher-pitched instruments and the right hand of piano. The bass clef (F clef) is used for lower-pitched instruments and the left hand of piano. Choose 'none' for blank staves you can mark yourself." },
];

function drawTrebleClef(ctx: CanvasRenderingContext2D, x: number, staffTop: number, staffSpacing: number) {
  const lineGap = staffSpacing / 4;
  const centerY = staffTop + 2 * lineGap;
  const scale = lineGap / 5;

  ctx.save();
  ctx.translate(x, centerY);
  ctx.scale(scale, scale);
  ctx.strokeStyle = "#333333";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  // Main S-curve of treble clef
  ctx.moveTo(2, 10);
  ctx.bezierCurveTo(-4, 4, -4, -6, 2, -10);
  ctx.bezierCurveTo(8, -14, 12, -10, 10, -4);
  ctx.bezierCurveTo(8, 0, 2, 4, -2, 6);
  // Upward stem
  ctx.bezierCurveTo(-2, 6, 0, -8, 2, -20);
  ctx.bezierCurveTo(3, -26, 2, -30, 0, -28);
  // Downward hook
  ctx.bezierCurveTo(-2, -26, -3, -22, 0, -16);
  ctx.bezierCurveTo(2, -12, 2, 6, 0, 14);
  ctx.bezierCurveTo(-1, 18, -4, 20, -4, 18);
  ctx.bezierCurveTo(-4, 16, -2, 14, 0, 14);
  ctx.stroke();
  ctx.restore();
}

function drawBassClef(ctx: CanvasRenderingContext2D, x: number, staffTop: number, staffSpacing: number) {
  const lineGap = staffSpacing / 4;
  const scale = lineGap / 5;

  ctx.save();
  ctx.translate(x, staffTop + lineGap);
  ctx.scale(scale, scale);
  ctx.strokeStyle = "#333333";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Main curve
  ctx.beginPath();
  ctx.arc(0, 0, 5, Math.PI * 0.5, Math.PI * 2.2);
  ctx.stroke();

  // Tail going down
  ctx.beginPath();
  ctx.moveTo(4.5, -2);
  ctx.bezierCurveTo(8, -4, 10, 2, 6, 8);
  ctx.bezierCurveTo(3, 12, -2, 14, -6, 14);
  ctx.stroke();

  // Two dots
  ctx.fillStyle = "#333333";
  ctx.beginPath();
  ctx.arc(8, -3, 1.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(8, 3, 1.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export default function StaffPaper() {
  const [stavesPerPage, setStavesPerPage] = useState<number>(10);
  const [staffSpacing, setStaffSpacing] = useState<number>(40);
  const [clefType, setClefType] = useState<string>("none");
  const [lineColor, setLineColor] = useState("#333333");
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

    const margin = 60;
    const lineGap = staffSpacing / 4;
    const totalStaffHeight = stavesPerPage * staffSpacing;
    const availableHeight = height - 2 * margin;
    const gapBetweenStaves = stavesPerPage > 1
      ? (availableHeight - totalStaffHeight) / (stavesPerPage - 1)
      : 0;

    const clefOffset = clefType === "none" ? 0 : 30;

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1;

    for (let s = 0; s < stavesPerPage; s++) {
      const staffTop = margin + s * (staffSpacing + gapBetweenStaves);

      // Draw 5 lines per staff
      for (let line = 0; line < 5; line++) {
        const y = staffTop + line * lineGap;
        ctx.beginPath();
        ctx.moveTo(margin + clefOffset, y);
        ctx.lineTo(width - margin, y);
        ctx.stroke();
      }

      // Draw left barline
      ctx.beginPath();
      ctx.moveTo(margin + clefOffset, staffTop);
      ctx.lineTo(margin + clefOffset, staffTop + 4 * lineGap);
      ctx.stroke();

      // Draw clef
      if (clefType === "treble") {
        drawTrebleClef(ctx, margin + clefOffset + 16, staffTop, staffSpacing);
      } else if (clefType === "bass") {
        drawBassClef(ctx, margin + clefOffset + 14, staffTop, staffSpacing);
      }
    }
  }, [stavesPerPage, staffSpacing, clefType, lineColor, orientation, width, height]);

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
      { "@type": "ListItem", position: 2, name: "Staff Paper", item: "https://printablepolly.com/staff-paper" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Staff Paper Generator</h1>
      <p className="text-gray-600 mb-6">Create blank sheet music manuscript paper with customizable staves, clef symbols, and line colors. Perfect for composition, music theory, and practice.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Staves Per Page</label>
            <select value={stavesPerPage} onChange={(e) => setStavesPerPage(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value={6}>6 staves</option>
              <option value={8}>8 staves</option>
              <option value={10}>10 staves</option>
              <option value={12}>12 staves</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Staff Spacing ({staffSpacing}px)</label>
            <input type="range" min="28" max="56" step="4" value={staffSpacing} onChange={(e) => setStaffSpacing(parseInt(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Clef</label>
            <select value={clefType} onChange={(e) => setClefType(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="none">None</option>
              <option value="treble">Treble Clef</option>
              <option value="bass">Bass Clef</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Line Color</label>
            <input type="color" value={lineColor} onChange={(e) => setLineColor(e.target.value)} className="w-full h-10 border border-gray-300 rounded cursor-pointer" />
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="staff-paper" />
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
