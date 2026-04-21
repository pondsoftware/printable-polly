"use client";

import Link from "next/link";
import { useState } from "react";
import PrintControls, { Orientation } from "@/components/PrintControls";

type ChordDiagram = {
  name: string;
  strings: (number | "x" | 0)[]; // 6 values: fret number, x=muted, 0=open
  barreChord?: boolean;
  startFret?: number;
};

const openChords: ChordDiagram[] = [
  { name: "A", strings: ["x", 0, 2, 2, 2, 0] },
  { name: "Am", strings: ["x", 0, 2, 2, 1, 0] },
  { name: "B", strings: ["x", 2, 4, 4, 4, 2], barreChord: true, startFret: 2 },
  { name: "Bm", strings: ["x", 2, 4, 4, 3, 2], barreChord: true, startFret: 2 },
  { name: "C", strings: ["x", 3, 2, 0, 1, 0] },
  { name: "D", strings: ["x", "x", 0, 2, 3, 2] },
  { name: "Dm", strings: ["x", "x", 0, 2, 3, 1] },
  { name: "E", strings: [0, 2, 2, 1, 0, 0] },
  { name: "Em", strings: [0, 2, 2, 0, 0, 0] },
  { name: "F", strings: [1, 1, 2, 3, 3, 1], barreChord: true },
  { name: "G", strings: [3, 2, 0, 0, 0, 3] },
];

const seventhChords: ChordDiagram[] = [
  { name: "G7", strings: [3, 2, 0, 0, 0, 1] },
  { name: "A7", strings: ["x", 0, 2, 0, 2, 0] },
  { name: "D7", strings: ["x", "x", 0, 2, 1, 2] },
  { name: "E7", strings: [0, 2, 0, 1, 0, 0] },
  { name: "C7", strings: ["x", 3, 2, 3, 1, 0] },
  { name: "Am7", strings: ["x", 0, 2, 0, 1, 0] },
  { name: "Em7", strings: [0, 2, 0, 0, 0, 0] },
  { name: "Dm7", strings: ["x", "x", 0, 2, 1, 1] },
];

function ChordSVG({ name, strings, startFret, barreChord }: { name: string; strings: (number | "x" | 0)[]; startFret?: number; barreChord?: boolean }) {
  const w = 80;
  const h = 100;
  const padTop = 24;
  const padLeft = 14;
  const padRight = 10;
  const fretCount = 5;
  const stringCount = 6;
  const fretH = (h - padTop - 8) / fretCount;
  const stringW = (w - padLeft - padRight) / (stringCount - 1);
  const sf = startFret || 1;

  return (
    <div className="flex flex-col items-center">
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="block">
        {/* Chord name */}
        <text x={w / 2} y={14} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#065f46">{name}</text>

        {/* Nut or fret number */}
        {sf === 1 && !barreChord ? (
          <rect x={padLeft - 1} y={padTop - 2} width={stringW * 5 + 2} height={3} fill="#1f2937" rx={1} />
        ) : (
          <text x={padLeft - 10} y={padTop + fretH / 2 + 4} fontSize="8" fill="#6b7280">{sf}</text>
        )}

        {/* Fret lines */}
        {Array.from({ length: fretCount + 1 }).map((_, i) => (
          <line key={`f${i}`} x1={padLeft} y1={padTop + i * fretH} x2={padLeft + stringW * 5} y2={padTop + i * fretH} stroke="#9ca3af" strokeWidth={i === 0 ? 1.5 : 0.75} />
        ))}

        {/* String lines */}
        {Array.from({ length: stringCount }).map((_, i) => (
          <line key={`s${i}`} x1={padLeft + i * stringW} y1={padTop} x2={padLeft + i * stringW} y2={padTop + fretCount * fretH} stroke="#6b7280" strokeWidth={0.75} />
        ))}

        {/* Open/muted indicators */}
        {strings.map((s, i) => {
          const x = padLeft + i * stringW;
          const y = padTop - 7;
          if (s === "x") return <text key={`m${i}`} x={x} y={y} textAnchor="middle" fontSize="9" fill="#dc2626">x</text>;
          if (s === 0) return <circle key={`o${i}`} cx={x} cy={y - 3} r={3} fill="none" stroke="#065f46" strokeWidth={1} />;
          return null;
        })}

        {/* Finger dots */}
        {strings.map((s, i) => {
          if (s === "x" || s === 0) return null;
          const fret = typeof s === "number" ? s - (sf - 1) : 0;
          const x = padLeft + i * stringW;
          const y = padTop + (fret - 0.5) * fretH;
          return <circle key={`d${i}`} cx={x} cy={y} r={4} fill="#065f46" />;
        })}

        {/* Barre indicator */}
        {barreChord && sf > 1 && (
          <rect x={padLeft - 2} y={padTop + 0.5 * fretH - 4} width={stringW * 5 + 4} height={7} rx={3.5} fill="#065f46" opacity={0.5} />
        )}
      </svg>
    </div>
  );
}

