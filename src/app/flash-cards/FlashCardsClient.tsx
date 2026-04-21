"use client";

import Link from "next/link";

import { useState, useCallback } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

type CardType = "math" | "vocabulary" | "custom";
type MathOperation = "addition" | "subtraction" | "multiplication" | "division";
type BorderStyle = "solid" | "dashed" | "double" | "rounded";
type FontSizeOption = "small" | "medium" | "large";

interface FlashCard {
  front: string;
  back: string;
}

const FONT_SIZES: Record<FontSizeOption, number> = {
  small: 16,
  medium: 22,
  large: 30,
};

const DEFAULT_VOCAB: FlashCard[] = [
  { front: "abundant", back: "existing in large amounts" },
  { front: "benevolent", back: "kind and generous" },
  { front: "candid", back: "honest and straightforward" },
  { front: "diligent", back: "hardworking and careful" },
  { front: "eloquent", back: "fluent and persuasive in speech" },
  { front: "frugal", back: "careful with money" },
  { front: "genuine", back: "real and authentic" },
  { front: "humble", back: "modest, not proud" },
];

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMathCards(operation: MathOperation, count: number): FlashCard[] {
  const cards: FlashCard[] = [];
  for (let i = 0; i < count; i++) {
    let a: number, b: number, answer: number, symbol: string;
    switch (operation) {
      case "addition":
        a = randInt(1, 12);
        b = randInt(1, 12);
        answer = a + b;
        symbol = "+";
        break;
      case "subtraction":
        a = randInt(5, 18);
        b = randInt(1, a);
        answer = a - b;
        symbol = "\u2212";
        break;
      case "multiplication":
        a = randInt(2, 12);
        b = randInt(2, 12);
        answer = a * b;
        symbol = "\u00d7";
        break;
      case "division":
        b = randInt(2, 12);
        answer = randInt(2, 12);
        a = b * answer;
        symbol = "\u00f7";
        break;
    }
    cards.push({ front: `${a} ${symbol} ${b}`, back: `${answer}` });
  }
  return cards;
}

const faqs = [
  { question: "How many flash cards should I print per page?", answer: "We recommend 6 cards per page for younger children (larger text and easier to handle) and 8 cards per page for older students. The cards are sized to fit standard letter paper with cut lines for easy trimming." },
  { question: "What's the best way to use flash cards for studying?", answer: "Use the 'Leitner system': sort cards into piles based on how well you know them. Review difficult cards daily, known cards every few days. Shuffle regularly so you don't memorize order. For math facts, aim for instant recall (under 3 seconds)." },
  { question: "Can I print double-sided flash cards?", answer: "Yes! Print the front sides first, then flip the paper and print the back sides. The cards are arranged so fronts and backs align when printed double-sided with 'flip on short edge' selected in your printer settings." },
];

