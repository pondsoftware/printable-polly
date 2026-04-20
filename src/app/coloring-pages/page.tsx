"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

type PatternType = "mandala" | "mosaic" | "kaleidoscope" | "tessellation";
type Complexity = "simple" | "medium" | "complex";
type LineThickness = "thin" | "medium" | "thick";

const faqs = [
  { question: "What are geometric coloring pages good for?", answer: "Geometric coloring pages are great for relaxation, stress relief, and mindfulness. The repetitive patterns encourage focus and creativity. They're popular with both kids and adults as a calming, screen-free activity." },
  { question: "What coloring tools work best for these patterns?", answer: "Colored pencils and fine-tip markers work best for detailed geometric patterns. For simpler designs, crayons and broad markers are great. Gel pens add a nice effect on intricate mandalas and kaleidoscopes." },
  { question: "Can I generate different patterns each time?", answer: "Yes! Click the 'Generate New' button to create a completely new randomized pattern. Each pattern type — Mandala, Mosaic, Kaleidoscope, and Tessellation — produces unique results every time." },
];

const lineWidths: Record<LineThickness, number> = {
  thin: 1,
  medium: 2,
  thick: 3,
};

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function drawMandala(ctx: CanvasRenderingContext2D, w: number, h: number, complexity: Complexity, lw: number, seed: number) {
  const rand = seededRandom(seed);
  const cx = w / 2;
  const cy = h / 2;
  const maxR = Math.min(w, h) * 0.45;
  const rings = complexity === "simple" ? 4 : complexity === "medium" ? 6 : 9;
  const basePetals = complexity === "simple" ? 6 : complexity === "medium" ? 10 : 16;

  ctx.strokeStyle = "#000000";
  ctx.lineWidth = lw;

  for (let ring = 1; ring <= rings; ring++) {
    const r = (maxR / rings) * ring;
    const petals = basePetals + Math.floor(rand() * 4) * 2;
    const innerR = (maxR / rings) * (ring - 1) + 5;

    // Draw the ring circle
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    // Draw petals/segments within this ring
    const angleStep = (Math.PI * 2) / petals;
    const patternChoice = Math.floor(rand() * 3);

    for (let i = 0; i < petals; i++) {
      const angle = angleStep * i;
      const nextAngle = angleStep * (i + 1);
      const midAngle = angle + angleStep / 2;

      if (patternChoice === 0) {
        // Petal shapes
        const petalTip = innerR + (r - innerR) * 0.85;
        const petalWidth = angleStep * 0.3;
        ctx.beginPath();
        ctx.moveTo(cx + innerR * Math.cos(midAngle), cy + innerR * Math.sin(midAngle));
        ctx.quadraticCurveTo(
          cx + petalTip * Math.cos(midAngle - petalWidth),
          cy + petalTip * Math.sin(midAngle - petalWidth),
          cx + r * 0.95 * Math.cos(midAngle),
          cy + r * 0.95 * Math.sin(midAngle)
        );
        ctx.quadraticCurveTo(
          cx + petalTip * Math.cos(midAngle + petalWidth),
          cy + petalTip * Math.sin(midAngle + petalWidth),
          cx + innerR * Math.cos(midAngle),
          cy + innerR * Math.sin(midAngle)
        );
        ctx.stroke();
      } else if (patternChoice === 1) {
        // Radial lines with arcs
        ctx.beginPath();
        ctx.moveTo(cx + innerR * Math.cos(angle), cy + innerR * Math.sin(angle));
        ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
        ctx.stroke();

        // Small arc decoration in mid-ring
        const midR = (innerR + r) / 2;
        const arcSpan = angleStep * 0.4;
        ctx.beginPath();
        ctx.arc(cx, cy, midR, midAngle - arcSpan, midAngle + arcSpan);
        ctx.stroke();
      } else {
        // Diamond shapes
        const midR = (innerR + r) / 2;
        ctx.beginPath();
        ctx.moveTo(cx + innerR * Math.cos(midAngle), cy + innerR * Math.sin(midAngle));
        ctx.lineTo(cx + midR * Math.cos(angle + angleStep * 0.15), cy + midR * Math.sin(angle + angleStep * 0.15));
        ctx.lineTo(cx + r * 0.95 * Math.cos(midAngle), cy + r * 0.95 * Math.sin(midAngle));
        ctx.lineTo(cx + midR * Math.cos(nextAngle - angleStep * 0.15), cy + midR * Math.sin(nextAngle - angleStep * 0.15));
        ctx.closePath();
        ctx.stroke();
      }
    }
  }

  // Center circle decoration
  const centerR = maxR / rings * 0.8;
  ctx.beginPath();
  ctx.arc(cx, cy, centerR, 0, Math.PI * 2);
  ctx.stroke();
  const innerPetals = 6 + Math.floor(rand() * 4);
  for (let i = 0; i < innerPetals; i++) {
    const angle = (Math.PI * 2 / innerPetals) * i;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + centerR * 0.9 * Math.cos(angle), cy + centerR * 0.9 * Math.sin(angle));
    ctx.stroke();
  }
}

