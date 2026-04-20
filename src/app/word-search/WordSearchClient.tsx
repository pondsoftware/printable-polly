"use client";

import Link from "next/link";

import { useState, useCallback, useEffect } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "How do word search puzzles help with learning?", answer: "Word searches improve vocabulary recognition, spelling, and pattern detection. They are widely used in classrooms to reinforce new vocabulary in a fun, low-pressure way. They also build focus and attention to detail." },
  { question: "Can I use my own words in the word search?", answer: "Yes! Enter your own words separated by commas or one per line. The generator will place them randomly in the grid and fill the remaining cells with random letters. You can re-randomize placement as many times as you like." },
  { question: "What grid size should I choose?", answer: "A 10x10 grid works well for short word lists (5-8 words). Use 15x15 for longer lists or longer words. The 20x20 grid is great for challenging puzzles with 15+ words. If a word doesn't fit, try a larger grid." },
];

const defaultWords = "PRINT, PAPER, PENCIL, BOOK, SCHOOL, READ, WRITE, LEARN, STUDY, PUZZLE";

type Direction = "horizontal" | "vertical" | "diagonal";

function generateGrid(size: number, words: string[]): { grid: string[][]; placedWords: string[] } {
  const grid: string[][] = Array.from({ length: size }, () => Array(size).fill(""));
  const placedWords: string[] = [];

  const directions: { dr: number; dc: number; name: Direction }[] = [
    { dr: 0, dc: 1, name: "horizontal" },
    { dr: 1, dc: 0, name: "vertical" },
    { dr: 1, dc: 1, name: "diagonal" },
  ];

  for (const word of words) {
    const upper = word.toUpperCase();
    if (upper.length > size) continue;

    let placed = false;
    for (let attempt = 0; attempt < 100; attempt++) {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const maxRow = size - upper.length * dir.dr;
      const maxCol = size - upper.length * dir.dc;
      if (maxRow <= 0 || maxCol <= 0) continue;

      const startRow = Math.floor(Math.random() * maxRow);
      const startCol = Math.floor(Math.random() * maxCol);

      let canPlace = true;
      for (let k = 0; k < upper.length; k++) {
        const r = startRow + k * dir.dr;
        const c = startCol + k * dir.dc;
        if (grid[r][c] !== "" && grid[r][c] !== upper[k]) {
          canPlace = false;
          break;
        }
      }

      if (canPlace) {
        for (let k = 0; k < upper.length; k++) {
          const r = startRow + k * dir.dr;
          const c = startCol + k * dir.dc;
          grid[r][c] = upper[k];
        }
        placedWords.push(upper);
        placed = true;
        break;
      }
    }

    if (!placed) {
      // Skip words that couldn't be placed
    }
  }

  // Fill empty cells with random letters
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === "") {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return { grid, placedWords };
}

function parseWords(input: string): string[] {
  return input
    .split(/[,\n]+/)
    .map((w) => w.trim().replace(/[^A-Za-z]/g, ""))
    .filter((w) => w.length > 0);
}

export default function WordSearchClient() {
  const [wordInput, setWordInput] = useState(defaultWords);
  const [gridSize, setGridSize] = useState(12);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [grid, setGrid] = useState<string[][]>([]);
  const [placedWords, setPlacedWords] = useState<string[]>([]);
  const [seed, setSeed] = useState(0);
  const { width, height } = getDimensions(orientation);

  const generate = useCallback(() => {
    const words = parseWords(wordInput);
    const result = generateGrid(gridSize, words);
    setGrid(result.grid);
    setPlacedWords(result.placedWords);
  }, [wordInput, gridSize]);

  useEffect(() => {
    generate();
  }, [generate, seed]);

  const handleGenerate = () => {
    setSeed((s) => s + 1);
  };

  const cellSize = Math.min(Math.floor((width - 64) / gridSize), 36);

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
      { "@type": "ListItem", position: 2, name: "Word Search", item: "https://printablepolly.com/word-search" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Word Search Generator</h1>
      <p className="text-gray-600 mb-6">Create a custom word search puzzle with your own words. Choose a grid size, enter your words, and print or download.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Grid Size</label>
            <select value={gridSize} onChange={(e) => setGridSize(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="10">10 x 10</option>
              <option value="12">12 x 12</option>
              <option value="15">15 x 15</option>
              <option value="20">20 x 20</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Words</label>
            <textarea
              value={wordInput}
              onChange={(e) => setWordInput(e.target.value)}
              rows={6}
              className="w-full border border-gray-300 rounded px-2 py-1 text-xs font-mono"
              placeholder="Enter words separated by commas or one per line"
            />
          </div>
          <button
            onClick={handleGenerate}
            className="w-full bg-amber-500 text-white font-medium py-2 px-4 rounded hover:bg-amber-600 transition-colors"
          >
            Generate New
          </button>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="word-search" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            <h2 className="text-xl font-bold text-center mb-1">Word Search</h2>
            <p className="text-center text-sm text-gray-500 mb-4">Find the {placedWords.length} hidden words!</p>

            <div className="flex justify-center mb-6">
              <div
                className="inline-grid gap-0"
                style={{
                  gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
                  gridTemplateRows: `repeat(${gridSize}, ${cellSize}px)`,
                }}
              >
                {grid.flatMap((row, r) =>
                  row.map((letter, c) => (
                    <div
                      key={`${r}-${c}`}
                      className="flex items-center justify-center border border-gray-200 font-mono font-bold text-gray-800"
                      style={{
                        width: `${cellSize}px`,
                        height: `${cellSize}px`,
                        fontSize: `${Math.max(cellSize * 0.5, 10)}px`,
                      }}
                    >
                      {letter}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="border-t border-gray-300 pt-3">
              <h3 className="font-bold text-sm mb-2 text-center">Words to Find</h3>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
                {placedWords.map((word) => (
                  <span key={word} className="font-mono">{word}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Templates */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Templates</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link key="/sight-words" href="/sight-words" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">👁️</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Sight Words</h3>
            </Link>
            <Link key="/bingo-cards" href="/bingo-cards" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">🎱</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Bingo Cards</h3>
            </Link>
            <Link key="/handwriting-practice" href="/handwriting-practice" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">✏️</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Handwriting Practice</h3>
            </Link>
            <Link key="/coloring-pages" href="/coloring-pages" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">🎨</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Coloring Pages</h3>
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
