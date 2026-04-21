"use client";

import Link from "next/link";
import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

type Platform = "mac" | "windows";

interface Shortcut {
  action: string;
  mac: string[];
  windows: string[];
}

interface Section {
  title: string;
  shortcuts: Shortcut[];
}

const sections: Section[] = [
  {
    title: "General",
    shortcuts: [
      { action: "Copy", mac: ["Cmd", "C"], windows: ["Ctrl", "C"] },
      { action: "Paste", mac: ["Cmd", "V"], windows: ["Ctrl", "V"] },
      { action: "Cut", mac: ["Cmd", "X"], windows: ["Ctrl", "X"] },
      { action: "Undo", mac: ["Cmd", "Z"], windows: ["Ctrl", "Z"] },
      { action: "Redo", mac: ["Cmd", "Shift", "Z"], windows: ["Ctrl", "Y"] },
      { action: "Select All", mac: ["Cmd", "A"], windows: ["Ctrl", "A"] },
      { action: "Find", mac: ["Cmd", "F"], windows: ["Ctrl", "F"] },
      { action: "Save", mac: ["Cmd", "S"], windows: ["Ctrl", "S"] },
      { action: "Print", mac: ["Cmd", "P"], windows: ["Ctrl", "P"] },
    ],
  },
  {
    title: "Text Editing",
    shortcuts: [
      { action: "Bold", mac: ["Cmd", "B"], windows: ["Ctrl", "B"] },
      { action: "Italic", mac: ["Cmd", "I"], windows: ["Ctrl", "I"] },
      { action: "Underline", mac: ["Cmd", "U"], windows: ["Ctrl", "U"] },
      { action: "Select Word", mac: ["Option", "Shift", "\u2192"], windows: ["Ctrl", "Shift", "\u2192"] },
      { action: "Delete Word", mac: ["Option", "Backspace"], windows: ["Ctrl", "Backspace"] },
      { action: "Go to Line Start", mac: ["Cmd", "\u2190"], windows: ["Home"] },
      { action: "Go to Line End", mac: ["Cmd", "\u2192"], windows: ["End"] },
    ],
  },
  {
    title: "Browser",
    shortcuts: [
      { action: "New Tab", mac: ["Cmd", "T"], windows: ["Ctrl", "T"] },
      { action: "Close Tab", mac: ["Cmd", "W"], windows: ["Ctrl", "W"] },
      { action: "Reopen Tab", mac: ["Cmd", "Shift", "T"], windows: ["Ctrl", "Shift", "T"] },
      { action: "Refresh", mac: ["Cmd", "R"], windows: ["Ctrl", "R"] },
      { action: "Hard Refresh", mac: ["Cmd", "Shift", "R"], windows: ["Ctrl", "Shift", "R"] },
      { action: "Address Bar", mac: ["Cmd", "L"], windows: ["Ctrl", "L"] },
      { action: "Next Tab", mac: ["Cmd", "Option", "\u2192"], windows: ["Ctrl", "Tab"] },
      { action: "Previous Tab", mac: ["Cmd", "Option", "\u2190"], windows: ["Ctrl", "Shift", "Tab"] },
    ],
  },
  {
    title: "File Management",
    shortcuts: [
      { action: "New Folder", mac: ["Cmd", "Shift", "N"], windows: ["Ctrl", "Shift", "N"] },
      { action: "Rename", mac: ["Enter"], windows: ["F2"] },
      { action: "Delete", mac: ["Cmd", "Backspace"], windows: ["Delete"] },
      { action: "Move to Trash", mac: ["Cmd", "Backspace"], windows: ["Ctrl", "D"] },
      { action: "Get Info / Properties", mac: ["Cmd", "I"], windows: ["Alt", "Enter"] },
      { action: "Duplicate", mac: ["Cmd", "D"], windows: ["Ctrl", "C then Ctrl", "V"] },
    ],
  },
  {
    title: "Screenshots",
    shortcuts: [
      { action: "Full Screen", mac: ["Cmd", "Shift", "3"], windows: ["PrtSc"] },
      { action: "Selection", mac: ["Cmd", "Shift", "4"], windows: ["Win", "Shift", "S"] },
      { action: "Window", mac: ["Cmd", "Shift", "4", "Space"], windows: ["Alt", "PrtSc"] },
      { action: "Screen Record", mac: ["Cmd", "Shift", "5"], windows: ["Win", "G"] },
    ],
  },
];

