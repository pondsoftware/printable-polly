import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Printable 3rd Grade Worksheets — Math, Reading & More | Printable Polly",
  description:
    "Free printable 3rd grade worksheets — multiplication, fractions, spelling, US states, and more. Printable PDFs for 8–9 year olds, no signup required.",
  alternates: { canonical: "https://printablepolly.com/third-grade-worksheets" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What math do 3rd graders learn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Third grade math focuses on multiplication and division as its centerpiece, along with fractions, place value to 10,000, and measurement. Students learn their times tables through 10 or 12, begin understanding fractions as parts of a whole, and solve multi-step word problems involving addition and subtraction within 1,000.",
      },
    },
    {
      "@type": "Question",
      name: "Should 3rd graders know multiplication tables?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — memorizing multiplication tables through 10 or 12 is a major goal of 3rd grade. Fluency with times tables makes division, fractions, and later algebra significantly easier. Regular practice with printable times tables and flash cards is one of the most effective ways to build that fluency.",
      },
    },
    {
      "@type": "Question",
      name: "Are these 3rd grade worksheets free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — every worksheet on Printable Polly is completely free. There is no signup, no account, and no paywall. Just open the worksheet you need and print it directly from your browser. All worksheets are designed to print cleanly on standard 8.5 × 11 paper.",
      },
    },
    {
      "@type": "Question",
      name: "What reading level is expected in 3rd grade?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most 3rd graders read at a Guided Reading level N–P (roughly Lexile 500–800L). By the end of 3rd grade, students are expected to read chapter books independently, identify main ideas and supporting details, understand figurative language, and compare information from two texts on the same topic.",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://printablepolly.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "3rd Grade Worksheets",
      item: "https://printablepolly.com/third-grade-worksheets",
    },
  ],
};

const worksheets = [
  {
    href: "/multiplication-table",
    emoji: "✖️",
    title: "Multiplication Table",
    description: "Times tables from 1–12 — filled or blank for practice",
  },
  {
    href: "/math-worksheets",
    emoji: "➕",
    title: "Math Worksheets",
    description: "Multi-digit addition, subtraction, and intro to division",
  },
  {
    href: "/fractions-worksheets",
    emoji: "🍕",
    title: "Fractions Worksheets",
    description: "Identifying and comparing fractions with visual models",
  },
  {
    href: "/spelling-worksheets",
    emoji: "🔤",
    title: "Spelling Worksheets",
    description: "3rd grade vocabulary and spelling word practice",
  },
  {
    href: "/place-value",
    emoji: "🔢",
    title: "Place Value",
    description: "Hundreds, tens, and ones — place value to 10,000",
  },
  {
    href: "/number-line",
    emoji: "📏",
    title: "Number Line",
    description: "Number lines for fractions and rounding practice",
  },
  {
    href: "/telling-time",
    emoji: "🕐",
    title: "Telling Time",
    description: "Telling time to the nearest minute",
  },
  {
    href: "/us-states",
    emoji: "🗺️",
    title: "US States",
    description: "State capitals, abbreviations, and geography practice",
  },
  {
    href: "/word-search",
    emoji: "🔍",
    title: "Word Search Puzzles",
    description: "Word searches with 3rd grade vocabulary",
  },
  {
    href: "/grammar-rules",
    emoji: "📖",
    title: "Grammar Rules",
    description: "Parts of speech, punctuation, and sentence structure",
  },
  {
    href: "/flash-cards",
    emoji: "🃏",
    title: "Flash Cards",
    description: "Multiplication facts and vocabulary flash cards",
  },
  {
    href: "/reading-log",
    emoji: "📚",
    title: "Reading Log",
    description: "Track chapter books with this printable reading log",
  },
];

const gradeLevels = [
  { label: "Kindergarten", href: "/kindergarten-worksheets" },
  { label: "1st Grade", href: "/first-grade-worksheets" },
  { label: "2nd Grade", href: "/second-grade-worksheets" },
  { label: "4th Grade", href: "/fourth-grade-worksheets" },
  { label: "5th Grade", href: "/fifth-grade-worksheets" },
];

export default function ThirdGradeWorksheetsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-emerald-600">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700">3rd Grade Worksheets</span>
        </nav>

        {/* H1 + Intro */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Free Printable 3rd Grade Worksheets
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mb-10">
          Everything you need for third grade, all in one place. These free printable worksheets
          cover the key skills 8–9 year olds are building in school — multiplication, fractions,
          spelling, grammar, US geography, and more. Print any worksheet directly from your
          browser with no account and no signup required. Perfect for classroom use, daily
          homework practice, or independent study at home.
        </p>

        {/* Worksheet Grid */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Browse 3rd Grade Worksheets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {worksheets.map((ws) => (
              <Link
                key={ws.href}
                href={ws.href}
                className="block rounded-lg border border-gray-200 bg-white p-5 hover:border-emerald-400 hover:shadow-sm transition group"
              >
                <div className="text-2xl mb-2">{ws.emoji}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700 mb-1">
                  {ws.title}
                </h3>
                <p className="text-sm text-gray-600">{ws.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* What 3rd Graders Are Learning */}
        <section className="mb-14 max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            What 3rd Graders Are Learning
          </h2>

          <div className="space-y-7">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reading &amp; Comprehension</h3>
              <p className="text-gray-600">
                Third grade is a pivotal shift — students move from learning to read to reading to
                learn. They build stamina to read longer chapter books independently, practice
                identifying the main idea and key details in both fiction and nonfiction, and begin
                comparing two texts on the same topic. Vocabulary expands rapidly as students
                encounter more complex texts, and teachers introduce figurative language like
                similes and metaphors. Reading logs and structured response activities help students
                track and reflect on what they read.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiplication &amp; Division</h3>
              <p className="text-gray-600">
                Multiplication is the defining math skill of 3rd grade. Students are expected to
                understand multiplication as repeated addition and equal groups, and to achieve
                fluency with their times tables through 10 or 12 by year&apos;s end. Division is
                introduced as the inverse of multiplication — students learn to divide within 100
                and solve word problems that require both operations. Regular timed practice with
                multiplication tables and flash cards is the most proven path to fluency, which
                becomes the foundation for fractions, algebra, and beyond.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fractions</h3>
              <p className="text-gray-600">
                Third grade introduces fractions as a formal concept. Students learn to identify
                fractions as equal parts of a whole or a set, place fractions on a number line, and
                compare fractions with the same numerator or denominator. Visual models — fraction
                bars, circles, and number lines — are central to building conceptual understanding
                before procedural fluency. By the end of the year, students can recognize equivalent
                fractions such as 1/2 and 2/4, setting the stage for the more complex fraction work
                that begins in 4th grade.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Writing &amp; Grammar</h3>
              <p className="text-gray-600">
                In 3rd grade, students write across three modes: opinion, informational, and
                narrative. They learn to organize paragraphs with a clear topic sentence and
                supporting details, use transition words, and write conclusions. Grammar instruction
                covers parts of speech (nouns, verbs, adjectives, adverbs, pronouns), proper
                capitalization, and punctuation including commas in lists and dialogue. Spelling
                patterns become more complex, incorporating prefixes, suffixes, and multi-syllable
                words. Students also begin revising and editing their own work with teacher guidance.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Science &amp; Social Studies</h3>
              <p className="text-gray-600">
                Third grade science typically covers life cycles and ecosystems, properties of
                matter, weather and climate, and simple forces and motion. Students practice
                forming hypotheses, conducting observations, and recording data in lab journals.
                Social studies in 3rd grade focuses on communities and geography — many curricula
                introduce the 50 US states, state capitals, map skills, and US regions. Students
                also study local and national government, citizenship, and how communities interact
                with their physical environment, building the geographic and civic literacy that
                supports later history and social studies coursework.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-14 max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqJsonLd.mainEntity.map((faq, i) => (
              <div key={i} className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="text-base font-semibold text-gray-900 mb-2">{faq.name}</h3>
                <p className="text-gray-600 text-sm">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Other Grade Levels */}
        <section className="mb-6 max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Other Grade Levels</h2>
          <p className="text-gray-600 mb-5 text-sm">
            Looking for worksheets for a different grade? We have printable hubs for every
            elementary grade level.
          </p>
          <div className="flex flex-wrap gap-3">
            {gradeLevels.map((grade) => (
              <Link
                key={grade.href}
                href={grade.href}
                className="inline-block rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-emerald-400 hover:text-emerald-700 transition"
              >
                {grade.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
