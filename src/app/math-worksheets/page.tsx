"use client";

import { useState, useCallback } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

type Operation = "addition" | "subtraction" | "multiplication" | "division" | "mixed" | "fractions" | "algebra" | "geometry";
type Difficulty = "single" | "double" | "triple";

interface Problem {
  display: string;
  answer: string;
}

const faqs = [
  { question: "How often should kids practice math worksheets?", answer: "Daily practice of 10-20 minutes is ideal for building math fluency. Short, consistent sessions are more effective than long, infrequent ones. Use the 'Generate New' button for fresh problems each session." },
  { question: "What difficulty level should I start with?", answer: "Start with Easy (single-digit for arithmetic, basic problems for fractions/algebra/geometry) to build confidence. Once a child can complete a sheet with 90%+ accuracy, move up. Hard difficulty includes mixed numbers, multi-step equations, and volume/surface area." },
  { question: "Should I use the answer key or let kids check their own work?", answer: "Both approaches work. Younger children benefit from parent-checked answers with immediate feedback. Older students can use the answer key to self-check, which builds independence and error-recognition skills." },
  { question: "What math topics are available?", answer: "We offer arithmetic (addition, subtraction, multiplication, division, mixed), fractions (adding/subtracting, simplifying, mixed numbers), algebra (solve-for-x equations from one-step to multi-step with distribution), and geometry (perimeter, area, volume, and surface area)." },
  { question: "Are fractions and algebra worksheets suitable for younger students?", answer: "Fractions on Easy difficulty use single-digit denominators and are great for 3rd-4th graders. Algebra Easy uses simple one-step equations suitable for 5th-6th graders. Geometry Easy covers perimeter, which many 3rd graders can handle. Adjust difficulty as your child progresses." },
];