export default function FlashCardsClient() {
  const [cardType, setCardType] = useState<CardType>("math");
  const [mathOp, setMathOp] = useState<MathOperation>("multiplication");
  const [cardsPerPage, setCardsPerPage] = useState<6 | 8>(6);
  const [fontSize, setFontSize] = useState<FontSizeOption>("large");
  const [borderStyle, setBorderStyle] = useState<BorderStyle>("solid");
  const [customText, setCustomText] = useState("");
  const [cards, setCards] = useState<FlashCard[]>(() => generateMathCards("multiplication", 8));
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const { width, height } = getDimensions(orientation);

  const generateCards = useCallback(() => {
    if (cardType === "math") {
      setCards(generateMathCards(mathOp, cardsPerPage * 2));
    } else if (cardType === "vocabulary") {
      setCards([...DEFAULT_VOCAB]);
    } else {
      // Parse custom: "front | back" per line
      const lines = customText.split("\n").filter((l) => l.trim());
      const parsed = lines.map((line) => {
        const parts = line.split("|");
        return { front: parts[0]?.trim() || "", back: parts[1]?.trim() || "" };
      });
      setCards(parsed.length > 0 ? parsed : [{ front: "Front", back: "Back" }]);
    }
  }, [cardType, mathOp, cardsPerPage, customText]);

  const borderClass =
    borderStyle === "dashed" ? "border-dashed" :
    borderStyle === "double" ? "border-double border-4" :
    borderStyle === "rounded" ? "rounded-xl" :
    "";

  const cols = cardsPerPage === 6 ? 2 : 2;
  const rows = cardsPerPage === 6 ? 3 : 4;
  const cardHeight = Math.floor((height - 64) / rows) - 12;

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
      { "@type": "ListItem", position: 2, name: "Flash Cards", item: "https://printablepolly.com/flash-cards" },
    ],
  };

  // Split cards into pages
  const pages: FlashCard[][] = [];
  for (let i = 0; i < cards.length; i += cardsPerPage) {
    pages.push(cards.slice(i, i + cardsPerPage));
  }
  if (pages.length === 0) pages.push([]);

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Flash Card Generator</h1>
      <p className="text-gray-600 mb-6">Generate printable flash cards for math facts, vocabulary, or custom content. Print on letter paper with cut lines for easy trimming.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Type</label>
            <select value={cardType} onChange={(e) => setCardType(e.target.value as CardType)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="math">Math Facts</option>
              <option value="vocabulary">Vocabulary</option>
              <option value="custom">Custom (Front/Back)</option>
            </select>
          </div>
          {cardType === "math" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Operation</label>
              <select value={mathOp} onChange={(e) => setMathOp(e.target.value as MathOperation)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                <option value="addition">Addition</option>
                <option value="subtraction">Subtraction</option>
                <option value="multiplication">Multiplication</option>
                <option value="division">Division</option>
              </select>
            </div>
          )}
          {cardType === "custom" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Custom Cards (front | back)</label>
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder={"apple | a red fruit\ndog | a pet animal\n2 + 2 | 4"}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm h-24 resize-none"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cards Per Page</label>
            <select value={cardsPerPage} onChange={(e) => setCardsPerPage(parseInt(e.target.value) as 6 | 8)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="6">6 cards</option>
              <option value="8">8 cards</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
            <select value={fontSize} onChange={(e) => setFontSize(e.target.value as FontSizeOption)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Border Style</label>
            <select value={borderStyle} onChange={(e) => setBorderStyle(e.target.value as BorderStyle)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="double">Double</option>
              <option value="rounded">Rounded</option>
            </select>
          </div>
          <button
            onClick={generateCards}
            className="w-full bg-amber-500 text-white font-medium py-2 px-4 rounded hover:bg-amber-600 transition-colors"
          >
            Generate New
          </button>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="flash-cards" />
        </div>

        <div className="flex-1 overflow-auto">
          {pages.map((page, pi) => (
            <div key={pi} className="printable-area bg-white border border-gray-200 shadow-sm mb-6" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px", breakBefore: pi > 0 ? "page" : undefined }}>
              <p className="text-center text-xs text-gray-400 mb-3">FRONT - Cut along dashed lines ✂️</p>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "0px" }}>
                {page.map((card, i) => (
                  <div
                    key={i}
                    className={`border-2 border-gray-400 ${borderClass} flex items-center justify-center text-center`}
                    style={{ height: `${cardHeight}px`, fontSize: `${FONT_SIZES[fontSize]}px`, borderStyle: borderStyle === "dashed" ? "dashed" : borderStyle === "double" ? "double" : "solid" }}
                  >
                    <span className="font-bold px-2">{card.front}</span>
                  </div>
                ))}
              </div>

              <p className="text-center text-xs text-gray-400 mt-6 mb-3">BACK - Cut along dashed lines ✂️</p>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "0px" }}>
                {page.map((card, i) => (
                  <div
                    key={i}
                    className={`border-2 border-gray-300 ${borderClass} flex items-center justify-center text-center bg-gray-50`}
                    style={{ height: `${cardHeight}px`, fontSize: `${FONT_SIZES[fontSize]}px`, borderStyle: borderStyle === "dashed" ? "dashed" : borderStyle === "double" ? "double" : "solid" }}
                  >
                    <span className="px-2">{card.back}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
          <Link href="/spelling-worksheets" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">📝</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Spelling Worksheets</h3>
          </Link>
          <Link href="/sight-words" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">👁️</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Sight Words</h3>
          </Link>
          <Link href="/multiplication-table" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">✖️</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Multiplication Table</h3>
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
