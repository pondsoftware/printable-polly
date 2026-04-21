"use client";

import Link from "next/link";
import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "What are the 8 parts of speech?", answer: "The 8 parts of speech are: noun, pronoun, verb, adjective, adverb, preposition, conjunction, and interjection. Each serves a different function in a sentence." },
  { question: "What is the most common grammar mistake?", answer: "Subject-verb agreement errors are among the most common. Other frequent mistakes include confusing their/there/they're, its/it's, and using apostrophes incorrectly in plurals." },
  { question: "How can I improve my grammar quickly?", answer: "Keep a cheat sheet handy for reference, read extensively, and practice writing daily. Focus on one rule at a time until it becomes automatic before moving to the next." },
];

export default function GrammarRulesClient() {
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const { width, height } = getDimensions(orientation);

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
      { "@type": "ListItem", position: 2, name: "Grammar Rules", item: "https://printablepolly.com/grammar-rules" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">English Grammar Cheat Sheet</h1>
      <p className="text-gray-600 mb-6">A printable grammar reference covering parts of speech, punctuation rules, common mistakes, and sentence structure with clear examples.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="grammar-rules-cheat-sheet" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "28px" }}>
            <h2 className="text-lg font-bold text-center mb-1">English Grammar Cheat Sheet</h2>
            <p className="text-[9px] text-center text-gray-400 mb-3">printablepolly.com</p>

            <div className="grid grid-cols-2 gap-3 text-[10px] leading-relaxed">
              {/* Parts of Speech */}
              <div className="border border-emerald-200 rounded p-2.5">
                <h3 className="font-bold text-emerald-700 text-[11px] mb-1.5 border-b border-emerald-100 pb-1">Parts of Speech</h3>
                <div className="space-y-1">
                  <div><span className="font-bold">Noun</span> — person, place, thing, idea. <span className="italic text-gray-500">The dog ran home.</span></div>
                  <div><span className="font-bold">Pronoun</span> — replaces a noun. <span className="italic text-gray-500">She went to the store.</span></div>
                  <div><span className="font-bold">Verb</span> — action or state of being. <span className="italic text-gray-500">He runs every day.</span></div>
                  <div><span className="font-bold">Adjective</span> — describes a noun. <span className="italic text-gray-500">The tall tree fell.</span></div>
                  <div><span className="font-bold">Adverb</span> — modifies verb/adj/adverb. <span className="italic text-gray-500">She ran quickly.</span></div>
                  <div><span className="font-bold">Preposition</span> — shows relationship. <span className="italic text-gray-500">The book is on the table.</span></div>
                  <div><span className="font-bold">Conjunction</span> — connects words/clauses. <span className="italic text-gray-500">I like tea and coffee.</span></div>
                  <div><span className="font-bold">Interjection</span> — expresses emotion. <span className="italic text-gray-500">Wow! That was amazing.</span></div>
                </div>
              </div>

              {/* Punctuation Rules */}
              <div className="border border-emerald-200 rounded p-2.5">
                <h3 className="font-bold text-emerald-700 text-[11px] mb-1.5 border-b border-emerald-100 pb-1">Punctuation Rules</h3>
                <div className="space-y-1">
                  <div><span className="font-bold">Period (.)</span> — ends a declarative sentence.</div>
                  <div><span className="font-bold">Comma (,)</span> — separates items in a list, after introductory phrases, before conjunctions in compound sentences.</div>
                  <div><span className="font-bold">Semicolon (;)</span> — joins two related independent clauses without a conjunction.</div>
                  <div><span className="font-bold">Colon (:)</span> — introduces a list, explanation, or quote.</div>
                  <div><span className="font-bold">Apostrophe (&apos;)</span> — shows possession or contractions. <span className="italic text-gray-500">It&apos;s the dog&apos;s bone.</span></div>
                  <div><span className="font-bold">Quotation Marks (&quot; &quot;)</span> — surround direct speech or titles.</div>
                  <div><span className="font-bold">Em Dash (&#8212;)</span> — adds emphasis or an aside.</div>
                  <div><span className="font-bold">Oxford Comma</span> — comma before &quot;and&quot; in a list. <span className="italic text-gray-500">Red, white, and blue.</span></div>
                </div>
              </div>

              {/* Sentence Structure */}
              <div className="border border-emerald-200 rounded p-2.5">
                <h3 className="font-bold text-emerald-700 text-[11px] mb-1.5 border-b border-emerald-100 pb-1">Sentence Structure</h3>
                <div className="space-y-1">
                  <div><span className="font-bold">Simple:</span> One independent clause. <span className="italic text-gray-500">She runs.</span></div>
                  <div><span className="font-bold">Compound:</span> Two independent clauses joined by conjunction. <span className="italic text-gray-500">She runs, and he walks.</span></div>
                  <div><span className="font-bold">Complex:</span> Independent + dependent clause. <span className="italic text-gray-500">Because it rained, we stayed in.</span></div>
                  <div><span className="font-bold">Compound-Complex:</span> Two independent + one dependent. <span className="italic text-gray-500">When the alarm rang, she woke up and he made coffee.</span></div>
                  <div className="mt-1.5 font-bold text-gray-700">Basic Pattern: Subject + Verb + Object</div>
                  <div><span className="font-bold">Subject:</span> who/what performs the action</div>
                  <div><span className="font-bold">Verb:</span> the action or state</div>
                  <div><span className="font-bold">Object:</span> who/what receives the action</div>
                  <div className="mt-1"><span className="font-bold">Active:</span> <span className="italic text-gray-500">The cat caught the mouse.</span></div>
                  <div><span className="font-bold">Passive:</span> <span className="italic text-gray-500">The mouse was caught by the cat.</span></div>
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="border border-emerald-200 rounded p-2.5">
                <h3 className="font-bold text-emerald-700 text-[11px] mb-1.5 border-b border-emerald-100 pb-1">Common Grammar Mistakes</h3>
                <div className="space-y-1">
                  <div><span className="font-bold">Subject-Verb Agreement:</span> The group <span className="line-through text-red-500">are</span> <span className="text-emerald-700 font-semibold">is</span> ready.</div>
                  <div><span className="font-bold">Run-on Sentences:</span> Use a period or semicolon to separate independent clauses.</div>
                  <div><span className="font-bold">Dangling Modifiers:</span> <span className="line-through text-red-500">Running fast, the finish line appeared.</span> <span className="text-emerald-700">Running fast, she saw the finish line.</span></div>
                  <div><span className="font-bold">Who vs. Whom:</span> Who = subject, Whom = object. <span className="italic text-gray-500">Who called? / To whom did you speak?</span></div>
                  <div><span className="font-bold">Less vs. Fewer:</span> Less = uncountable, Fewer = countable. <span className="italic text-gray-500">Less water, fewer cups.</span></div>
                  <div><span className="font-bold">Affect vs. Effect:</span> Affect = verb, Effect = noun (usually). <span className="italic text-gray-500">It will affect the effect.</span></div>
                </div>
              </div>

              {/* Commonly Confused Words */}
              <div className="col-span-2 border border-emerald-200 rounded p-2.5">
                <h3 className="font-bold text-emerald-700 text-[11px] mb-1.5 border-b border-emerald-100 pb-1">Commonly Confused Words</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <div><span className="font-bold">their</span> = possession | <span className="font-bold">there</span> = place | <span className="font-bold">they&apos;re</span> = they are</div>
                  <div><span className="font-bold">its</span> = possession | <span className="font-bold">it&apos;s</span> = it is / it has</div>
                  <div><span className="font-bold">your</span> = possession | <span className="font-bold">you&apos;re</span> = you are</div>
                  <div><span className="font-bold">to</span> = direction | <span className="font-bold">too</span> = also/excessive | <span className="font-bold">two</span> = number</div>
                  <div><span className="font-bold">then</span> = time/sequence | <span className="font-bold">than</span> = comparison</div>
                  <div><span className="font-bold">accept</span> = receive | <span className="font-bold">except</span> = exclude</div>
                  <div><span className="font-bold">loose</span> = not tight | <span className="font-bold">lose</span> = misplace</div>
                  <div><span className="font-bold">principal</span> = main/school head | <span className="font-bold">principle</span> = rule/belief</div>
                  <div><span className="font-bold">complement</span> = completes | <span className="font-bold">compliment</span> = praise</div>
                  <div><span className="font-bold">stationary</span> = not moving | <span className="font-bold">stationery</span> = paper/pens</div>
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
          <Link href="/spelling-worksheets" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">📝</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Spelling Worksheets</h3>
          </Link>
          <Link href="/sight-words" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">👁️</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Sight Words</h3>
          </Link>
          <Link href="/flash-cards" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🃏</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Flash Cards</h3>
          </Link>
          <Link href="/handwriting-practice" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">✏️</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Handwriting Practice</h3>
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
