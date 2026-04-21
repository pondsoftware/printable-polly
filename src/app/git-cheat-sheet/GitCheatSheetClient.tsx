"use client";

import Link from "next/link";
import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

interface GitCommand {
  command: string;
  description: string;
  flags?: string;
}

interface Section {
  title: string;
  commands: GitCommand[];
}

const sections: Section[] = [
  {
    title: "Setup",
    commands: [
      { command: "git init", description: "Initialize a new repository" },
      { command: "git clone <url>", description: "Clone a remote repository" },
      { command: "git config user.name \"Name\"", description: "Set commit author name" },
      { command: "git config user.email \"email\"", description: "Set commit author email" },
    ],
  },
  {
    title: "Basic Workflow",
    commands: [
      { command: "git status", description: "Show working tree status", flags: "-s (short)" },
      { command: "git add <file>", description: "Stage file(s) for commit", flags: "-A (all), -p (patch)" },
      { command: "git commit -m \"msg\"", description: "Commit staged changes", flags: "--amend, -a (add tracked)" },
      { command: "git push", description: "Push commits to remote", flags: "-u origin <branch>" },
      { command: "git pull", description: "Fetch and merge from remote", flags: "--rebase" },
      { command: "git diff", description: "Show unstaged changes", flags: "--staged, --stat" },
    ],
  },
  {
    title: "Branching",
    commands: [
      { command: "git branch", description: "List branches", flags: "-a (all), -d (delete)" },
      { command: "git checkout <branch>", description: "Switch to branch", flags: "-b (create & switch)" },
      { command: "git switch <branch>", description: "Switch branches (modern)", flags: "-c (create)" },
      { command: "git merge <branch>", description: "Merge branch into current", flags: "--no-ff, --squash" },
      { command: "git rebase <branch>", description: "Rebase current onto branch", flags: "--interactive, --abort" },
    ],
  },
  {
    title: "History",
    commands: [
      { command: "git log", description: "Show commit history", flags: "--oneline, --graph, -n" },
      { command: "git blame <file>", description: "Show who changed each line" },
      { command: "git show <commit>", description: "Show commit details" },
      { command: "git log --follow <file>", description: "History for a specific file" },
    ],
  },
  {
    title: "Undo",
    commands: [
      { command: "git reset <file>", description: "Unstage a file", flags: "--hard (discard all)" },
      { command: "git revert <commit>", description: "Create undo commit" },
      { command: "git stash", description: "Temporarily save changes", flags: "pop, list, drop" },
      { command: "git checkout -- <file>", description: "Discard file changes" },
      { command: "git restore <file>", description: "Discard changes (modern)", flags: "--staged (unstage)" },
    ],
  },
  {
    title: "Remote",
    commands: [
      { command: "git fetch", description: "Download remote changes", flags: "--all, --prune" },
      { command: "git remote -v", description: "List remote URLs" },
      { command: "git remote add <name> <url>", description: "Add a remote" },
      { command: "git push -u origin <branch>", description: "Push & track branch" },
      { command: "git pull --rebase", description: "Pull with rebase (cleaner history)" },
    ],
  },
];

const faqs = [
  { question: "What is the difference between git pull and git fetch?", answer: "git fetch downloads changes from the remote but doesn't merge them. git pull does a fetch followed by a merge (or rebase with --rebase flag). Fetch is safer for reviewing changes before integrating." },
  { question: "How do I undo my last commit without losing changes?", answer: "Use 'git reset --soft HEAD~1' to undo the commit but keep changes staged, or 'git reset HEAD~1' to undo and unstage. Use --hard only if you want to discard changes entirely." },
  { question: "What is the difference between merge and rebase?", answer: "Merge creates a merge commit preserving branch history. Rebase replays your commits on top of the target branch for a linear history. Use merge for shared branches; rebase for local/feature branches before merging." },
];

export default function GitCheatSheetClient() {
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
      { "@type": "ListItem", position: 2, name: "Git Cheat Sheet", item: "https://printablepolly.com/git-cheat-sheet" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Git Commands Cheat Sheet</h1>
      <p className="text-gray-600 mb-6">A printable Git reference covering setup, workflow, branching, history, undo, and remote operations. Keep it by your desk for quick lookups.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="git-cheat-sheet" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "28px" }}>
            <div className="text-center mb-5">
              <h2 className="text-xl font-bold text-gray-900">Git Commands Reference</h2>
              <p className="text-xs text-gray-500 mt-1">printablepolly.com</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {sections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-bold text-emerald-700 border-b border-emerald-200 pb-1 mb-2">{section.title}</h3>
                  <div className="space-y-1.5">
                    {section.commands.map((cmd) => (
                      <div key={cmd.command} className="group">
                        <div className="flex items-start gap-2">
                          <code className="text-[10px] font-mono bg-gray-50 border border-gray-200 rounded px-1 py-0.5 text-gray-800 whitespace-nowrap">
                            {cmd.command}
                          </code>
                        </div>
                        <p className="text-[10px] text-gray-600 ml-0.5 leading-tight">
                          {cmd.description}
                          {cmd.flags && <span className="text-gray-400 ml-1">({cmd.flags})</span>}
                        </p>
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
          <Link href="/keyboard-shortcuts" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">⌨️</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Keyboard Shortcuts</h3>
          </Link>
          <Link href="/regex-cheat-sheet" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🔍</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Regex Cheat Sheet</h3>
          </Link>
          <Link href="/html-css-reference" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🌐</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">HTML & CSS Reference</h3>
          </Link>
          <Link href="/checklist" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">✅</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Checklist</h3>
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
