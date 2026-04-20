"use client";

import Link from "next/link";

import { useState, useCallback } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "How many unique bingo cards can I generate?", answer: "With the Numbers 1-75 theme, there are millions of possible unique card combinations. Each time you click 'Generate New Cards', you get a completely new randomized set. For custom words, the combinations depend on how many words you provide." },
  { question: "What are the standard bingo column ranges?", answer: "In traditional bingo, each column has a specific range: B (1-15), I (16-30), N (31-45), G (46-60), and O (61-75). The center space is always FREE. This format is used in most bingo halls and games." },
  { question: "Can I use these bingo cards for classroom activities?", answer: "Absolutely! Bingo is a popular educational tool. Use the Custom Words mode to create vocabulary bingo, spelling bingo, math fact bingo, or any subject-specific game. Print multiple unique cards for the whole class." },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateNumberCard(): string[][] {
  const columns: string[][] = [];
  const ranges = [
    [1, 15],
    [16, 30],
    [31, 45],
    [46, 60],
    [61, 75],
  ];

  for (let col = 0; col < 5; col++) {
    const [min, max] = ranges[col];
    const pool: number[] = [];
    for (let n = min; n <= max; n++) pool.push(n);
    const picked = shuffleArray(pool).slice(0, 5);
    columns.push(picked.map(String));
  }

  // Set center space to FREE
  columns[2][2] = "FREE";
  return columns;
}

function generateCustomCard(words: string[]): string[][] {
  const shuffled = shuffleArray(words).slice(0, 25);
  const columns: string[][] = [[], [], [], [], []];

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const idx = row * 5 + col;
      columns[col].push(shuffled[idx] || "");
    }
  }

  // Set center space to FREE
  columns[2][2] = "FREE";
  return columns;
}

const BINGO = ["B", "I", "N", "G", "O"];

function BingoCard({ columns, cardSize }: { columns: string[][]; cardSize: "full" | "half" | "quarter" }) {
  const sizeClasses = {
    full: { grid: "w-full", cell: "h-16 text-base", header: "text-lg py-2" },
    half: { grid: "w-full", cell: "h-12 text-sm", header: "text-base py-1.5" },
    quarter: { grid: "w-full", cell: "h-9 text-xs", header: "text-sm py-1" },
  };

  const sizes = sizeClasses[cardSize];

  return (
    <div className={`${sizes.grid} border-2 border-gray-800`}>
      <div className="grid grid-cols-5">
        {BINGO.map((letter) => (
          <div key={letter} className={`${sizes.header} font-bold text-center bg-gray-800 text-white border-r border-gray-600 last:border-r-0`}>
            {letter}
          </div>
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, row) => (
        <div key={row} className="grid grid-cols-5">
          {columns.map((col, colIdx) => (
            <div
              key={colIdx}
              className={`${sizes.cell} flex items-center justify-center border border-gray-300 font-medium ${col[row] === "FREE" ? "bg-gray-100 font-bold text-gray-600" : ""}`}
            >
              {col[row]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function BingoCardsClient() {
  const [theme, setTheme] = useState<"numbers" | "custom">("numbers");
  const [customWords, setCustomWords] = useState("");
  const [cardCount, setCardCount] = useState(1);
  const [cards, setCards] = useState<string[][][]>(() => [generateNumberCard()]);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const { width, height } = getDimensions(orientation);

  const generateCards = useCallback(() => {
    const newCards: string[][][] = [];
    const count = cardCount;

    if (theme === "numbers") {
      for (let i = 0; i < count; i++) {
        newCards.push(generateNumberCard());
      }
    } else {
      const words = customWords
        .split("\n")
        .map((w) => w.trim())
        .filter((w) => w.length > 0);
      if (words.length < 24) {
        alert("Please enter at least 24 words (the center space is FREE).");
        return;
      }
      for (let i = 0; i < count; i++) {
        newCards.push(generateCustomCard(words));
      }
    }

    setCards(newCards);
  }, [theme, customWords, cardCount]);

  const cardSize = cardCount === 1 ? "full" : cardCount === 2 ? "half" : "quarter";

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
      { "@type": "ListItem", position: 2, name: "Bingo Cards", item: "https://printablepolly.com/bingo-cards" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Bingo Card Generator</h1>
      <p className="text-gray-600 mb-6">Generate printable bingo cards with classic numbers or your own custom words. Perfect for parties, classrooms, and game nights.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value as "numbers" | "custom")} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="numbers">Numbers 1-75</option>
              <option value="custom">Custom Words</option>
            </select>
          </div>

          {theme === "custom" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Words (one per line, 25+)</label>
              <textarea
                value={customWords}
                onChange={(e) => setCustomWords(e.target.value)}
                rows={8}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                placeholder={"apple\nbanana\ncherry\n..."}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cards to Generate</label>
            <select value={cardCount} onChange={(e) => setCardCount(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="1">1 card</option>
              <option value="2">2 cards</option>
              <option value="4">4 cards</option>
            </select>
          </div>

          <button
            onClick={generateCards}
            className="w-full bg-gray-800 text-white font-medium py-2 px-4 rounded hover:bg-gray-900 transition-colors"
          >
            Generate New Cards
          </button>

          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="bingo-cards" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            <h2 className="text-xl font-bold text-center mb-4">Bingo</h2>

            {cardCount === 1 && (
              <div className="max-w-md mx-auto">
                <BingoCard columns={cards[0]} cardSize="full" />
              </div>
            )}

            {cardCount === 2 && (
              <div className="space-y-6">
                {cards.map((card, i) => (
                  <div key={i} className="max-w-md mx-auto">
                    <BingoCard columns={card} cardSize="half" />
                  </div>
                ))}
              </div>
            )}

            {cardCount === 4 && (
              <div className="grid grid-cols-2 gap-4">
                {cards.map((card, i) => (
                  <div key={i}>
                    <BingoCard columns={card} cardSize="quarter" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Templates */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Templates</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link key="/word-search" href="/word-search" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">🔍</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Word Search</h3>
            </Link>
            <Link key="/coloring-pages" href="/coloring-pages" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">🎨</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Coloring Pages</h3>
            </Link>
            <Link key="/comic-strip" href="/comic-strip" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">💬</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Comic Strip</h3>
            </Link>
            <Link key="/storyboard" href="/storyboard" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">🎬</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Storyboard</h3>
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
