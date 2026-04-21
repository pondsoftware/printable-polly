"use client";

import Link from "next/link";

import { useState, useCallback } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

type Difficulty = "easy" | "medium" | "hard";
type ActivityType = "write3x" | "fillblank" | "scramble" | "all";

const DEFAULT_WORDS: Record<Difficulty, string[]> = {
  easy: ["cats", "dogs", "fish", "bird", "tree", "home", "play", "book", "rain", "jump", "ball", "cake", "hand", "milk", "star"],
  medium: ["garden", "purple", "dragon", "basket", "pencil", "animal", "winter", "bridge", "circle", "rocket", "jungle", "castle", "dinner", "rabbit", "island"],
  hard: ["adventure", "beautiful", "chocolate", "dangerous", "education", "fantastic", "giraffe", "hospital", "important", "jellyfish", "kangaroo", "lightning", "mountain", "necessary", "operation"],
};

const SENTENCES: Record<Difficulty, Record<string, string>> = {
  easy: {
    cats: "The ___ like to play with yarn.",
    dogs: "Two ___ ran in the park.",
    fish: "The ___ swam in the pond.",
    bird: "A ___ sang in the tree.",
    tree: "The ___ has green leaves.",
    home: "We went ___ after school.",
    play: "Let us ___ outside today.",
    book: "I read a ___ before bed.",
    rain: "The ___ made puddles outside.",
    jump: "Can you ___ over the rope?",
    ball: "Throw the ___ to me!",
    cake: "Mom baked a ___ for my birthday.",
    hand: "Raise your ___ to answer.",
    milk: "I drink ___ with breakfast.",
    star: "I saw a bright ___ tonight.",
  },
  medium: {
    garden: "We planted flowers in the ___.",
    purple: "Her favorite color is ___.",
    dragon: "The ___ breathed fire in the story.",
    basket: "Put the fruit in the ___.",
    pencil: "Sharpen your ___ before the test.",
    animal: "My favorite ___ is a dolphin.",
    winter: "We build snowmen in ___.",
    bridge: "We walked across the ___.",
    circle: "Draw a ___ on your paper.",
    rocket: "The ___ blasted into space.",
    jungle: "Lions live in the ___.",
    castle: "The princess lived in a ___.",
    dinner: "We eat ___ at six o'clock.",
    rabbit: "The ___ hopped across the field.",
    island: "We took a boat to the ___.",
  },
  hard: {
    adventure: "Going to camp was a great ___.",
    beautiful: "The sunset was ___.",
    chocolate: "I love ___ ice cream.",
    dangerous: "Swimming alone can be ___.",
    education: "A good ___ helps you succeed.",
    fantastic: "The movie was ___!",
    giraffe: "The ___ is the tallest animal.",
    hospital: "The doctor works at the ___.",
    important: "Studying for tests is ___.",
    jellyfish: "We saw a ___ at the aquarium.",
    kangaroo: "A ___ carries its baby in a pouch.",
    lightning: "The ___ lit up the sky.",
    mountain: "We hiked up the ___.",
    necessary: "Water is ___ for life.",
    operation: "The math ___ was addition.",
  },
};

function scrambleWord(word: string): string {
  const arr = word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const scrambled = arr.join("");
  return scrambled === word ? scrambleWord(word) : scrambled;
}

const faqs = [
  { question: "How many spelling words should kids practice per week?", answer: "Most educators recommend 10-15 spelling words per week for elementary students. Start with fewer words for younger children (5-8 for grades 1-2) and increase as they advance. The worksheets let you input your exact word list to match what's assigned at school." },
  { question: "What's the best way to use these spelling worksheets?", answer: "Use the write-3-times activity on Monday to introduce words, fill-in-the-blank on Wednesday for context practice, and word scramble on Thursday as a fun review. Friday can be test day. This spaced repetition approach builds lasting word memory." },
  { question: "Can I use my child's actual school spelling list?", answer: "Yes! Type or paste your child's spelling words into the word list field. The generator will create worksheets using exactly those words. You can also use the default word lists organized by difficulty level if you want extra practice." },
];