const faqs = [
  { question: "What are the most important keyboard shortcuts to learn first?", answer: "Start with Copy (Ctrl/Cmd+C), Paste (Ctrl/Cmd+V), Undo (Ctrl/Cmd+Z), and Save (Ctrl/Cmd+S). These four shortcuts alone will save significant time in any application." },
  { question: "Are keyboard shortcuts the same on Mac and Windows?", answer: "Most shortcuts follow the same pattern, but Mac uses the Command key where Windows uses Ctrl. Some shortcuts differ entirely, like screenshots (Cmd+Shift+3 on Mac vs PrtSc on Windows)." },
  { question: "How can I memorize keyboard shortcuts faster?", answer: "Print this cheat sheet and keep it next to your monitor. Focus on learning 2-3 new shortcuts per week and consciously use them instead of the mouse. Muscle memory develops within a few days of regular use." },
];

function KeyCap({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center justify-center px-2 py-0.5 min-w-[28px] h-7 bg-gray-100 border border-gray-300 rounded-md text-xs font-mono font-semibold text-gray-700 shadow-sm">
      {label}
    </span>
  );
}

function KeyCombo({ keys }: { keys: string[] }) {
  return (
    <span className="inline-flex items-center gap-1 flex-wrap">
      {keys.map((key, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          {i > 0 && <span className="text-gray-400 text-xs">+</span>}
          <KeyCap label={key} />
        </span>
      ))}
    </span>
  );
}

export default function KeyboardShortcutsClient() {
  const [platform, setPlatform] = useState<Platform>("mac");
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
      { "@type": "ListItem", position: 2, name: "Keyboard Shortcuts", item: "https://printablepolly.com/keyboard-shortcuts" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Keyboard Shortcuts Cheat Sheet</h1>
      <p className="text-gray-600 mb-6">A printable keyboard shortcuts reference for Mac and Windows. Toggle between platforms and print for quick desk reference.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
            <select value={platform} onChange={(e) => setPlatform(e.target.value as Platform)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="mac">Mac</option>
              <option value="windows">Windows</option>
            </select>
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="keyboard-shortcuts" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Keyboard Shortcuts — {platform === "mac" ? "Mac" : "Windows"}</h2>
              <p className="text-xs text-gray-500 mt-1">printablepolly.com</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {sections.map((section) => (
                <div key={section.title} className={`${section.title === "Browser" ? "col-span-2" : ""}`}>
                  <h3 className="text-sm font-bold text-emerald-700 border-b border-emerald-200 pb-1 mb-2">{section.title}</h3>
                  <div className="space-y-1.5">
                    {section.shortcuts.map((shortcut) => (
                      <div key={shortcut.action} className="flex items-center justify-between gap-2">
                        <span className="text-xs text-gray-700">{shortcut.action}</span>
                        <KeyCombo keys={platform === "mac" ? shortcut.mac : shortcut.windows} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Templates */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Templates</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href="/git-cheat-sheet" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🔀</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Git Cheat Sheet</h3>
          </Link>
          <Link href="/regex-cheat-sheet" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🔍</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Regex Cheat Sheet</h3>
          </Link>
          <Link href="/html-css-reference" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🌐</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">HTML & CSS Reference</h3>
          </Link>
          <Link href="/cornell-notes" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🎓</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Cornell Notes</h3>
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