const faqs = [
  { question: "What are the most important guitar chords for beginners?", answer: "The most essential beginner chords are E, Em, A, Am, D, Dm, C, and G. These open chords are used in thousands of songs and form the foundation of guitar playing. Once mastered, you can play in multiple keys." },
  { question: "How do I read a guitar chord diagram?", answer: "Chord diagrams show the guitar neck from a front view. Vertical lines are strings (thickest on left), horizontal lines are frets. Dots show where to press, 'x' means don't play that string, and 'o' means play it open. Numbers indicate which fingers to use." },
  { question: "What is the difference between open chords and barre chords?", answer: "Open chords use open (unfretted) strings and are played in the first few frets. Barre chords use one finger to press all strings across a fret, creating a movable shape. Barre chords are harder but let you play any chord by shifting position." },
];

export default function GuitarChordsClient() {
  const [showBarre, setShowBarre] = useState(false);
  const [orientation, setOrientation] = useState<Orientation>("portrait");

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
      { "@type": "ListItem", position: 2, name: "Guitar Chords", item: "https://printablepolly.com/guitar-chords" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Guitar Chord Chart</h1>
      <p className="text-gray-600 mb-6">Essential open chords and seventh chords with finger positions, open/muted string indicators, and fret diagrams. Print for quick reference during practice.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={showBarre}
                onChange={(e) => setShowBarre(e.target.checked)}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              Show Barre Chords Page
            </label>
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="guitar-chords" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm p-8">
            {/* Page 1: Open Chords */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-emerald-700 mb-1 text-center">Essential Open Chords</h2>
              <p className="text-xs text-gray-500 text-center mb-4">x = mute string | o = open string | dots = finger placement</p>
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4 justify-items-center">
                {openChords.map((chord) => (
                  <ChordSVG key={chord.name} name={chord.name} strings={chord.strings} startFret={chord.startFret} barreChord={chord.barreChord} />
                ))}
              </div>
            </div>

            {/* Seventh Chords */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-emerald-700 mb-1 text-center">Seventh Chords</h2>
              <p className="text-xs text-gray-500 text-center mb-4">Dominant 7th and minor 7th voicings</p>
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4 justify-items-center">
                {seventhChords.map((chord) => (
                  <ChordSVG key={chord.name} name={chord.name} strings={chord.strings} startFret={chord.startFret} barreChord={chord.barreChord} />
                ))}
              </div>
            </div>

            {/* Barre Chords Section */}
            {showBarre && (
              <div className="mt-8 pt-8 border-t border-gray-300">
                <h2 className="text-xl font-bold text-emerald-700 mb-1 text-center">Common Barre Chords</h2>
                <p className="text-xs text-gray-500 text-center mb-4">Movable shapes based on E and A forms</p>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4 justify-items-center">
                  <ChordSVG name="F" strings={[1, 1, 2, 3, 3, 1]} startFret={1} barreChord={true} />
                  <ChordSVG name="F#/Gb" strings={[2, 2, 3, 4, 4, 2]} startFret={2} barreChord={true} />
                  <ChordSVG name="B" strings={["x", 2, 4, 4, 4, 2]} startFret={2} barreChord={true} />
                  <ChordSVG name="Bb" strings={["x", 1, 3, 3, 3, 1]} startFret={1} barreChord={true} />
                  <ChordSVG name="Fm" strings={[1, 1, 1, 3, 3, 1]} startFret={1} barreChord={true} />
                  <ChordSVG name="Bm" strings={["x", 2, 4, 4, 3, 2]} startFret={2} barreChord={true} />
                  <ChordSVG name="C#m" strings={["x", 4, 6, 6, 5, 4]} startFret={4} barreChord={true} />
                  <ChordSVG name="F#m" strings={[2, 2, 2, 4, 4, 2]} startFret={2} barreChord={true} />
                </div>
              </div>
            )}

            {/* Quick Reference */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-700 mb-2">Reading Chord Diagrams</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-600">
                <div className="flex items-start gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-emerald-700 shrink-0 mt-0.5"></span>
                  <span>Filled dots show where to press the string</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-block w-3 h-3 rounded-full border-2 border-emerald-700 shrink-0 mt-0.5"></span>
                  <span>Open circle = play the string open (unfretted)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600 font-bold shrink-0">x</span>
                  <span>X = do not play / mute this string</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Templates */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Templates</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href="/staff-paper" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🎼</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Staff Paper</h3>
          </Link>
          <Link href="/piano-scales" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🎹</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Piano Scales</h3>
          </Link>
          <Link href="/music-theory" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🎵</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Music Theory</h3>
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
