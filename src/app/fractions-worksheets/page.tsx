"use client";

import { useState, useCallback } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

type Difficulty = "single" | "double" | "triple";

// --- Structured problem types ---

interface AddSubProblem {
  kind: "add_sub";
  n1: number; d1: number;
  n2: number; d2: number;
  w1?: number; w2?: number; // whole parts for mixed numbers
  op: string;
  answer: string;
}

interface SimplifyProblem {
  kind: "simplify";
  n1: number; d1: number;
  answer: string;
}

type Problem = AddSubProblem | SimplifyProblem;

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

// --- Fraction rendering component ---

function Fraction({ num, den }: { num: number | string; den: number | string }) {
  return (
    <span
      className="inline-flex flex-col items-center mx-1"
      style={{ verticalAlign: "middle" }}
    >
      <span
        className="border-b-2 border-black px-1 text-center font-semibold"
        style={{ lineHeight: "1.3", minWidth: "1.2em" }}
      >
        {num}
      </span>
      <span
        className="px-1 text-center font-semibold"
        style={{ lineHeight: "1.3", minWidth: "1.2em" }}
      >
        {den}
      </span>
    </span>
  );
}

// Whole number + stacked fraction for mixed numbers
function MixedNumber({ whole, num, den }: { whole: number; num: number; den: number }) {
  if (num === 0) return <span className="font-semibold mx-1">{whole}</span>;
  if (whole === 0) return <Fraction num={num} den={den} />;
  return (
    <span className="inline-flex items-center" style={{ verticalAlign: "middle" }}>
      <span className="font-semibold mr-0.5" style={{ fontSize: "1.1em" }}>{whole}</span>
      <Fraction num={num} den={den} />
    </span>
  );
}

// Answer display (compact, for answer key)
function AnswerFraction({ answer }: { answer: string }) {
  // Parse mixed number "2 3/4", fraction "3/4", or whole "5"
  const mixedMatch = answer.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixedMatch) {
    const whole = parseInt(mixedMatch[1]);
    const num = parseInt(mixedMatch[2]);
    const den = parseInt(mixedMatch[3]);
    return <MixedNumber whole={whole} num={num} den={den} />;
  }
  const fracMatch = answer.match(/^(\d+)\/(\d+)$/);
  if (fracMatch) {
    return <Fraction num={fracMatch[1]} den={fracMatch[2]} />;
  }
  return <span className="font-semibold">{answer}</span>;
}

// --- Problem renderer ---

function ProblemDisplay({ problem }: { problem: Problem }) {
  if (problem.kind === "simplify") {
    return (
      <span className="inline-flex items-center" style={{ verticalAlign: "middle" }}>
        <span className="mr-2 text-gray-600" style={{ fontSize: "0.95em" }}>Simplify</span>
        <Fraction num={problem.n1} den={problem.d1} />
        <span className="mx-2 font-semibold">=</span>
      </span>
    );
  }

  // add_sub — regular or mixed
  const { n1, d1, n2, d2, w1, w2, op } = problem;
  const isMixed = w1 !== undefined || w2 !== undefined;

  return (
    <span className="inline-flex items-center" style={{ verticalAlign: "middle" }}>
      {isMixed ? (
        <MixedNumber whole={w1 ?? 0} num={n1} den={d1} />
      ) : (
        <Fraction num={n1} den={d1} />
      )}
      <span className="mx-2 font-semibold" style={{ fontSize: "1.1em" }}>{op}</span>
      {isMixed ? (
        <MixedNumber whole={w2 ?? 0} num={n2} den={d2} />
      ) : (
        <Fraction num={n2} den={d2} />
      )}
      <span className="mx-2 font-semibold">=</span>
    </span>
  );
}

// --- Fractions problem generator ---

