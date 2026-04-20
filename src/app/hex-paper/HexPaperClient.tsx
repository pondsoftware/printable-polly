"use client";

import { useState, useRef, useEffect } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "What is hexagonal graph paper used for in chemistry?", answer: "Hexagonal paper is ideal for drawing organic chemistry structures. The 120-degree angles of hexagons match the bond angles in benzene rings and other cyclic molecules, making it easy to sketch accurate molecular structures." },
  { question: "How do I use hex paper for RPG maps?", answer: "Hexagonal grids are the standard for tabletop RPG overland maps. Each hex represents a fixed distance (e.g., 6 miles), and the six-sided shape allows more natural movement in all directions compared to square grids. Fill in terrain types, towns, and encounters per hex." },
  { question: "What hex size should I choose for design work?", answer: "Small (10px) hexes create a fine grid ideal for detailed technical work and tessellation patterns. Medium (15px) is versatile for general design and sketching. Large (20px) provides roomy cells perfect for RPG maps, game boards, and bold pattern work." },
];

const HEX_SIZES: Record<string, number> = {
  small: 10,
  medium: 15,
  large: 20,
};

const LINE_WEIGHTS: Record<string, number> = {
  thin: 0.5,
  medium: 1,
  thick: 1.5,
};

function drawHexGrid(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  size: number,
  lineColor: string,
  lineWeight: number
) {
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWeight;

  const hexWidth = size * 2;
  const hexHeight = Math.sqrt(3) * size;
  const horizSpacing = hexWidth * 0.75;
  const vertSpacing = hexHeight;

  const cols = Math.ceil(canvasWidth / horizSpacing) + 2;
  const rows = Math.ceil(canvasHeight / vertSpacing) + 2;

  for (let col = -1; col < cols; col++) {
    for (let row = -1; row < rows; row++) {
      const cx = col * horizSpacing;
      const cy = row * vertSpacing + (col % 2 === 1 ? vertSpacing / 2 : 0);

      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 180) * (60 * i);
        const hx = cx + size * Math.cos(angle);
        const hy = cy + size * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(hx, hy);
        } else {
          ctx.lineTo(hx, hy);
        }
      }
      ctx.closePath();
      ctx.stroke();
    }
  }
}

export default function HexPaperClient() {
  const [hexSize, setHexSize] = useState<string>("medium");
  const [lineColor, setLineColor] = useState("#b0b0b0");
  const [lineWeight, setLineWeight] = useState<string>("thin");
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

    const size = HEX_SIZES[hexSize] || 15;
    const weight = LINE_WEIGHTS[lineWeight] || 0.5;

    drawHexGrid(ctx, width, height, size, lineColor, weight);
  }, [hexSize, lineColor, lineWeight, orientation, width, height]);

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
      { "@type": "ListItem", position: 2, name: "Hex Paper", item: "https://printablepolly.com/hex-paper" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Hexagonal Paper Generator</h1>
      <p className="text-gray-600 mb-6">Create printable hexagonal grid paper with adjustable hex size, line color, and line weight. Ideal for organic chemistry, RPG maps, game boards, and tessellation design.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hex Size</label>
            <select value={hexSize} onChange={(e) => setHexSize(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="small">Small (10px)</option>
              <option value="medium">Medium (15px)</option>
              <option value="large">Large (20px)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Line Color</label>
            <input type="color" value={lineColor} onChange={(e) => setLineColor(e.target.value)} className="w-full h-10 border border-gray-300 rounded cursor-pointer" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Line Weight</label>
            <select value={lineWeight} onChange={(e) => setLineWeight(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="thin">Thin (0.5px)</option>
              <option value="medium">Medium (1px)</option>
              <option value="thick">Thick (1.5px)</option>
            </select>
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="hex-paper" />
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
