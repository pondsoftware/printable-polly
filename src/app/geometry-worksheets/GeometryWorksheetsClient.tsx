"use client";

import { useState, useCallback } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

type Difficulty = "single" | "double" | "triple";

interface GeometryProblem {
  shape: string;
  task: string;
  diagram: React.ReactNode;
  formula: string;
  answer: string;
  unit: string;
}

const faqs = [
  {
    question: "What geometry topics do these worksheets cover?",
    answer: "Easy worksheets cover perimeter of squares and rectangles with labeled diagrams. Medium worksheets practice area of rectangles, triangles, and circles (using π ≈ 3.14). Hard worksheets include volume of rectangular prisms and cylinders, plus surface area of rectangular prisms.",
  },
  {
    question: "What grade levels are these geometry worksheets for?",
    answer: "Easy perimeter problems are suitable for 3rd–4th graders learning basic geometry. Medium area problems align with 4th–6th grade standards. Hard volume and surface area problems are appropriate for 6th–8th graders and middle school math courses.",
  },
  {
    question: "How should students approach geometry problems on these worksheets?",
    answer: "Encourage students to: (1) identify the shape and what is being measured, (2) write out the formula, (3) substitute the labeled values, and (4) calculate. Each problem includes a labeled diagram and space for showing work. The formula hint helps students connect the diagram to the calculation.",
  },
];

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --- SVG Shape Diagrams ---

function RectangleDiagram({ w, h, label }: { w: number; h: number; label: string }) {
  const svgW = 140;
  const svgH = 100;
  const rx = 20;
  const ry = 15;
  const rw = 100;
  const rh = 65;
  return (
    <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} className="block" role="img" aria-label={`Rectangle diagram: ${w} by ${h} ${label}`}>
      <rect x={rx} y={ry} width={rw} height={rh} fill="none" stroke="black" strokeWidth="2" />
      {/* Width label — top */}
      <text x={rx + rw / 2} y={ry - 4} textAnchor="middle" fontSize="13" fontWeight="bold">{w} {label}</text>
      {/* Height label — right */}
      <text x={rx + rw + 6} y={ry + rh / 2 + 4} textAnchor="start" fontSize="13" fontWeight="bold">{h} {label}</text>
    </svg>
  );
}

function SquareDiagram({ s, label }: { s: number; label: string }) {
  const svgW = 120;
  const svgH = 110;
  const rx = 15;
  const ry = 15;
  const size = 80;
  return (
    <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} className="block" role="img" aria-label={`Square diagram: side ${s} ${label}`}>
      <rect x={rx} y={ry} width={size} height={size} fill="none" stroke="black" strokeWidth="2" />
      {/* Side label — bottom */}
      <text x={rx + size / 2} y={ry + size + 16} textAnchor="middle" fontSize="13" fontWeight="bold">{s} {label}</text>
      {/* Right angle marks */}
      <rect x={rx} y={ry} width={8} height={8} fill="none" stroke="black" strokeWidth="1" />
    </svg>
  );
}

function TriangleDiagram({ base, height, label }: { base: number; height: number; label: string }) {
  const svgW = 150;
  const svgH = 110;
  const bx = 20;
  const by = 90;
  const bw = 110;
  const th = 70;
  // Right triangle for simplicity
  const points = `${bx},${by} ${bx + bw},${by} ${bx},${by - th}`;
  return (
    <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} className="block" role="img" aria-label={`Triangle diagram: base ${base}, height ${height} ${label}`}>
      <polygon points={points} fill="none" stroke="black" strokeWidth="2" />
      {/* Base label */}
      <text x={bx + bw / 2} y={by + 16} textAnchor="middle" fontSize="13" fontWeight="bold">{base} {label}</text>
      {/* Height label — left side with dashed line */}
      <line x1={bx} y1={by} x2={bx} y2={by - th} stroke="gray" strokeWidth="1" strokeDasharray="4" />
      <text x={bx - 6} y={by - th / 2 + 4} textAnchor="end" fontSize="13" fontWeight="bold">{height} {label}</text>
      {/* Right angle mark */}
      <polyline points={`${bx + 10},${by} ${bx + 10},${by - 10} ${bx},${by - 10}`} fill="none" stroke="black" strokeWidth="1" />
    </svg>
  );
}