function drawMosaic(ctx: CanvasRenderingContext2D, w: number, h: number, complexity: Complexity, lw: number, seed: number) {
  const rand = seededRandom(seed);
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = lw;

  const margin = 30;
  const cols = complexity === "simple" ? 5 : complexity === "medium" ? 8 : 12;
  const rows = Math.round(cols * (h / w));
  const cellW = (w - margin * 2) / cols;
  const cellH = (h - margin * 2) / rows;

  // Generate jittered grid points
  const points: [number, number][] = [];
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      const jitterX = (r > 0 && r < rows && c > 0 && c < cols) ? (rand() - 0.5) * cellW * 0.6 : 0;
      const jitterY = (r > 0 && r < rows && c > 0 && c < cols) ? (rand() - 0.5) * cellH * 0.6 : 0;
      points.push([margin + c * cellW + jitterX, margin + r * cellH + jitterY]);
    }
  }

  // Draw triangulated mosaic by connecting grid cells as quads split into triangles
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tl = points[r * (cols + 1) + c];
      const tr = points[r * (cols + 1) + c + 1];
      const bl = points[(r + 1) * (cols + 1) + c];
      const br = points[(r + 1) * (cols + 1) + c + 1];

      // Draw quad outline
      ctx.beginPath();
      ctx.moveTo(tl[0], tl[1]);
      ctx.lineTo(tr[0], tr[1]);
      ctx.lineTo(br[0], br[1]);
      ctx.lineTo(bl[0], bl[1]);
      ctx.closePath();
      ctx.stroke();

      // Internal decoration
      const decoration = Math.floor(rand() * 4);
      const midX = (tl[0] + tr[0] + bl[0] + br[0]) / 4;
      const midY = (tl[1] + tr[1] + bl[1] + br[1]) / 4;

      if (decoration === 0) {
        // Diagonal split
        ctx.beginPath();
        ctx.moveTo(tl[0], tl[1]);
        ctx.lineTo(br[0], br[1]);
        ctx.stroke();
      } else if (decoration === 1) {
        // Inner diamond
        const m1 = [(tl[0] + tr[0]) / 2, (tl[1] + tr[1]) / 2];
        const m2 = [(tr[0] + br[0]) / 2, (tr[1] + br[1]) / 2];
        const m3 = [(bl[0] + br[0]) / 2, (bl[1] + br[1]) / 2];
        const m4 = [(tl[0] + bl[0]) / 2, (tl[1] + bl[1]) / 2];
        ctx.beginPath();
        ctx.moveTo(m1[0], m1[1]);
        ctx.lineTo(m2[0], m2[1]);
        ctx.lineTo(m3[0], m3[1]);
        ctx.lineTo(m4[0], m4[1]);
        ctx.closePath();
        ctx.stroke();
      } else if (decoration === 2) {
        // Circle
        const radius = Math.min(cellW, cellH) * 0.25;
        ctx.beginPath();
        ctx.arc(midX, midY, radius, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        // Cross diagonals
        ctx.beginPath();
        ctx.moveTo(tl[0], tl[1]);
        ctx.lineTo(br[0], br[1]);
        ctx.moveTo(tr[0], tr[1]);
        ctx.lineTo(bl[0], bl[1]);
        ctx.stroke();
      }
    }
  }
}