export default function SpellingWorksheetsClient() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [activityType, setActivityType] = useState<ActivityType>("all");
  const [customWords, setCustomWords] = useState("");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [scrambles, setScrambles] = useState<string[]>([]);
  const { width, height } = getDimensions(orientation);

  const words = customWords.trim()
    ? customWords.split(/[,\n]+/).map((w) => w.trim()).filter(Boolean).slice(0, 15)
    : DEFAULT_WORDS[difficulty];

  const generateScrambles = useCallback(() => {
    setScrambles(words.map((w) => scrambleWord(w)));
  }, [words]);

  // Auto-generate scrambles when needed
  if (scrambles.length !== words.length) {
    generateScrambles();
  }

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
      { "@type": "ListItem", position: 2, name: "Spelling Worksheets", item: "https://printablepolly.com/spelling-worksheets" },
    ],
  };

  const showWrite3x = activityType === "write3x" || activityType === "all";
  const showFillBlank = activityType === "fillblank" || activityType === "all";
  const showScramble = activityType === "scramble" || activityType === "all";

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Spelling Worksheet Generator</h1>
      <p className="text-gray-600 mb-6">Generate printable spelling practice worksheets. Input your own word list or use defaults. Includes write-each-word-3-times, fill-in-the-blank, and word scramble activities.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="easy">Easy (4-letter words)</option>
              <option value="medium">Medium (6-letter words)</option>
              <option value="hard">Hard (8+ letter words)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
            <select value={activityType} onChange={(e) => setActivityType(e.target.value as ActivityType)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="all">All Activities</option>
              <option value="write3x">Write 3 Times</option>
              <option value="fillblank">Fill in the Blank</option>
              <option value="scramble">Word Scramble</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Custom Words (optional)</label>
            <textarea
              value={customWords}
              onChange={(e) => setCustomWords(e.target.value)}
              placeholder="Enter words separated by commas or new lines..."
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm h-20 resize-none"
            />
          </div>
          <button
            onClick={generateScrambles}
            className="w-full bg-amber-500 text-white font-medium py-2 px-4 rounded hover:bg-amber-600 transition-colors"
          >
            Generate New
          </button>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="spelling-worksheet" />
        </div>

        <div className="flex-1 overflow-auto">
          {/* Write Each Word 3 Times */}
          {showWrite3x && (
            <div className="printable-area bg-white border border-gray-200 shadow-sm mb-6" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
              <h2 className="text-xl font-bold text-center mb-1">Spelling Practice - Write 3 Times</h2>
              <p className="text-center text-sm text-gray-500 mb-1">Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</p>
              <p className="text-center text-sm text-gray-400 mb-4">Name: ___________________________ Date: _______________</p>

              <table className="w-full border-collapse" style={{ fontSize: "14px" }}>
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2 bg-gray-50 text-left w-1/4">Word</th>
                    <th className="border border-gray-300 p-2 bg-gray-50 text-center">1st</th>
                    <th className="border border-gray-300 p-2 bg-gray-50 text-center">2nd</th>
                    <th className="border border-gray-300 p-2 bg-gray-50 text-center">3rd</th>
                  </tr>
                </thead>
                <tbody>
                  {words.map((word, i) => (
                    <tr key={i}>
                      <td className="border border-gray-300 p-2 font-medium">{word}</td>
                      <td className="border border-gray-300 p-2" style={{ height: "32px" }}></td>
                      <td className="border border-gray-300 p-2"></td>
                      <td className="border border-gray-300 p-2"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Fill in the Blank */}
          {showFillBlank && (
            <div className="printable-area bg-white border border-gray-200 shadow-sm mb-6" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px", breakBefore: "page" }}>
              <h2 className="text-xl font-bold text-center mb-1">Fill in the Blank</h2>
              <p className="text-center text-sm text-gray-500 mb-1">Use the spelling words to complete each sentence.</p>
              <p className="text-center text-sm text-gray-400 mb-4">Name: ___________________________ Date: _______________</p>

              <div className="mb-4 p-3 bg-gray-50 rounded border border-gray-200">
                <p className="text-xs text-gray-600 font-medium mb-1">Word Bank:</p>
                <p className="text-sm text-gray-700">{words.join("  |  ")}</p>
              </div>

              <div className="space-y-4">
                {words.map((word, i) => {
                  const sentence = SENTENCES[difficulty]?.[word] || `Use the word "${word}" in a sentence: ___`;
                  return (
                    <div key={i} className="flex items-start gap-2" style={{ fontSize: "14px" }}>
                      <span className="text-gray-400 text-xs w-6 text-right shrink-0 mt-0.5">{i + 1}.</span>
                      <span>{sentence}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Word Scramble */}
          {showScramble && (
            <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px", breakBefore: "page" }}>
              <h2 className="text-xl font-bold text-center mb-1">Word Scramble</h2>
              <p className="text-center text-sm text-gray-500 mb-1">Unscramble each word and write it correctly.</p>
              <p className="text-center text-sm text-gray-400 mb-4">Name: ___________________________ Date: _______________</p>

              <div className="space-y-4">
                {words.map((word, i) => (
                  <div key={i} className="flex items-center gap-3" style={{ fontSize: "15px" }}>
                    <span className="text-gray-400 text-xs w-6 text-right shrink-0">{i + 1}.</span>
                    <span className="font-mono font-bold tracking-wider w-32">{scrambles[i] || scrambleWord(word)}</span>
                    <span className="flex-1 border-b border-gray-300" style={{ height: "20px" }} />
                  </div>
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
          <Link href="/sight-words" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">👁️</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Sight Words</h3>
          </Link>
          <Link href="/handwriting-practice" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">✏️</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Handwriting Practice</h3>
          </Link>
          <Link href="/word-search" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🔍</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Word Search</h3>
          </Link>
          <Link href="/flash-cards" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🃏</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Flash Cards</h3>
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
