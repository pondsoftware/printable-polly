"use client";

import { useState, useCallback } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

type Difficulty = "single" | "double" | "triple";

interface Problem {
  display: string;
  answer: string;
}

const faqs = [
  {
    question: "What geometry topics do these worksheets cover?",
    answer: "Easy worksheets cover perimeter of squares and rectangles. Medium worksheets practice area of rectangles, triangles, and circles (using π ≈ 3.14). Hard worksheets include volume of rectangular prisms and cylinders, plus surface area of rectangular prisms.",
  },
  {
    question: "What grade levels are these geometry worksheets for?",
    answer: "Easy perimeter problems are suitable for 3rd–4th graders learning basic geometry. Medium area problems align with 4th–6th grade standards. Hard volume and surface area problems are appropriate for 6th–8th graders and middle school math courses.",
  },
  {
    question: "How should students approach geometry word problems on these worksheets?",
    answer: "Encourage students to identify the shape and what is being asked (perimeter, area, or volume) before choosing a formula. Writing out the formula first, then substituting values, helps build good habits. For area of circles, remind students that π ≈ 3.14 is printed in the problem. Use the answer key to immediately correct errors so incorrect formulas don't become habits.",
  },
];

// --- Utility functions ---

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --- Geometry problem generator ---

function generateGeometryProblem(difficulty: Difficulty): Problem {
  switch (difficulty) {
    case "single": { // Easy: perimeter
      const isSquare = Math.random() < 0.4;
      if (isSquare) {
        const side = randInt(2, 20);
        const perimeter = 4 * side;
        return { display: `Perimeter of a square with side ${side}`, answer: `${perimeter}` };
      } else {
        const length = randInt(3, 25);
        const width = randInt(2, 20);
        const perimeter = 2 * (length + width);
        return { display: `Perimeter of a rectangle: ${length} \u00d7 ${width}`, answer: `${perimeter}` };
      }
    }
    case "double": { // Medium: area
      const type = Math.random();
      if (type < 0.33) {
        const length = randInt(2, 20);
        const width = randInt(2, 15);
        const area = length * width;
        return { display: `Area of a rectangle: ${length} \u00d7 ${width}`, answer: `${area}` };
      } else if (type < 0.66) {
        const base = randInt(2, 20);
        const height = base % 2 === 0 ? randInt(2, 16) : randInt(1, 8) * 2;
        const area = (base * height) / 2;
        return { display: `Area of a triangle: base ${base}, height ${height}`, answer: `${area}` };
      } else {
        const radius = randInt(1, 10);
        return { display: `Area of a circle: radius ${radius} (use \u03C0 \u2248 3.14)`, answer: `${(3.14 * radius * radius).toFixed(2)}` };
      }
    }
    case "triple": { // Hard: volume/surface area
      const type = Math.random();
      if (type < 0.35) {
        const l = randInt(2, 12);
        const w = randInt(2, 10);
        const h = randInt(2, 10);
        const volume = l * w * h;
        return { display: `Volume of a rectangular prism: ${l} \u00d7 ${w} \u00d7 ${h}`, answer: `${volume}` };
      } else if (type < 0.65) {
        const radius = randInt(1, 8);
        const height = randInt(2, 12);
        return { display: `Volume of a cylinder: radius ${radius}, height ${height} (use \u03C0 \u2248 3.14)`, answer: `${(3.14 * radius * radius * height).toFixed(2)}` };
      } else {
        const l = randInt(2, 10);
        const w = randInt(2, 8);
        const h = randInt(2, 8);
        const sa = 2 * (l * w + l * h + w * h);
        return { display: `Surface area of a rectangular prism: ${l} \u00d7 ${w} \u00d7 ${h}`, answer: `${sa}` };
      }
    }
  }
}

// --- Difficulty helpers ---

function getDifficultyLabel(difficulty: Difficulty): string {
  switch (difficulty) {
    case "single": return "Easy";
    case "double": return "Medium";
    case "triple": return "Hard";
  }
}

export default function GeometryWorksheets() {
  const [difficulty, setDifficulty] = useState<Difficulty>("single");
  const [numProblems, setNumProblems] = useState(20);
  const [showAnswers, setShowAnswers] = useState(false);
  const [problems, setProblems] = useState<Problem[]>(() =>
    Array.from({ length: 20 }, () => generateGeometryProblem("single"))
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
      <p className="text-gray-600 mb-6">Generate free printable geometry worksheets. Practice perimeter, area, volume, and surface area — includes answer keys.</p>

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
              <option value="10">10 problems</option>
              <option value="20">20 problems</option>
              <option value="30">30 problems</option>
              <option value="40">40 problems</option>
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
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            <h2 className="text-xl font-bold text-center mb-1">Geometry Worksheet</h2>
            <p className="text-center text-sm text-gray-500 mb-1">Geometry &bull; {diffLabel}</p>
            <p className="text-center text-sm text-gray-400 mb-4">Name: ___________________________ Date: _______________</p>

            <div className="space-y-3">
              {problems.map((p, i) => (
                <div key={i} className="flex items-center gap-2" style={{ fontSize: "15px" }}>
                  <span className="text-gray-400 text-xs w-6 text-right shrink-0">{i + 1}.</span>
                  <span className="font-mono whitespace-nowrap">{p.display}</span>
                  <span className="flex-1 border-b border-gray-300 min-w-[60px]" style={{ height: "20px" }} />
                </div>
              ))}
            </div>

          </div>

          {showAnswers && (
            <div className="printable-area bg-white border border-gray-200 shadow-sm mt-6" style={{ width: `${width}px`, minHeight: "200px", padding: "32px", breakBefore: "page" }}>
              <h2 className="text-xl font-bold text-center mb-1">Answer Key</h2>
              <p className="text-center text-sm text-gray-500 mb-4">Geometry &bull; {diffLabel}</p>
              <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${Math.min(3, problems.length)}, 1fr)`,
                gap: "8px 16px",
                fontSize: "14px",
              }}>
                {problems.map((p, i) => (
                  <span key={i} className="text-gray-600 font-mono">
                    {i + 1}. {p.answer}
                  </span>
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