// --- Utility functions ---

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRange(difficulty: Difficulty): [number, number] {
  switch (difficulty) {
    case "single": return [1, 9];
    case "double": return [10, 99];
    case "triple": return [100, 999];
  }
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

// --- Difficulty labels ---

function getDifficultyLabel(operation: Operation, difficulty: Difficulty): string {
  const isAdvanced = operation === "fractions" || operation === "algebra" || operation === "geometry";
  if (isAdvanced) {
    switch (difficulty) {
      case "single": return "Easy";
      case "double": return "Medium";
      case "triple": return "Hard";
    }
  }
  switch (difficulty) {
    case "single": return "Single Digit";
    case "double": return "Double Digit";
    case "triple": return "Triple Digit";
  }
}

function getDifficultyOptions(operation: Operation): { value: Difficulty; label: string }[] {
  const isAdvanced = operation === "fractions" || operation === "algebra" || operation === "geometry";
  if (isAdvanced) {
    return [
      { value: "single", label: "Easy" },
      { value: "double", label: "Medium" },
      { value: "triple", label: "Hard" },
    ];
  }
  return [
    { value: "single", label: "Single Digit (1-9)" },
    { value: "double", label: "Double Digit (10-99)" },
    { value: "triple", label: "Triple Digit (100-999)" },
  ];
}

// --- Arithmetic problem generator ---

function generateArithmeticProblem(operation: Operation, difficulty: Difficulty): Problem {
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

  return {
    display: `${a!} ${op!} ${b!} =`,
    answer: `${answer!}`,
  };
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
    case "double": { // Medium: simplify fractions with denominators <= 20
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
    case "triple": { // Hard: mixed numbers
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

// --- Algebra problem generator ---

function generateAlgebraProblem(difficulty: Difficulty): Problem {
  switch (difficulty) {
    case "single": { // Easy: one-step equations
      const type = Math.random();
      if (type < 0.25) {
        // x + a = b
        const x = randInt(1, 20);
        const a = randInt(1, 20);
        const b = x + a;
        return { display: `x + ${a} = ${b}`, answer: `x = ${x}` };
      } else if (type < 0.5) {
        // x - a = b
        const a = randInt(1, 15);
        const b = randInt(1, 15);
        const x = a + b;
        return { display: `x \u2212 ${a} = ${b}`, answer: `x = ${x}` };
      } else if (type < 0.75) {
        // ax = b
        const x = randInt(1, 12);
        const a = randInt(2, 10);
        const b = a * x;
        return { display: `${a}x = ${b}`, answer: `x = ${x}` };
      } else {
        // x / a = b
        const a = randInt(2, 10);
        const b = randInt(1, 12);
        const x = a * b;
        return { display: `x / ${a} = ${b}`, answer: `x = ${x}` };
      }
    }
    case "double": { // Medium: two-step equations
      const type = Math.random();
      if (type < 0.33) {
        // ax + b = c
        const x = randInt(1, 15);
        const a = randInt(2, 8);
        const b = randInt(1, 15);
        const c = a * x + b;
        return { display: `${a}x + ${b} = ${c}`, answer: `x = ${x}` };
      } else if (type < 0.66) {
        // ax - b = c
        const x = randInt(2, 15);
        const a = randInt(2, 8);
        const b = randInt(1, a * x - 1);
        const c = a * x - b;
        return { display: `${a}x \u2212 ${b} = ${c}`, answer: `x = ${x}` };
      } else {
        // x/a + b = c  OR  x/a - b = c
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
        // a(x + b) = c
        const x = randInt(1, 12);
        const a = randInt(2, 6);
        const b = randInt(1, 10);
        const c = a * (x + b);
        return { display: `${a}(x + ${b}) = ${c}`, answer: `x = ${x}` };
      } else if (type < 0.7) {
        // a(x - b) = c
        const x = randInt(3, 15);
        const b = randInt(1, x - 1);
        const a = randInt(2, 6);
        const c = a * (x - b);
        return { display: `${a}(x \u2212 ${b}) = ${c}`, answer: `x = ${x}` };
      } else {
        // a(x + b) + c = d
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

// --- Geometry problem generator ---

function generateGeometryProblem(difficulty: Difficulty): Problem {
  switch (difficulty) {
    case "single": { // Easy: perimeter of rectangles/squares
      const isSquare = Math.random() < 0.4;
      if (isSquare) {
        const side = randInt(2, 20);
        const perimeter = 4 * side;
        return {
          display: `Perimeter of a square with side ${side}`,
          answer: `${perimeter}`,
        };
      } else {
        const length = randInt(3, 25);
        const width = randInt(2, 20);
        const perimeter = 2 * (length + width);
        return {
          display: `Perimeter of a rectangle: ${length} \u00d7 ${width}`,
          answer: `${perimeter}`,
        };
      }
    }
    case "double": { // Medium: area of rectangles, triangles, circles
      const type = Math.random();
      if (type < 0.33) {
        // Rectangle area
        const length = randInt(2, 20);
        const width = randInt(2, 15);
        const area = length * width;
        return {
          display: `Area of a rectangle: ${length} \u00d7 ${width}`,
          answer: `${area}`,
        };
      } else if (type < 0.66) {
        // Triangle area (ensure even product for clean answer)
        const base = randInt(2, 20);
        const height = base % 2 === 0 ? randInt(2, 16) : randInt(1, 8) * 2;
        const area = (base * height) / 2;
        return {
          display: `Area of a triangle: base ${base}, height ${height}`,
          answer: `${area}`,
        };
      } else {
        // Circle area (use friendly radii)
        const radius = randInt(1, 10);
        const area = Math.round(Math.PI * radius * radius * 100) / 100;
        return {
          display: `Area of a circle: radius ${radius} (use \u03C0 \u2248 3.14)`,
          answer: `${(3.14 * radius * radius).toFixed(2)}`,
        };
      }
    }
    case "triple": { // Hard: volume, surface area
      const type = Math.random();
      if (type < 0.35) {
        // Volume of rectangular prism
        const l = randInt(2, 12);
        const w = randInt(2, 10);
        const h = randInt(2, 10);
        const volume = l * w * h;
        return {
          display: `Volume of a rectangular prism: ${l} \u00d7 ${w} \u00d7 ${h}`,
          answer: `${volume}`,
        };
      } else if (type < 0.65) {
        // Volume of cylinder
        const radius = randInt(1, 8);
        const height = randInt(2, 12);
        return {
          display: `Volume of a cylinder: radius ${radius}, height ${height} (use \u03C0 \u2248 3.14)`,
          answer: `${(3.14 * radius * radius * height).toFixed(2)}`,
        };
      } else {
        // Surface area of rectangular prism
        const l = randInt(2, 10);
        const w = randInt(2, 8);
        const h = randInt(2, 8);
        const sa = 2 * (l * w + l * h + w * h);
        return {
          display: `Surface area of a rectangular prism: ${l} \u00d7 ${w} \u00d7 ${h}`,
          answer: `${sa}`,
        };
      }
    }
  }
}

// --- Unified problem generator ---

function generateProblem(operation: Operation, difficulty: Difficulty): Problem {
  switch (operation) {
    case "fractions":
      return generateFractionProblem(difficulty);
    case "algebra":
      return generateAlgebraProblem(difficulty);
    case "geometry":
      return generateGeometryProblem(difficulty);
    default:
      return generateArithmeticProblem(operation, difficulty);
  }
}

// --- Determine if operation uses text-style layout ---

function isTextLayout(operation: Operation): boolean {
  return operation === "fractions" || operation === "algebra" || operation === "geometry";
}

export default function MathWorksheets() {
  const [operation, setOperation] = useState<Operation>("addition");
  const [difficulty, setDifficulty] = useState<Difficulty>("single");
  const [numProblems, setNumProblems] = useState(20);
  const [showAnswers, setShowAnswers] = useState(false);
  const [problems, setProblems] = useState<Problem[]>(() =>
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

  const columns = isTextLayout(operation) ? 1 : numProblems <= 20 ? 2 : 3;
  const opLabel =
    operation === "mixed" ? "Mixed Operations" :
    operation === "fractions" ? "Fractions" :
    operation === "algebra" ? "Algebra" :
    operation === "geometry" ? "Geometry" :
    operation.charAt(0).toUpperCase() + operation.slice(1);
  const diffLabel = getDifficultyLabel(operation, difficulty);
  const difficultyOptions = getDifficultyOptions(operation);

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
      <p className="text-gray-600 mb-6">Generate printable math worksheets with random problems. Choose from arithmetic, fractions, algebra, or geometry at any difficulty level.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
            <select value={operation} onChange={(e) => handleOperationChange(e.target.value as Operation)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <optgroup label="Arithmetic">
                <option value="addition">Addition (+)</option>
                <option value="subtraction">Subtraction (&minus;)</option>
                <option value="multiplication">Multiplication (&times;)</option>
                <option value="division">Division (&divide;)</option>
                <option value="mixed">Mixed Operations</option>
              </optgroup>
              <optgroup label="Advanced">
                <option value="fractions">Fractions</option>
                <option value="algebra">Algebra (Solve for x)</option>
                <option value="geometry">Geometry</option>
              </optgroup>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select value={difficulty} onChange={(e) => handleDifficultyChange(e.target.value as Difficulty)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              {difficultyOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
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

            {isTextLayout(operation) ? (
              <div className="space-y-3">
                {problems.map((p, i) => (
                  <div key={i} className="flex items-center gap-2" style={{ fontSize: "15px" }}>
                    <span className="text-gray-400 text-xs w-6 text-right shrink-0">{i + 1}.</span>
                    <span className="font-mono whitespace-nowrap">{p.display}</span>
                    <span className="flex-1 border-b border-gray-300 min-w-[60px]" style={{ height: "20px" }} />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: "12px 24px" }}>
                {problems.map((p, i) => (
                  <div key={i} className="flex items-center gap-2" style={{ fontSize: difficulty === "triple" ? "14px" : "16px" }}>
                    <span className="text-gray-400 text-xs w-6 text-right shrink-0">{i + 1}.</span>
                    <span className="font-mono">{p.display} </span>
                    <span className="flex-1 border-b border-gray-300 min-w-[40px]" style={{ height: "20px" }} />
                  </div>
                ))}
              </div>
            )}

          </div>

          {showAnswers && (
            <div className="printable-area bg-white border border-gray-200 shadow-sm mt-6" style={{ width: `${width}px`, minHeight: "200px", padding: "32px", breakBefore: "page" }}>
              <h2 className="text-xl font-bold text-center mb-1">Answer Key</h2>
              <p className="text-center text-sm text-gray-500 mb-4">{opLabel} &bull; {diffLabel}</p>
              <div style={{
                display: "grid",
                gridTemplateColumns: isTextLayout(operation)
                  ? `repeat(${Math.min(3, problems.length)}, 1fr)`
                  : `repeat(${Math.min(columns + 2, 5)}, 1fr)`,
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