function drawKaleidoscope(ctx: CanvasRenderingContext2D, w: number, h: number, complexity: Complexity, lw: number, seed: number) {
  const rand = seededRandom(seed);
  const cx = w / 2;
  const cy = h / 2;
  const maxR = Math.min(w, h) * 0.45;
  const folds = 8;
  const wedgeAngle = (Math.PI * 2) / folds;
  const numShapes = complexity === "simple" ? 6 : complexity === "medium" ? 12 : 20;

  ctx.strokeStyle = "#000000";
  ctx.lineWidth = lw;

  // Outer boundary circle
  ctx.beginPath();
  ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
  ctx.stroke();

  // Generate shapes in one wedge, replicate across all folds
  interface WedgeShape {
    type: number;
    r1: number;
    r2: number;
    a1: number;
    a2: number;
    size: number;
  }
  const shapes: WedgeShape[] = [];
  for (let i = 0; i < numShapes; i++) {
    shapes.push({
      type: Math.floor(rand() * 4),
      r1: rand() * maxR * 0.85 + maxR * 0.1,
      r2: rand() * maxR * 0.85 + maxR * 0.1,
      a1: rand() * wedgeAngle * 0.8 + wedgeAngle * 0.1,
      a2: rand() * wedgeAngle * 0.8 + wedgeAngle * 0.1,
      size: rand() * maxR * 0.12 + maxR * 0.03,
    });
  }

  for (let fold = 0; fold < folds; fold++) {
    const baseAngle = wedgeAngle * fold;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(baseAngle);

    // Draw wedge divider lines
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(maxR * Math.cos(0), maxR * Math.sin(0));
    ctx.stroke();

    for (const shape of shapes) {
      const x = shape.r1 * Math.cos(shape.a1);
      const y = shape.r1 * Math.sin(shape.a1);

      if (shape.type === 0) {
        // Circle
        ctx.beginPath();
        ctx.arc(x, y, shape.size, 0, Math.PI * 2);
        ctx.stroke();
      } else if (shape.type === 1) {
        // Triangle
        const s = shape.size;
        ctx.beginPath();
        ctx.moveTo(x, y - s);
        ctx.lineTo(x - s * 0.866, y + s * 0.5);
        ctx.lineTo(x + s * 0.866, y + s * 0.5);
        ctx.closePath();
        ctx.stroke();
      } else if (shape.type === 2) {
        // Diamond
        const s = shape.size;
        ctx.beginPath();
        ctx.moveTo(x, y - s);
        ctx.lineTo(x + s * 0.7, y);
        ctx.lineTo(x, y + s);
        ctx.lineTo(x - s * 0.7, y);
        ctx.closePath();
        ctx.stroke();
      } else {
        // Line/arc connecting two points
        const x2 = shape.r2 * Math.cos(shape.a2);
        const y2 = shape.r2 * Math.sin(shape.a2);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo((x + x2) / 2 + shape.size, (y + y2) / 2 + shape.size, x2, y2);
        ctx.stroke();
      }
    }

    // Mirror: draw reflected shapes
    ctx.save();
    ctx.scale(1, -1);
    ctx.rotate(-wedgeAngle);
    for (const shape of shapes) {
      const x = shape.r1 * Math.cos(shape.a1);
      const y = shape.r1 * Math.sin(shape.a1);

      if (shape.type === 0) {
        ctx.beginPath();
        ctx.arc(x, y, shape.size, 0, Math.PI * 2);
        ctx.stroke();
      } else if (shape.type === 1) {
        const s = shape.size;
        ctx.beginPath();
        ctx.moveTo(x, y - s);
        ctx.lineTo(x - s * 0.866, y + s * 0.5);
        ctx.lineTo(x + s * 0.866, y + s * 0.5);
        ctx.closePath();
        ctx.stroke();
      } else if (shape.type === 2) {
        const s = shape.size;
        ctx.beginPath();
        ctx.moveTo(x, y - s);
        ctx.lineTo(x + s * 0.7, y);
        ctx.lineTo(x, y + s);
        ctx.lineTo(x - s * 0.7, y);
        ctx.closePath();
        ctx.stroke();
      } else {
        const x2 = shape.r2 * Math.cos(shape.a2);
        const y2 = shape.r2 * Math.sin(shape.a2);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo((x + x2) / 2 + shape.size, (y + y2) / 2 + shape.size, x2, y2);
        ctx.stroke();
      }
    }
    ctx.restore();

    ctx.restore();
  }
}