function CircleDiagram({ radius, label }: { radius: number; label: string }) {
  const svgW = 120;
  const svgH = 120;
  const cx = 60;
  const cy = 60;
  const r = 45;
  return (
    <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} className="block" role="img" aria-label={`Circle diagram: radius ${radius} ${label}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="black" strokeWidth="2" />
      {/* Radius line */}
      <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="black" strokeWidth="1.5" />
      {/* Center dot */}
      <circle cx={cx} cy={cy} r={2} fill="black" />
      {/* Radius label */}
      <text x={cx + r / 2} y={cy - 5} textAnchor="middle" fontSize="13" fontWeight="bold">r = {radius} {label}</text>
    </svg>
  );
}

function RectPrismDiagram({ l, w, h, label }: { l: number; w: number; h: number; label: string }) {
  const svgW = 160;
  const svgH = 130;
  // Front face
  const fx = 20;
  const fy = 40;
  const fw = 80;
  const fh = 70;
  // Offset for 3D
  const ox = 35;
  const oy = -25;
  return (
    <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} className="block" role="img" aria-label={`Rectangular prism diagram: ${l} by ${w} by ${h} ${label}`}>
      {/* Back face */}
      <rect x={fx + ox} y={fy + oy} width={fw} height={fh} fill="none" stroke="black" strokeWidth="1" strokeDasharray="4" />
      {/* Front face */}
      <rect x={fx} y={fy} width={fw} height={fh} fill="white" stroke="black" strokeWidth="2" />
      {/* Connecting lines */}
      <line x1={fx} y1={fy} x2={fx + ox} y2={fy + oy} stroke="black" strokeWidth="1.5" />
      <line x1={fx + fw} y1={fy} x2={fx + fw + ox} y2={fy + oy} stroke="black" strokeWidth="1.5" />
      <line x1={fx + fw} y1={fy + fh} x2={fx + fw + ox} y2={fy + fh + oy} stroke="black" strokeWidth="1.5" />
      {/* Labels */}
      <text x={fx + fw / 2} y={fy + fh + 16} textAnchor="middle" fontSize="12" fontWeight="bold">{l} {label}</text>
      <text x={fx + fw + 8} y={fy + fh / 2 + 4} textAnchor="start" fontSize="12" fontWeight="bold">{h} {label}</text>
      <text x={fx + fw + ox / 2 + 2} y={fy + oy - 4} textAnchor="middle" fontSize="12" fontWeight="bold">{w} {label}</text>
    </svg>
  );
}

function CylinderDiagram({ radius, height, label }: { radius: number; height: number; label: string }) {
  const svgW = 130;
  const svgH = 130;
  const cx = 65;
  const topY = 25;
  const botY = 100;
  const rx = 40;
  const ry = 12;
  return (
    <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} className="block" role="img" aria-label={`Cylinder diagram: radius ${radius}, height ${height} ${label}`}>
      {/* Bottom ellipse */}
      <ellipse cx={cx} cy={botY} rx={rx} ry={ry} fill="none" stroke="black" strokeWidth="2" />
      {/* Top ellipse */}
      <ellipse cx={cx} cy={topY} rx={rx} ry={ry} fill="white" stroke="black" strokeWidth="2" />
      {/* Side lines */}
      <line x1={cx - rx} y1={topY} x2={cx - rx} y2={botY} stroke="black" strokeWidth="2" />
      <line x1={cx + rx} y1={topY} x2={cx + rx} y2={botY} stroke="black" strokeWidth="2" />
      {/* Radius line on top */}
      <line x1={cx} y1={topY} x2={cx + rx} y2={topY} stroke="black" strokeWidth="1.5" />
      <circle cx={cx} cy={topY} r={2} fill="black" />
      <text x={cx + rx / 2} y={topY - 5} textAnchor="middle" fontSize="11" fontWeight="bold">r = {radius}</text>
      {/* Height label */}
      <text x={cx + rx + 8} y={(topY + botY) / 2 + 4} textAnchor="start" fontSize="12" fontWeight="bold">{height} {label}</text>
    </svg>
  );
}

// --- Problem generator ---

function generateGeometryProblem(difficulty: Difficulty): GeometryProblem {
  const label = "cm";
  switch (difficulty) {
    case "single": { // Easy: perimeter
      const isSquare = Math.random() < 0.4;
      if (isSquare) {
        const s = randInt(2, 20);
        return {
          shape: "Square",
          task: "Find the perimeter.",
          diagram: <SquareDiagram s={s} label={label} />,
          formula: "P = 4 × s",
          answer: `${4 * s}`,
          unit: label,
        };
      } else {
        const l = randInt(3, 25);
        const w = randInt(2, 20);
        return {
          shape: "Rectangle",
          task: "Find the perimeter.",
          diagram: <RectangleDiagram w={l} h={w} label={label} />,
          formula: "P = 2(l + w)",
          answer: `${2 * (l + w)}`,
          unit: label,
        };
      }
    }
    case "double": { // Medium: area
      const type = Math.random();
      if (type < 0.33) {
        const l = randInt(2, 20);
        const w = randInt(2, 15);
        return {
          shape: "Rectangle",
          task: "Find the area.",
          diagram: <RectangleDiagram w={l} h={w} label={label} />,
          formula: "A = l × w",
          answer: `${l * w}`,
          unit: label + "²",
        };
      } else if (type < 0.66) {
        const base = randInt(2, 20);
        const height = base % 2 === 0 ? randInt(2, 16) : randInt(1, 8) * 2;
        return {
          shape: "Triangle",
          task: "Find the area.",
          diagram: <TriangleDiagram base={base} height={height} label={label} />,
          formula: "A = ½ × b × h",
          answer: `${(base * height) / 2}`,
          unit: label + "²",
        };
      } else {
        const r = randInt(1, 10);
        return {
          shape: "Circle",
          task: "Find the area. (Use π ≈ 3.14)",
          diagram: <CircleDiagram radius={r} label={label} />,
          formula: "A = π × r²",
          answer: `${(3.14 * r * r).toFixed(2)}`,
          unit: label + "²",
        };
      }
    }
    case "triple": { // Hard: volume/surface area
      const type = Math.random();
      if (type < 0.35) {
        const l = randInt(2, 12);
        const w = randInt(2, 10);
        const h = randInt(2, 10);
        return {
          shape: "Rectangular Prism",
          task: "Find the volume.",
          diagram: <RectPrismDiagram l={l} w={w} h={h} label={label} />,
          formula: "V = l × w × h",
          answer: `${l * w * h}`,
          unit: label + "³",
        };
      } else if (type < 0.65) {
        const r = randInt(1, 8);
        const h = randInt(2, 12);
        return {
          shape: "Cylinder",
          task: "Find the volume. (Use π ≈ 3.14)",
          diagram: <CylinderDiagram radius={r} height={h} label={label} />,
          formula: "V = π × r² × h",
          answer: `${(3.14 * r * r * h).toFixed(2)}`,
          unit: label + "³",
        };
      } else {
        const l = randInt(2, 10);
        const w = randInt(2, 8);
        const h = randInt(2, 8);
        return {
          shape: "Rectangular Prism",
          task: "Find the surface area.",
          diagram: <RectPrismDiagram l={l} w={w} h={h} label={label} />,
          formula: "SA = 2(lw + lh + wh)",
          answer: `${2 * (l * w + l * h + w * h)}`,
          unit: label + "²",
        };
      }
    }
  }
}

function getDifficultyLabel(difficulty: Difficulty): string {
  switch (difficulty) {
    case "single": return "Easy";
    case "double": return "Medium";
    case "triple": return "Hard";
  }
}

function getDifficultyDescription(difficulty: Difficulty): string {
  switch (difficulty) {
    case "single": return "Perimeter";
    case "double": return "Area";
    case "triple": return "Volume & Surface Area";
  }
}

export default function GeometryWorksheetsClient() {
  const [difficulty, setDifficulty] = useState<Difficulty>("single");
  const [numProblems, setNumProblems] = useState(6);
  const [showAnswers, setShowAnswers] = useState(false);
  const [problems, setProblems] = useState<GeometryProblem[]>(() =>
    Array.from({ length: 6 }, () => generateGeometryProblem("single"))
  );
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const { width, height } = getDimensions(orientation);

  const generateNew = useCallback(() => {
    setProblems(Array.from({ length: numProblems }, () => generateGeometryProblem(difficulty)));
  }, [difficulty, numProblems]);

  const handleDifficultyChange = (diff: Difficulty) => {
    setDifficulty(diff);
    setProblems(Array.from({ length: numProblems }, () => generateGeometryProblem(diff)));
  };

  const handleNumProblemsChange = (num: number) => {
    setNumProblems(num);
    setProblems(Array.from({ length: num }, () => generateGeometryProblem(difficulty)));
  };

  const diffLabel = getDifficultyLabel(difficulty);
  const diffDescription = getDifficultyDescription(difficulty);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://printablepolly.com" },
      { "@type": "ListItem", position: 2, name: "Geometry Worksheets", item: "https://printablepolly.com/geometry-worksheets" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Geometry Worksheet Generator</h1>
      <p className="text-gray-600 mb-6">Generate free printable geometry worksheets with labeled shape diagrams. Practice perimeter, area, volume, and surface area — includes answer keys.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => handleDifficultyChange(e.target.value as Difficulty)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="single">Easy — Perimeter</option>
              <option value="double">Medium — Area</option>
              <option value="triple">Hard — Volume &amp; Surface Area</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Problems</label>
            <select
              value={numProblems}
              onChange={(e) => handleNumProblemsChange(parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="4">4 problems</option>
              <option value="6">6 problems</option>
              <option value="8">8 problems</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={showAnswers}
                onChange={(e) => setShowAnswers(e.target.checked)}
                className="rounded"
              />
              Show Answer Key
            </label>
          </div>
          <button
            onClick={generateNew}
            className="w-full bg-amber-500 text-white font-medium py-2 px-4 rounded hover:bg-amber-600 transition-colors"
          >
            Generate New
          </button>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="geometry-worksheet" />
        </div>

        <div className="flex-1 overflow-auto">
          <div
            className="printable-area bg-white border border-gray-200 shadow-sm"
            style={{ width: `${width}px`, minHeight: `${height}px`, padding: "40px 48px" }}
          >
            {/* Header */}
            <div className="text-center mb-6 border-b border-gray-300 pb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Geometry Worksheet</h2>
              <p className="text-sm text-gray-600 mb-3">
                {diffLabel} &bull; {diffDescription}
              </p>
              <div className="flex justify-between text-sm text-gray-700 mt-2 px-2">
                <span>Name: <span style={{ display: "inline-block", width: "200px", borderBottom: "1px solid #333", verticalAlign: "bottom" }} /></span>
                <span>Date: <span style={{ display: "inline-block", width: "120px", borderBottom: "1px solid #333", verticalAlign: "bottom" }} /></span>
              </div>
            </div>

            {/* Problems — 2-column grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 24px" }}>
              {problems.map((p, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-sm p-3"
                  style={{ minHeight: "200px" }}
                >
                  {/* Problem number and task */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-bold text-gray-800" style={{ fontSize: "15px" }}>
                      {i + 1}.
                    </span>
                    <span className="text-sm text-gray-700">
                      {p.task}
                    </span>
                  </div>

                  {/* Diagram */}
                  <div className="flex justify-center mb-2">
                    {p.diagram}
                  </div>

                  {/* Formula hint */}
                  <p className="text-xs text-gray-500 italic mb-2 text-center">
                    Formula: {p.formula}
                  </p>

                  {/* Work area — ruled lines */}
                  <div>
                    {[0, 1].map(j => (
                      <div key={j} className="border-b border-dashed border-gray-300 h-5" />
                    ))}
                  </div>

                  {/* Answer line */}
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-sm font-medium text-gray-700">Answer:</span>
                    <span className="flex-1 border-b-2 border-gray-400" style={{ height: "18px" }} />
                    <span className="text-sm text-gray-500 ml-1">{p.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Answer key — separate page */}
          {showAnswers && (
            <div
              className="printable-area bg-white border border-gray-200 shadow-sm mt-6"
              style={{ width: `${width}px`, minHeight: "200px", padding: "40px 48px", breakBefore: "page" }}
            >
              <div className="text-center mb-6 border-b border-gray-300 pb-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Answer Key</h2>
                <p className="text-sm text-gray-600">
                  Geometry Worksheet &bull; {diffLabel} &bull; {diffDescription}
                </p>
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px 24px",
                fontSize: "15px",
              }}>
                {problems.map((p, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="font-bold text-gray-700">{i + 1}.</span>
                    <span className="font-mono text-gray-800">{p.answer} {p.unit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
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
