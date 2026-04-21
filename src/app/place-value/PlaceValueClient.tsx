"use client";

import Link from "next/link";

import { useState, useCallback } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

type Difficulty = "easy" | "medium" | "hard";
type ProblemType = "identify" | "expanded" | "compare" | "standard" | "mixed";

interface Problem {
  display: string;
  answer: string;
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMaxNumber(difficulty: Difficulty): number {
  switch (difficulty) {
    case "easy": return 99;
    case "medium": return 999;
    case "hard": return 9999;
  }
}

function getMinNumber(difficulty: Difficulty): number {
  switch (difficulty) {
    case "easy": return 10;
    case "medium": return 100;
    case "hard": return 1000;
  }
}

function getPlaceNames(difficulty: Difficulty): string[] {
  switch (difficulty) {
    case "easy": return ["ones", "tens"];
    case "medium": return ["ones", "tens", "hundreds"];
    case "hard": return ["ones", "tens", "hundreds", "thousands"];
  }
}

function getDigitValue(num: number, place: string): number {
  const str = num.toString();
  const digits = str.split("").reverse();
  switch (place) {
    case "ones": return parseInt(digits[0] || "0");
    case "tens": return parseInt(digits[1] || "0") * 10;
    case "hundreds": return parseInt(digits[2] || "0") * 100;
    case "thousands": return parseInt(digits[3] || "0") * 1000;
    default: return 0;
  }
}

function toExpandedForm(num: number): string {
  const str = num.toString();
  const parts: string[] = [];
  for (let i = 0; i < str.length; i++) {
    const digit = parseInt(str[i]);
    if (digit > 0) {
      const placeValue = digit * Math.pow(10, str.length - 1 - i);
      parts.push(placeValue.toString());
    }
  }
  return parts.join(" + ");
}

function generateIdentifyProblem(difficulty: Difficulty): Problem {
  const num = randInt(getMinNumber(difficulty), getMaxNumber(difficulty));
  const places = getPlaceNames(difficulty);
  const place = places[Math.floor(Math.random() * places.length)];
  const value = getDigitValue(num, place);
  return {
    display: `In the number ${num.toLocaleString()}, what is the value of the digit in the ${place} place?`,
    answer: `${value}`,
  };
}

function generateExpandedProblem(difficulty: Difficulty): Problem {
  const num = randInt(getMinNumber(difficulty), getMaxNumber(difficulty));
  return {
    display: `Write ${num.toLocaleString()} in expanded form:`,
    answer: toExpandedForm(num),
  };
}

function generateCompareProblem(difficulty: Difficulty): Problem {
  const a = randInt(getMinNumber(difficulty), getMaxNumber(difficulty));
  let b = randInt(getMinNumber(difficulty), getMaxNumber(difficulty));
  // Ensure they're different
  while (b === a) b = randInt(getMinNumber(difficulty), getMaxNumber(difficulty));
  const symbol = a > b ? ">" : a < b ? "<" : "=";
  return {
    display: `Compare: ${a.toLocaleString()} ___ ${b.toLocaleString()}  (write <, >, or =)`,
    answer: symbol,
  };
}

function generateStandardFormProblem(difficulty: Difficulty): Problem {
  const num = randInt(getMinNumber(difficulty), getMaxNumber(difficulty));
  const expanded = toExpandedForm(num);
  return {
    display: `Write in standard form: ${expanded}`,
    answer: `${num.toLocaleString()}`,
  };
}

function generateProblem(difficulty: Difficulty, type: ProblemType): Problem {
  if (type === "mixed") {
    const types: ProblemType[] = ["identify", "expanded", "compare", "standard"];
    type = types[Math.floor(Math.random() * types.length)];
  }
  switch (type) {
    case "identify": return generateIdentifyProblem(difficulty);
    case "expanded": return generateExpandedProblem(difficulty);
    case "compare": return generateCompareProblem(difficulty);
    case "standard": return generateStandardFormProblem(difficulty);
    default: return generateIdentifyProblem(difficulty);
  }
}

const faqs = [
  { question: "What is place value and when do kids learn it?", answer: "Place value is the value of a digit based on its position in a number. For example, in 352, the 3 is worth 300, the 5 is worth 50, and the 2 is worth 2. Children typically learn ones and tens in 1st grade, hundreds in 2nd grade, and thousands in 3rd grade." },
  { question: "How do these worksheets help with place value understanding?", answer: "These worksheets provide four types of practice: identifying digit values, writing expanded form, comparing numbers, and converting from expanded to standard form. Each type reinforces a different aspect of place value understanding. Use 'Mixed' mode for comprehensive review." },
  { question: "What difficulty should I choose?", answer: "Easy covers ones and tens (2-digit numbers, best for 1st grade). Medium adds hundreds (3-digit numbers, best for 2nd grade). Hard includes thousands (4-digit numbers, best for 3rd grade). Start one level below your child's grade if they're struggling with the concept." },
];

export default function PlaceValueClient() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [problemType, setProblemType] = useState<ProblemType>("mixed");
  const [numProblems, setNumProblems] = useState(12);
  const [showAnswers, setShowAnswers] = useState(false);
  const [problems, setProblems] = useState<Problem[]>(() =>
    Array.from({ length: 12 }, () => generateProblem("easy", "mixed"))
  );
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const { width, height } = getDimensions(orientation);

