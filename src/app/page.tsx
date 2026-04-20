import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Paper Templates",
    templates: [
      { href: "/graph-paper", icon: "📐", title: "Graph Paper", desc: "Customizable grid paper with adjustable size and colors" },
      { href: "/lined-paper", icon: "📝", title: "Lined Paper", desc: "Ruled paper with college, wide, or narrow spacing" },
      { href: "/dot-grid", icon: "⊡", title: "Dot Grid Paper", desc: "Dot grid for bullet journals and sketching" },
      { href: "/isometric-paper", icon: "🔺", title: "Isometric Paper", desc: "Triangle grid for 3D drawing and design" },
      { href: "/cornell-notes", icon: "🎓", title: "Cornell Notes", desc: "Cornell note-taking template with cue column" },
      { href: "/staff-paper", icon: "🎵", title: "Staff Paper", desc: "Blank music manuscript paper with staves" },
      { href: "/hex-paper", icon: "⬡", title: "Hex Paper", desc: "Hexagonal grid for chemistry, RPGs, and design" },
    ],
  },
  {
    name: "Planning Templates",
    templates: [
      { href: "/weekly-planner", icon: "📅", title: "Weekly Planner", desc: "Plan your week with customizable layouts" },
      { href: "/monthly-calendar", icon: "🗓️", title: "Monthly Calendar", desc: "Printable calendar for any month and year" },
      { href: "/daily-schedule", icon: "⏰", title: "Daily Schedule", desc: "Time-blocked daily planner with intervals" },
      { href: "/habit-tracker", icon: "✅", title: "Habit Tracker", desc: "Track daily habits with a monthly grid" },
      { href: "/goal-setting", icon: "🎯", title: "Goal Setting", desc: "SMART goal worksheet for planning success" },
      { href: "/meal-planner", icon: "🍽️", title: "Meal Planner", desc: "Plan weekly meals for the whole family" },
    ],
  },
  {
    name: "Lists & Organization",
    templates: [
      { href: "/checklist", icon: "☑️", title: "Checklist", desc: "Blank checklist with customizable columns" },
      { href: "/todo-list", icon: "📋", title: "To-Do List", desc: "Priority-based to-do list template" },
      { href: "/grocery-list", icon: "🛒", title: "Grocery List", desc: "Shopping list organized by store section" },
      { href: "/budget-tracker", icon: "💰", title: "Budget Tracker", desc: "Track monthly income and expenses" },
      { href: "/chore-chart", icon: "⭐", title: "Chore Chart", desc: "Weekly chore chart with customizable tasks" },
      { href: "/cleaning-schedule", icon: "🧹", title: "Cleaning Schedule", desc: "Weekly cleaning checklist by room" },
    ],
  },
  {
    name: "Games & Activities",
    templates: [
      { href: "/word-search", icon: "🔍", title: "Word Search", desc: "Generate custom word search puzzles" },
      { href: "/bingo-cards", icon: "🎱", title: "Bingo Cards", desc: "Generate randomized bingo cards" },
    ],
  },
  {
    name: "Creative",
    templates: [
      { href: "/comic-strip", icon: "💬", title: "Comic Strip", desc: "Blank comic panels for drawing stories" },
      { href: "/storyboard", icon: "🎬", title: "Storyboard", desc: "Scene planning with drawing and notes areas" },
      { href: "/coloring-pages", icon: "🎨", title: "Coloring Pages", desc: "Geometric mandalas and patterns to color" },
    ],
  },
  {
    name: "Educational",
    templates: [
      { href: "/handwriting-practice", icon: "✏️", title: "Handwriting Practice", desc: "Practice sheets with guide lines" },
      { href: "/multiplication-table", icon: "✖️", title: "Multiplication Table", desc: "Times tables — filled or blank for practice" },
      { href: "/number-line", icon: "📏", title: "Number Line", desc: "Customizable number lines for math" },
      { href: "/reading-log", icon: "📚", title: "Reading Log", desc: "Track books read with ratings and notes" },
      { href: "/math-worksheets", icon: "➕", title: "Math Worksheets", desc: "Random math problems — add, subtract, multiply, divide" },
      { href: "/sight-words", icon: "👁️", title: "Sight Words", desc: "Practice high-frequency words by grade level" },
    ],
  },
];

const faqs = [
  {
    question: "Are Printable Polly templates really free?",
    answer: "Yes! All templates on Printable Polly are 100% free. There is no signup, no watermark, and no limit on how many templates you can print.",
  },
  {
    question: "How do I print a template?",
    answer: "Customize your template using the options provided, then click the Print button. Your browser's print dialog will open with the template ready to print. For best results, set margins to 'None' or 'Minimum' in your print settings.",
  },
  {
    question: "Can I save templates as PDF?",
    answer: "Yes! When the print dialog opens, select 'Save as PDF' as your printer/destination. This works in Chrome, Firefox, Safari, and Edge.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No account needed. All templates are generated right in your browser. No data is uploaded or stored on any server.",
  },
  {
    question: "What paper size do templates use?",
    answer: "Templates are designed for US Letter (8.5 x 11 inches) by default. They also work well on A4 paper — your browser will scale the content to fit automatically.",
  },
];

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="text-center mb-12">
        <Image
          src="/polly.png"
          alt="Polly the Parrot — Printable Polly mascot"
          width={120}
          height={120}
          className="mx-auto mb-4 rounded-lg"
          priority
        />
        <h1 className="text-4xl font-bold text-emerald-700 mb-3">
          Free Printable Templates
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Print Anything You Need! Graph paper, planners, checklists, worksheets — customize and print instantly from your browser.
        </p>
      </section>

      {/* Template Categories */}
      {categories.map((category) => (
        <section key={category.name} className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-emerald-200 pb-2">
            {category.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.templates.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{t.title}</h3>
                    <p className="text-sm text-gray-600">{t.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* SEO Content */}
      <section className="mb-10 prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">About Printable Polly</h2>
        <p className="text-gray-700">
          Printable Polly is a free online tool for generating printable templates. Unlike other printable sites that offer static PDFs, Printable Polly lets you customize every aspect of your template before printing — grid size, colors, spacing, layouts, and more. Everything runs in your browser with no downloads or installations required.
        </p>
        <p className="text-gray-700">
          Whether you need graph paper for math class, a weekly planner for staying organized, handwriting practice sheets for your kids, or a habit tracker for building better routines, Printable Polly has you covered. Every template is designed to look clean and professional when printed.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
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