function generateFractionProblem(difficulty: Difficulty): Problem {
  switch (difficulty) {
    case "single": { // Easy: add/subtract fractions, denominators <= 10
      const isAdd = Math.random() < 0.5;
      const d1 = randInt(2, 10);
      const d2 = randInt(2, 10);
      const n1 = randInt(1, d1 - 1);
      const n2 = randInt(1, d2 - 1);

      const commonDen = lcm(d1, d2);
      const resultNum = isAdd
        ? n1 * (commonDen / d1) + n2 * (commonDen / d2)
        : n1 * (commonDen / d1) - n2 * (commonDen / d2);

      if (!isAdd && resultNum < 0) return generateFractionProblem(difficulty);

      const [sNum, sDen] = simplifyFraction(Math.abs(resultNum), commonDen);
      const op = isAdd ? "+" : "\u2212";

      return { kind: "add_sub", n1, d1, n2, d2, op, answer: fractionStr(sNum, sDen) };
    }

    case "double": { // Medium: simplify OR add/subtract, denominators <= 20
      if (Math.random() < 0.5) {
        // Simplify a fraction
        const simpleDen = randInt(2, 10);
        const simpleNum = randInt(1, simpleDen - 1);
        const multiplier = randInt(2, Math.floor(20 / simpleDen) || 2);
        const bigNum = simpleNum * multiplier;
        const bigDen = simpleDen * multiplier;
        const [sNum, sDen] = simplifyFraction(bigNum, bigDen);
        return { kind: "simplify", n1: bigNum, d1: bigDen, answer: fractionStr(sNum, sDen) };
      } else {
        const isAdd = Math.random() < 0.5;
        const d1 = randInt(2, 20);
        const d2 = randInt(2, 20);
        const n1 = randInt(1, d1 - 1);
        const n2 = randInt(1, d2 - 1);

        const commonDen = lcm(d1, d2);
        if (commonDen > 100) return generateFractionProblem(difficulty);

        const resultNum = isAdd
          ? n1 * (commonDen / d1) + n2 * (commonDen / d2)
          : n1 * (commonDen / d1) - n2 * (commonDen / d2);

        if (!isAdd && resultNum < 0) return generateFractionProblem(difficulty);

        const [sNum, sDen] = simplifyFraction(Math.abs(resultNum), commonDen);
        const op = isAdd ? "+" : "\u2212";

        if (sNum >= sDen && sDen > 1) {
          const whole = Math.floor(sNum / sDen);
          const rem = sNum % sDen;
          return { kind: "add_sub", n1, d1, n2, d2, op, answer: mixedNumberStr(whole, rem, sDen) };
        }
        return { kind: "add_sub", n1, d1, n2, d2, op, answer: fractionStr(sNum, sDen) };
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

      const imp1 = w1 * d1 + n1;
      const imp2 = w2 * d2 + n2;

      const commonDen = lcm(d1, d2);
      const resultNum = isAdd
        ? imp1 * (commonDen / d1) + imp2 * (commonDen / d2)
        : imp1 * (commonDen / d1) - imp2 * (commonDen / d2);

      if (!isAdd && resultNum < 0) return generateFractionProblem(difficulty);

      const [sNum, sDen] = simplifyFraction(Math.abs(resultNum), commonDen);
      const whole = Math.floor(sNum / sDen);
      const rem = sNum % sDen;
      const op = isAdd ? "+" : "\u2212";

      return { kind: "add_sub", n1, d1, n2, d2, w1, w2, op, answer: mixedNumberStr(whole, rem, sDen) };
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

function getDifficultySubtitle(difficulty: Difficulty): string {
  switch (difficulty) {
    case "single": return "Adding & Subtracting Fractions (denominators \u2264 10)";
    case "double": return "Simplifying & Adding/Subtracting Fractions (denominators \u2264 20)";
    case "triple": return "Mixed Number Addition & Subtraction";
  }
}

export default function FractionsWorksheets() {
  const [difficulty, setDifficulty] = useState<Difficulty>("single");
  const [numProblems, setNumProblems] = useState(12);
  const [showAnswers, setShowAnswers] = useState(false);
  const [problems, setProblems] = useState<Problem[]>(() =>
    Array.from({ length: 12 }, () => generateFractionProblem("single"))
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
  const diffSubtitle = getDifficultySubtitle(difficulty);

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
        {/* Controls panel */}
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
              <option value="8">8 problems</option>
              <option value="12">12 problems</option>
              <option value="16">16 problems</option>
              <option value="20">20 problems</option>
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

        {/* Printable area */}
        <div className="flex-1 overflow-auto">
          <div
            className="printable-area bg-white border border-gray-200 shadow-sm"
            style={{ width: `${width}px`, minHeight: `${height}px`, padding: "40px 48px" }}
          >
            {/* Worksheet header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold tracking-wide mb-1" style={{ fontFamily: "Georgia, serif" }}>
                Fractions Worksheet
              </h2>
              <p className="text-sm text-gray-500 mb-3">{diffLabel} &bull; {diffSubtitle}</p>
              <div
                className="flex justify-center gap-10 text-sm border-t border-b border-gray-300 py-2"
                style={{ fontFamily: "Georgia, serif" }}
              >
                <span>Name: <span style={{ display: "inline-block", width: "200px", borderBottom: "1px solid #555", marginLeft: "4px" }}>&nbsp;</span></span>
                <span>Date: <span style={{ display: "inline-block", width: "130px", borderBottom: "1px solid #555", marginLeft: "4px" }}>&nbsp;</span></span>
              </div>
            </div>

            {/* Problems grid — 2 columns */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0",
              }}
            >
              {problems.map((problem, i) => (
                <div
                  key={i}
                  style={{
                    borderRight: (i % 2 === 0) ? "1px solid #d1d5db" : "none",
                    borderBottom: "1px solid #d1d5db",
                    padding: "18px 24px 12px 24px",
                  }}
                >
                  {/* Problem number + expression */}
                  <div className="flex items-center" style={{ fontSize: "18px", minHeight: "48px" }}>
                    <span
                      className="font-bold text-gray-700 shrink-0"
                      style={{ width: "28px", fontSize: "14px", paddingTop: "2px" }}
                    >
                      {i + 1}.
                    </span>
                    <div className="flex items-center flex-wrap">
                      <ProblemDisplay problem={problem} />
                      {/* Answer blank */}
                      <span
                        style={{
                          display: "inline-block",
                          width: "80px",
                          borderBottom: "2px solid #374151",
                          marginLeft: "4px",
                          verticalAlign: "middle",
                        }}
                      />
                    </div>
                  </div>
                  {/* Work space */}
                  <div style={{ height: "90px" }} />
                </div>
              ))}
              {/* Fill last cell if odd number of problems */}
              {problems.length % 2 !== 0 && (
                <div
                  style={{
                    borderBottom: "1px solid #d1d5db",
                    padding: "18px 24px 12px 24px",
                  }}
                />
              )}
            </div>
          </div>

          {/* Answer key — separate page */}
          {showAnswers && (
            <div
              className="printable-area bg-white border border-gray-200 shadow-sm mt-6"
              style={{
                width: `${width}px`,
                minHeight: "300px",
                padding: "40px 48px",
                breakBefore: "page",
              }}
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold tracking-wide mb-1" style={{ fontFamily: "Georgia, serif" }}>
                  Answer Key
                </h2>
                <p className="text-sm text-gray-500">{diffLabel} &bull; {diffSubtitle}</p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "12px 8px",
                }}
              >
                {problems.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1"
                    style={{ fontSize: "15px", padding: "6px 8px", borderBottom: "1px solid #e5e7eb" }}
                  >
                    <span className="text-gray-500 font-bold shrink-0" style={{ minWidth: "22px", fontSize: "13px" }}>
                      {i + 1}.
                    </span>
                    <AnswerFraction answer={p.answer} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FAQ section */}
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