  const generateNew = useCallback(() => {
    setProblems(Array.from({ length: numProblems }, () => generateProblem(difficulty, problemType)));
  }, [difficulty, problemType, numProblems]);

  const handleDifficultyChange = (diff: Difficulty) => {
    setDifficulty(diff);
    setProblems(Array.from({ length: numProblems }, () => generateProblem(diff, problemType)));
  };

  const handleTypeChange = (type: ProblemType) => {
    setProblemType(type);
    setProblems(Array.from({ length: numProblems }, () => generateProblem(difficulty, type)));
  };

  const handleNumChange = (num: number) => {
    setNumProblems(num);
    setProblems(Array.from({ length: num }, () => generateProblem(difficulty, problemType)));
  };

  const diffLabel = difficulty === "easy" ? "Ones & Tens" : difficulty === "medium" ? "Through Hundreds" : "Through Thousands";

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
      { "@type": "ListItem", position: 2, name: "Place Value", item: "https://printablepolly.com/place-value" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Place Value Worksheets</h1>
      <p className="text-gray-600 mb-6">Generate printable place value worksheets. Practice identifying digit values, expanded form, comparing numbers, and writing in standard form.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select value={difficulty} onChange={(e) => handleDifficultyChange(e.target.value as Difficulty)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="easy">Easy (ones & tens)</option>
              <option value="medium">Medium (through hundreds)</option>
              <option value="hard">Hard (through thousands)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Problem Type</label>
            <select value={problemType} onChange={(e) => handleTypeChange(e.target.value as ProblemType)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="mixed">Mixed (All Types)</option>
              <option value="identify">Identify Digit Value</option>
              <option value="expanded">Expanded Form</option>
              <option value="compare">Compare Numbers</option>
              <option value="standard">Standard Form</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Problems</label>
            <select value={numProblems} onChange={(e) => handleNumChange(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="8">8 problems</option>
              <option value="10">10 problems</option>
              <option value="12">12 problems</option>
              <option value="15">15 problems</option>
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
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="place-value" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            <h2 className="text-xl font-bold text-center mb-1">Place Value Worksheet</h2>
            <p className="text-center text-sm text-gray-500 mb-1">{diffLabel}</p>
            <p className="text-center text-sm text-gray-400 mb-4">Name: ___________________________ Date: _______________</p>

            <div className="space-y-4">
              {problems.map((p, i) => (
                <div key={i} className="flex items-start gap-2" style={{ fontSize: "14px" }}>
                  <span className="text-gray-400 text-xs w-6 text-right shrink-0 mt-0.5">{i + 1}.</span>
                  <div className="flex-1">
                    <span>{p.display}</span>
                    <div className="border-b border-gray-300 mt-2" style={{ height: "20px", maxWidth: "200px" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showAnswers && (
            <div className="printable-area bg-white border border-gray-200 shadow-sm mt-6" style={{ width: `${width}px`, minHeight: "200px", padding: "32px", breakBefore: "page" }}>
              <h2 className="text-xl font-bold text-center mb-4">Answer Key</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px 16px", fontSize: "13px" }}>
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

      {/* Related Templates */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Templates</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href="/math-worksheets" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">➕</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Math Worksheets</h3>
          </Link>
          <Link href="/number-line" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">📏</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Number Line</h3>
          </Link>
          <Link href="/telling-time" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🕐</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Telling Time</h3>
          </Link>
          <Link href="/fractions-worksheets" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">½</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Fractions Worksheets</h3>
          </Link>
        </div>
      </section>

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
