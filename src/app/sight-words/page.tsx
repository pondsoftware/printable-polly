"use client";

import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

type GradeLevel = "prek" | "kindergarten" | "first" | "second";
type FontSize = "large" | "medium" | "small";

const WORD_LISTS: Record<GradeLevel, { label: string; words: string[] }> = {
  prek: {
    label: "Pre-K",
    words: ["the", "and", "a", "I", "is", "it", "to", "in", "my", "we", "go", "me", "no", "up", "he", "do", "so", "on", "at", "am"],
  },
  kindergarten: {
    label: "Kindergarten",
    words: ["you", "can", "had", "her", "was", "one", "our", "out", "are", "has", "his", "how", "man", "new", "now", "old", "see", "way", "who", "all", "did", "get", "like", "this", "will", "yes", "big", "come", "look", "make"],
  },
  first: {
    label: "1st Grade",
    words: ["after", "again", "could", "every", "from", "give", "have", "just", "know", "live", "once", "open", "over", "some", "stop", "take", "thank", "them", "then", "walk", "were", "when", "about", "been", "before", "does", "here", "right", "think", "where"],
  },
  second: {
    label: "2nd Grade",
    words: ["always", "around", "because", "bring", "carry", "clean", "drink", "eight", "fall", "found", "goes", "green", "its", "laugh", "light", "long", "much", "myself", "never", "only", "own", "pick", "pull", "read", "shall", "small", "start", "today", "upon", "write"],
  },
};

const FONT_SIZES: Record<FontSize, { label: string; wordHeight: number; fontSize: number }> = {
  large: { label: "Large", wordHeight: 64, fontSize: 32 },
  medium: { label: "Medium", wordHeight: 52, fontSize: 26 },
  small: { label: "Small", wordHeight: 42, fontSize: 21 },
};

const faqs = [
  { question: "What are sight words and why are they important?", answer: "Sight words (also called high-frequency words) are common words that appear repeatedly in text. Children are taught to recognize them instantly 'by sight' rather than sounding them out. Mastering sight words improves reading fluency and comprehension because these words make up 50-75% of all text children encounter." },
  { question: "How should kids practice sight words?", answer: "Use a multi-sensory approach: read the word aloud, trace the dotted version with a finger first, then write it several times. Practice 3-5 new words per session and review previously learned words regularly. Short daily sessions of 10-15 minutes are more effective than longer, less frequent practice." },
  { question: "What grade level should I choose for my child?", answer: "Start with the grade level your child is entering or currently in. If the words seem too easy (they can read and write them all quickly), move up a level. If they struggle with more than half the words, try the level below. The goal is to challenge without frustrating." },
];

export default function SightWords() {
  const [grade, setGrade] = useState<GradeLevel>("prek");
  const [wordsPerPage, setWordsPerPage] = useState(10);
  const [fontSize, setFontSize] = useState<FontSize>("large");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const { width, height } = getDimensions(orientation);

  const wordList = WORD_LISTS[grade];
  const sizeConfig = FONT_SIZES[fontSize];
  const displayWords = wordList.words.slice(0, wordsPerPage);

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
      { "@type": "ListItem", position: 2, name: "Sight Words", item: "https://printablepolly.com/sight-words" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Sight Word Practice Sheets</h1>
      <p className="text-gray-600 mb-6">Generate printable sight word practice sheets by grade level. Each word includes a printed example, a dotted tracing guide, and blank lines for writing practice.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
            <select value={grade} onChange={(e) => setGrade(e.target.value as GradeLevel)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="prek">Pre-K</option>
              <option value="kindergarten">Kindergarten</option>
              <option value="first">1st Grade</option>
              <option value="second">2nd Grade</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Words Per Page</label>
            <select value={wordsPerPage} onChange={(e) => setWordsPerPage(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="8">8 words</option>
              <option value="10">10 words</option>
              <option value="12">12 words</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
            <select value={fontSize} onChange={(e) => setFontSize(e.target.value as FontSize)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="large">Large</option>
              <option value="medium">Medium</option>
              <option value="small">Small</option>
            </select>
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="sight-words" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            <h2 className="text-xl font-bold text-center mb-1">Sight Word Practice</h2>
            <p className="text-center text-sm text-gray-500 mb-1">{wordList.label} Words</p>
            <p className="text-center text-sm text-gray-400 mb-4">Name: ___________________________ Date: _______________</p>

            <div className="space-y-0">
              {displayWords.map((word, i) => (
                <div
                  key={i}
                  className="flex items-center border-b border-gray-200"
                  style={{ height: `${sizeConfig.wordHeight}px` }}
                >
                  {/* Printed word */}
                  <div
                    className="font-bold text-gray-800 shrink-0"
                    style={{
                      fontSize: `${sizeConfig.fontSize}px`,
                      width: "120px",
                      fontFamily: "serif",
                    }}
                  >
                    {word}
                  </div>

                  {/* Dotted/traced version */}
                  <div
                    className="shrink-0 mx-4"
                    style={{
                      fontSize: `${sizeConfig.fontSize}px`,
                      fontFamily: "serif",
                      color: "transparent",
                      WebkitTextStroke: "1px #cccccc",
                      letterSpacing: "2px",
                      width: "120px",
                    }}
                  >
                    {word}
                  </div>

                  {/* Practice lines */}
                  <div className="flex-1 flex items-end gap-3 pb-2">
                    <div className="flex-1 border-b border-dashed border-gray-300" style={{ height: "1px" }} />
                    <div className="flex-1 border-b border-dashed border-gray-300" style={{ height: "1px" }} />
                    <div className="flex-1 border-b border-dashed border-gray-300" style={{ height: "1px" }} />
                  </div>
                </div>
              ))}
            </div>
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
