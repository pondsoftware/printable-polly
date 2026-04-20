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
    question: "What algebra skills do these worksheets cover?",
    answer: "Easy worksheets cover one-step equations — adding, subtracting, multiplying, and dividing to isolate x. Medium worksheets introduce two-step equations like 2x + 3 = 11 or x/4 − 2 = 5. Hard worksheets include multi-step equations with distribution, such as 3(x + 2) = 21 and 3(x + 2) + 5 = 23.",
  },
  {
    question: "What grade levels are these algebra worksheets for?",
    answer: "Easy one-step equations are suitable for 5th–6th graders being introduced to algebra. Medium two-step equations align with 6th–7th grade standards. Hard multi-step problems with distribution are appropriate for 7th–8th graders and pre-algebra or Algebra I courses.",
  },
  {
    question: "How do I help a student who is struggling with solving for x?",
    answer: "Start with Easy difficulty to build confidence with one-step equations. Encourage students to always do the same operation to both sides and to write out each step. Once they can consistently solve one-step problems, introduce the idea of 'undoing' operations in reverse order for two-step equations. Use the answer key to immediately correct mistakes before bad habits form.",
  },
];

// --- Utility functions ---

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --- Algebra problem generator ---

function generateAlgebraProblem(difficulty: Difficulty): Problem {
  switch (difficulty) {
    case "single": { // Easy: one-step equations
      const type = Math.random();
      if (type < 0.25) {
        const x = randInt(1, 20);
        const a = randInt(1, 20);
        const b = x + a;
        return { display: `x + ${a} = ${b}`, answer: `x = ${x}` };
      } else if (type < 0.5) {
        const a = randInt(1, 15);
        const b = randInt(1, 15);
        const x = a + b;
        return { display: `x \u2212 ${a} = ${b}`, answer: `x = ${x}` };
      } else if (type < 0.75) {
        const x = randInt(1, 12);
        const a = randInt(2, 10);
        const b = a * x;
        return { display: `${a}x = ${b}`, answer: `x = ${x}` };
      } else {
        const a = randInt(2, 10);
        const b = randInt(1, 12);
        const x = a * b;
        return { display: `x / ${a} = ${b}`, answer: `x = ${x}` };
      }
    }
    case "double": { // Medium: two-step equations
      const type = Math.random();
      if (type < 0.33) {
        const x = randInt(1, 15);
        const a = randInt(2, 8);
        const b = randInt(1, 15);
        const c = a * x + b;
        return { display: `${a}x + ${b} = ${c}`, answer: `x = ${x}` };
      } else if (type < 0.66) {
        const x = randInt(2, 15);
        const a = randInt(2, 8);
        const b = randInt(1, a * x - 1);
        const c = a * x - b;
        return { display: `${a}x \u2212 ${b} = ${c}`, answer: `x = ${x}` };
      } else {
        const a = randInt(2, 8);
        const x = a * randInt(1, 10);
        const isAdd = Math.random() < 0.5;
        const b = randInt(1, 10);
        const c = isAdd ? (x / a) + b : (x / a) - b;
        if (c <= 0) return generateAlgebraProblem(difficulty);
        const op = isAdd ? "+" : "\u2212";
        return { display: `x / ${a} ${op} ${b} = ${c}`, answer: `x = ${x}` };
      }
    }
    case "triple": { // Hard: multi-step with distribution
      const type = Math.random();
      if (type < 0.4) {
        const x = randInt(1, 12);
        const a = randInt(2, 6);
        const b = randInt(1, 10);
        const c = a * (x + b);
        return { display: `${a}(x + ${b}) = ${c}`, answer: `x = ${x}` };
      } else if (type < 0.7) {
        const x = randInt(3, 15);
        const b = randInt(1, x - 1);
        const a = randInt(2, 6);
        const c = a * (x - b);
        return { display: `${a}(x \u2212 ${b}) = ${c}`, answer: `x = ${x}` };
      } else {
        const x = randInt(1, 10);
        const a = randInt(2, 5);
        const b = randInt(1, 8);
        const c = randInt(1, 10);
        const d = a * (x + b) + c;
        return { display: `${a}(x + ${b}) + ${c} = ${d}`, answer: `x = ${x}` };
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

export default function AlgebraWorksheets() {
  const [difficulty, setDifficulty] = useState<Difficulty>("single");
  const [numProblems, setNumProblems] = useState(20);
  const [showAnswers, setShowAnswers] = useState(false);
  const [problems, setProblems] = useState<Problem[]>(() =>
    Array.from({ length: 20 }, () => generateAlgebraProblem("single"))
  );
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const { width, height } = getDimensions(orientation);

  const generateNew = useCallback(() => {
    setProblems(Array.from({ length: numProblems }, () => generateAlgebraProblem(difficulty)));
  }, [difficulty, numProblems]);

  const handleDifficultyChange = (diff: Difficulty) => {
    setDifficulty(diff);
    setProblems(Array.from({ length: numProblems }, () => generateAlgebraProblem(diff)));
  };

  const handleNumProblemsChange = (num: number) => {
    setNumProblems(num);
    setProblems(Array.from({ length: num }, () => generateAlgebraProblem(difficulty)));
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
      { "@type": "ListItem", position: 2, name: "Algebra Worksheets", item: "https://printablepolly.com/algebra-worksheets" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Algebra Worksheet Generator</h1>
      <p className="text-gray-600 mb-6">Generate free printable algebra worksheets. Practice solving for x with one-step, two-step, and multi-step equations — includes answer keys.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => handleDifficultyChange(e.target.value as Difficulty)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="single">Easy — One-step equations</option>
              <option value="double">Medium — Two-step equations</option>
              <option value="triple">Hard — Multi-step with distribution</option>
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
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="algebra-worksheet" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            <h2 className="text-xl font-bold text-center mb-1">Algebra Worksheet</h2>
            <p className="text-center text-sm text-gray-500 mb-1">Solve for x &bull; {diffLabel}</p>
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
              <p className="text-center text-sm text-gray-500 mb-4">Algebra &bull; {diffLabel}</p>
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