function drawTessellation(ctx: CanvasRenderingContext2D, w: number, h: number, complexity: Complexity, lw: number, seed: number) {
  const rand = seededRandom(seed);
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = lw;

  const margin = 20;
  const tileType = Math.floor(rand() * 3); // 0=hexagons, 1=triangles, 2=squares with internal patterns

  if (tileType === 0) {
    // Hexagons
    const size = complexity === "simple" ? 60 : complexity === "medium" ? 40 : 28;
    const hexH = size * 2;
    const hexW = Math.sqrt(3) * size;

    for (let row = 0; row * hexH * 0.75 < h - margin; row++) {
      for (let col = 0; col * hexW < w - margin; col++) {
        const cx = margin + col * hexW + (row % 2 === 1 ? hexW / 2 : 0);
        const cy = margin + row * hexH * 0.75;

        if (cx > w - margin + hexW || cy > h - margin + hexH) continue;

        // Draw hexagon
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6;
          const hx = cx + size * Math.cos(angle);
          const hy = cy + size * Math.sin(angle);
          if (i === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.stroke();

        // Internal pattern
        const pattern = Math.floor(rand() * 3);
        if (pattern === 0) {
          // Inner hexagon
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6;
            const hx = cx + size * 0.5 * Math.cos(angle);
            const hy = cy + size * 0.5 * Math.sin(angle);
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();
        } else if (pattern === 1) {
          // Star lines
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + size * 0.8 * Math.cos(angle), cy + size * 0.8 * Math.sin(angle));
            ctx.stroke();
          }
        } else {
          // Circle
          ctx.beginPath();
          ctx.arc(cx, cy, size * 0.4, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }
  } else if (tileType === 1) {
    // Triangles
    const size = complexity === "simple" ? 80 : complexity === "medium" ? 55 : 35;
    const triH = size * Math.sqrt(3) / 2;

    for (let row = 0; margin + row * triH < h - margin; row++) {
      for (let col = 0; margin + col * (size / 2) < w - margin; col++) {
        const x = margin + col * (size / 2);
        const y = margin + row * triH;
        const isUp = (row + col) % 2 === 0;

        ctx.beginPath();
        if (isUp) {
          ctx.moveTo(x, y + triH);
          ctx.lineTo(x + size / 2, y);
          ctx.lineTo(x + size, y + triH);
        } else {
          ctx.moveTo(x, y);
          ctx.lineTo(x + size, y);
          ctx.lineTo(x + size / 2, y + triH);
        }
        ctx.closePath();
        ctx.stroke();

        // Internal decoration
        const dec = Math.floor(rand() * 3);
        const midX = isUp ? x + size / 2 : x + size / 2;
        const midY = isUp ? y + triH * 0.66 : y + triH * 0.33;
        if (dec === 0) {
          ctx.beginPath();
          ctx.arc(midX, midY, size * 0.15, 0, Math.PI * 2);
          ctx.stroke();
        } else if (dec === 1) {
          // Smaller inner triangle
          const s = size * 0.35;
          const iH = s * Math.sqrt(3) / 2;
          ctx.beginPath();
          if (isUp) {
            ctx.moveTo(midX, midY - iH * 0.5);
            ctx.lineTo(midX - s / 2, midY + iH * 0.5);
            ctx.lineTo(midX + s / 2, midY + iH * 0.5);
          } else {
            ctx.moveTo(midX, midY + iH * 0.5);
            ctx.lineTo(midX - s / 2, midY - iH * 0.5);
            ctx.lineTo(midX + s / 2, midY - iH * 0.5);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
    }
  } else {
    // Squares with internal patterns
    const size = complexity === "simple" ? 80 : complexity === "medium" ? 55 : 35;

    for (let y = margin; y < h - margin; y += size) {
      for (let x = margin; x < w - margin; x += size) {
        const sw = Math.min(size, w - margin - x);
        const sh = Math.min(size, h - margin - y);

        ctx.strokeRect(x, y, sw, sh);

        // Internal pattern
        const pattern = Math.floor(rand() * 5);
        if (pattern === 0) {
          // Diagonal
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + sw, y + sh);
          ctx.stroke();
        } else if (pattern === 1) {
          // Both diagonals
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + sw, y + sh);
          ctx.moveTo(x + sw, y);
          ctx.lineTo(x, y + sh);
          ctx.stroke();
        } else if (pattern === 2) {
          // Inner diamond
          ctx.beginPath();
          ctx.moveTo(x + sw / 2, y);
          ctx.lineTo(x + sw, y + sh / 2);
          ctx.lineTo(x + sw / 2, y + sh);
          ctx.lineTo(x, y + sh / 2);
          ctx.closePath();
          ctx.stroke();
        } else if (pattern === 3) {
          // Circle
          ctx.beginPath();
          ctx.arc(x + sw / 2, y + sh / 2, Math.min(sw, sh) * 0.35, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          // Quarter circles in corners
          const r = Math.min(sw, sh) * 0.4;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI / 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x + sw, y + sh, r, Math.PI, Math.PI * 1.5);
          ctx.stroke();
        }
      }
    }
  }
}

export default function ColoringPages() {
  const [patternType, setPatternType] = useState<PatternType>("mandala");
  const [complexity, setComplexity] = useState<Complexity>("medium");
  const [lineThickness, setLineThickness] = useState<LineThickness>("medium");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 2147483646) + 1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = getDimensions(orientation);

  const draw = useCallback(() => {
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

    const lw = lineWidths[lineThickness];

    if (patternType === "mandala") {
      drawMandala(ctx, width, height, complexity, lw, seed);
    } else if (patternType === "mosaic") {
      drawMosaic(ctx, width, height, complexity, lw, seed);
    } else if (patternType === "kaleidoscope") {
      drawKaleidoscope(ctx, width, height, complexity, lw, seed);
    } else {
      drawTessellation(ctx, width, height, complexity, lw, seed);
    }
  }, [patternType, complexity, lineThickness, orientation, width, height, seed]);

  useEffect(() => {
    draw();
  }, [draw]);

  const handleGenerateNew = () => {
    setSeed(Math.floor(Math.random() * 2147483646) + 1);
  };

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
      { "@type": "ListItem", position: 2, name: "Coloring Pages", item: "https://printablepolly.com/coloring-pages" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Geometric Coloring Pages</h1>
      <p className="text-gray-600 mb-6">Generate beautiful geometric patterns to color — mandalas, mosaics, kaleidoscopes, and tessellations. Customize and print for free.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pattern Type</label>
            <select value={patternType} onChange={(e) => setPatternType(e.target.value as PatternType)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="mandala">Mandala</option>
              <option value="mosaic">Mosaic</option>
              <option value="kaleidoscope">Kaleidoscope</option>
              <option value="tessellation">Tessellation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Complexity</label>
            <select value={complexity} onChange={(e) => setComplexity(e.target.value as Complexity)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="simple">Simple</option>
              <option value="medium">Medium</option>
              <option value="complex">Complex</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Line Thickness</label>
            <select value={lineThickness} onChange={(e) => setLineThickness(e.target.value as LineThickness)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="thin">Thin</option>
              <option value="medium">Medium</option>
              <option value="thick">Thick</option>
            </select>
          </div>
          <button
            onClick={handleGenerateNew}
            className="w-full bg-amber-500 text-white font-medium py-2 px-4 rounded hover:bg-amber-600 transition-colors"
          >
            Generate New
          </button>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="coloring-page" />
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
