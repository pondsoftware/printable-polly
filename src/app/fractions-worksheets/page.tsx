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
    question: "What fractions skills do these worksheets cover?",
    answer: "Easy worksheets cover adding and subtracting proper fractions with denominators up to 10. Medium worksheets add simplifying fractions and working with denominators up to 20. Hard worksheets introduce mixed number addition and subtraction, which is a key 5th-grade skill.",
  },
  {
    question: "What grade levels are these fractions worksheets for?",
    answer: "Easy is ideal for 3rd–4th graders learning basic fraction operations. Medium suits 4th–5th graders working on equivalent fractions and simplification. Hard is designed for 5th–6th graders tackling mixed numbers and more complex fraction arithmetic.",
  },
  {
    question: "How do I use the answer key effectively?",
    answer: "Print the worksheet without the answer key first. After your student completes the problems, reprint or reveal the key to check answers. Encourage students to show their work finding common denominators — getting the right answer the right way matters more than guessing.",
  },
];

// --- Utility functions ---

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function simplifyFraction(num: number, den: number): [number, number] {
  const g = gcd(num, den);
  return [num / g, den / g];
}

function fractionStr(num: number, den: number): string {
  if (den === 1) return `${num}`;
  return `${num}/${den}`;
}

function mixedNumberStr(whole: number, num: number, den: number): string {
  if (num === 0) return `${whole}`;
  if (whole === 0) return fractionStr(num, den);
  return `${whole} ${num}/${den}`;
}

// --- Fractions problem generator ---

