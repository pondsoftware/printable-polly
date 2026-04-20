"use client";

import { useState, useCallback } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

type Operation = "addition" | "subtraction" | "multiplication" | "division" | "mixed";
type Difficulty = "single" | "double" | "triple";

const faqs = [
  { question: "How often should kids practice math worksheets?", answer: "Daily practice of 10-20 minutes is ideal for building math fluency. Short, consistent sessions are more effective than long, infrequent ones. Use the 'Generate New' button for fresh problems each session." },
  { question: "What difficulty level should I start with?", answer: "Start with single-digit problems to build confidence and speed. Once a child can complete a sheet with 90%+ accuracy, move to double-digit. Triple-digit is best for students comfortable with carrying and borrowing." },
  { question: "Should I use the answer key or let kids check their own work?", answer: "Both approaches work. Younger children benefit from parent-checked answers with immediate feedback. Older students can use the answer key to self-check, which builds independence and error-recognition skills." },
];

function getRange(difficulty: Difficulty): [number, number] {
  switch (difficulty) {
    case "single": return [1, 9];
    case "double": return [10, 99];
    case "triple": return [100, 999];
  }
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem(operation: Operation, difficulty: Difficulty): { a: number; b: number; op: string; answer: number } {
  const ops: Operation[] = operation === "mixed" ? ["addition", "subtraction", "multiplication", "division"] : [operation];
  const chosen = ops[Math.floor(Math.random() * ops.length)];
  const [min, max] = getRange(difficulty);

  let a: number, b: number, op: string, answer: number;

  switch (chosen) {
    case "addition":
      a = randInt(min, max);
      b = randInt(min, max);
      op = "+";
      answer = a + b;
      break;
    case "subtraction":
      a = randInt(min, max);
      b = randInt(min, Math.min(a, max));
      op = "\u2212";
      answer = a - b;
      break;
    case "multiplication":
      if (difficulty === "triple") {
        a = randInt(10, 99);
        b = randInt(2, 9);
      } else {
        a = randInt(min, max);
        b = randInt(min, max);
      }
      op = "\u00d7";
      answer = a * b;
      break;
    case "division":
      b = randInt(Math.max(min, 2), difficulty === "triple" ? 99 : max);
      answer = randInt(min, max);
      a = b * answer;
      op = "\u00f7";
      break;
    default:
      a = randInt(min, max);
      b = randInt(min, max);
      op = "+";
      answer = a + b;
  }

  return { a: a!, b: b!, op, answer: answer! };
}

export default function MathWorksheets() {
  const [operation, setOperation] = useState<Operation>("addition");
  const [difficulty, setDifficulty] = useState<Difficulty>("single");
  const [numProblems, setNumProblems] = useState(20);
  const [showAnswers, setShowAnswers] = useState(false);
  const [problems, setProblems] = useState(() =>
    Array.from({ length: 20 }, () => generateProblem("addition", "single"))
  );
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const { width, height } = getDimensions(orientation);

  const generateNew = useCallback(() => {
    setProblems(Array.from({ length: numProblems }, () => generateProblem(operation, difficulty)));
  }, [operation, difficulty, numProblems]);

  const handleOperationChange = (op: Operation) => {
    setOperation(op);
    setProblems(Array.from({ length: numProblems }, () => generateProblem(op, difficulty)));
  };

  const handleDifficultyChange = (diff: Difficulty) => {
    setDifficulty(diff);
    setProblems(Array.from({ length: numProblems }, () => generateProblem(operation, diff)));
  };

  const handleNumProblemsChange = (num: number) => {
    setNumProblems(num);
    setProblems(Array.from({ length: num }, () => generateProblem(operation, difficulty)));
  };

  const columns = numProblems <= 20 ? 2 : 3;
  const opLabel = operation === "mixed" ? "Mixed" : operation.charAt(0).toUpperCase() + operation.slice(1);
  const diffLabel = difficulty === "single" ? "Single Digit" : difficulty === "double" ? "Double Digit" : "Triple Digit";

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
      { "@type": "ListItem", position: 2, name: "Math Worksheets", item: "https://printablepolly.com/math-worksheets" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Math Worksheet Generator</h1>
      <p className="text-gray-600 mb-6">Generate printable math worksheets with random problems. Choose operation, difficulty, and number of problems, then print or download.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Operation</label>
            <select value={operation} onChange={(e) => handleOperationChange(e.target.value as Operation)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="addition">Addition (+)</option>
              <option value="subtraction">Subtraction (&minus;)</option>
              <option value="multiplication">Multiplication (&times;)</option>
              <option value="division">Division (&divide;)</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select value={difficulty} onChange={(e) => handleDifficultyChange(e.target.value as Difficulty)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="single">Single Digit (1-9)</option>
              <option value="double">Double Digit (10-99)</option>
              <option value="triple">Triple Digit (100-999)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Problems</label>
            <select value={numProblems} onChange={(e) => handleNumProblemsChange(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="10">10 problems</option>
              <option value="20">20 problems</option>
              <option value="30">30 problems</option>
              <option value="40">40 problems</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={showAnswers} onChange={(e) => setShowAnswers(e.target.checked)} className="rounded" />
              Show Answer Key
            </label>
          </div>
          <button
            onClick={generateNew}
            className="w-full bg-amber-500 text-white font-medium py-2 px-4 rounded hover:bg-amber-600 transition-colors"
          >
            Generate New
          </button>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="math-worksheet" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            <h2 className="text-xl font-bold text-center mb-1">Math Worksheet</h2>
            <p className="text-center text-sm text-gray-500 mb-1">{opLabel} &bull; {diffLabel}</p>
            <p className="text-center text-sm text-gray-400 mb-4">Name: ___________________________ Date: _______________</p>

            <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: "12px 24px" }}>
              {problems.map((p, i) => (
                <div key={i} className="flex items-center gap-2" style={{ fontSize: difficulty === "triple" ? "14px" : "16px" }}>
                  <span className="text-gray-400 text-xs w-6 text-right shrink-0">{i + 1}.</span>
                  <span className="font-mono">
                    {p.a} {p.op} {p.b} ={" "}
                  </span>
                  <span className="flex-1 border-b border-gray-300 min-w-[40px]" style={{ height: "20px" }} />
                </div>
              ))}
            </div>

            {showAnswers && (
              <div className="mt-8 pt-4 border-t-2 border-dashed border-gray-300">
                <h3 className="font-bold text-sm text-gray-700 mb-2">Answer Key</h3>
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(columns + 2, 5)}, 1fr)`, gap: "4px 16px", fontSize: "12px" }}>
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