function generateFractionProblem(difficulty: Difficulty): Problem {
  switch (difficulty) {
    case "single": { // Easy: add/subtract fractions with single-digit denominators <= 10
      const isAdd = Math.random() < 0.5;
      const d1 = randInt(2, 10);
      const d2 = randInt(2, 10);
      const n1 = randInt(1, d1 - 1);
      const n2 = randInt(1, d2 - 1);

      const commonDen = lcm(d1, d2);
      const resultNum = isAdd
        ? n1 * (commonDen / d1) + n2 * (commonDen / d2)
        : n1 * (commonDen / d1) - n2 * (commonDen / d2);

      // If subtraction would be negative, swap
      if (!isAdd && resultNum < 0) {
        return generateFractionProblem(difficulty);
      }

      const [sNum, sDen] = simplifyFraction(Math.abs(resultNum), commonDen);
      const op = isAdd ? "+" : "\u2212";

      return {
        display: `${fractionStr(n1, d1)} ${op} ${fractionStr(n2, d2)} =`,
        answer: fractionStr(sNum, sDen),
      };
    }
    case "double": { // Medium: simplify fractions OR add/subtract with denominators <= 20
      const type = Math.random();
      if (type < 0.5) {
        // Simplify a fraction
        const simpleDen = randInt(2, 10);
        const simpleNum = randInt(1, simpleDen - 1);
        const multiplier = randInt(2, Math.floor(20 / simpleDen) || 2);
        const bigNum = simpleNum * multiplier;
        const bigDen = simpleDen * multiplier;
        const [sNum, sDen] = simplifyFraction(bigNum, bigDen);

        return {
          display: `Simplify ${fractionStr(bigNum, bigDen)} =`,
          answer: fractionStr(sNum, sDen),
        };
      } else {
        // Add/subtract with denominators up to 20
        const isAdd = Math.random() < 0.5;
        const d1 = randInt(2, 20);
        const d2 = randInt(2, 20);
        const n1 = randInt(1, d1 - 1);
        const n2 = randInt(1, d2 - 1);

        const commonDen = lcm(d1, d2);
        // Avoid huge denominators
        if (commonDen > 100) return generateFractionProblem(difficulty);

        const resultNum = isAdd
          ? n1 * (commonDen / d1) + n2 * (commonDen / d2)
          : n1 * (commonDen / d1) - n2 * (commonDen / d2);

        if (!isAdd && resultNum < 0) {
          return generateFractionProblem(difficulty);
        }

        const [sNum, sDen] = simplifyFraction(Math.abs(resultNum), commonDen);
        const op = isAdd ? "+" : "\u2212";

        // Convert to mixed number if improper
        if (sNum >= sDen && sDen > 1) {
          const whole = Math.floor(sNum / sDen);
          const rem = sNum % sDen;
          return {
            display: `${fractionStr(n1, d1)} ${op} ${fractionStr(n2, d2)} =`,
            answer: mixedNumberStr(whole, rem, sDen),
          };
        }

        return {
          display: `${fractionStr(n1, d1)} ${op} ${fractionStr(n2, d2)} =`,
          answer: fractionStr(sNum, sDen),
        };
      }
    }
    case "triple": { // Hard: mixed number addition/subtraction
      const isAdd = Math.random() < 0.5;
      const w1 = randInt(1, 5);
      const d1 = randInt(2, 8);
      const n1 = randInt(1, d1 - 1);
      const w2 = randInt(1, 5);
      const d2 = randInt(2, 8);
      const n2 = randInt(1, d2 - 1);

      // Convert to improper fractions
      const imp1 = w1 * d1 + n1;
      const imp2 = w2 * d2 + n2;

      const commonDen = lcm(d1, d2);
      const resultNum = isAdd
        ? imp1 * (commonDen / d1) + imp2 * (commonDen / d2)
        : imp1 * (commonDen / d1) - imp2 * (commonDen / d2);

      if (!isAdd && resultNum < 0) {
        return generateFractionProblem(difficulty);
      }

      const [sNum, sDen] = simplifyFraction(Math.abs(resultNum), commonDen);
      const whole = Math.floor(sNum / sDen);
      const rem = sNum % sDen;
      const op = isAdd ? "+" : "\u2212";

      return {
        display: `${mixedNumberStr(w1, n1, d1)} ${op} ${mixedNumberStr(w2, n2, d2)} =`,
        answer: mixedNumberStr(whole, rem, sDen),
      };
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

export default function FractionsWorksheets() {
  const [difficulty, setDifficulty] = useState<Difficulty>("single");
  const [numProblems, setNumProblems] = useState(20);
  const [showAnswers, setShowAnswers] = useState(false);
  const [problems, setProblems] = useState<Problem[]>(() =>
    Array.from({ length: 20 }, () => generateFractionProblem("single"))
  );
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const { width, height } = getDimensions(orientation);

  const generateNew = useCallback(() => {
    setProblems(Array.from({ length: numProblems }, () => generateFractionProblem(difficulty)));
  }, [difficulty, numProblems]);

  const handleDifficultyChange = (diff: Difficulty) => {
    setDifficulty(diff);
    setProblems(Array.from({ length: numProblems }, () => generateFractionProblem(diff)));
  };

  const handleNumProblemsChange = (num: number) => {
    setNumProblems(num);
    setProblems(Array.from({ length: num }, () => generateFractionProblem(difficulty)));
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
      { "@type": "ListItem", position: 2, name: "Fractions Worksheets", item: "https://printablepolly.com/fractions-worksheets" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Fractions Worksheet Generator</h1>
      <p className="text-gray-600 mb-6">Generate free printable fractions worksheets. Practice adding, subtracting, and simplifying fractions at any difficulty level — includes answer keys.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => handleDifficultyChange(e.target.value as Difficulty)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="single">Easy — Add/subtract (denominators ≤ 10)</option>
              <option value="double">Medium — Simplify OR add/subtract (≤ 20)</option>
              <option value="triple">Hard — Mixed number addition/subtraction</option>
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
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="fractions-worksheet" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            <h2 className="text-xl font-bold text-center mb-1">Fractions Worksheet</h2>
            <p className="text-center text-sm text-gray-500 mb-1">Fractions &bull; {diffLabel}</p>
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
              <p className="text-center text-sm text-gray-500 mb-4">Fractions &bull; {diffLabel}</p>
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
