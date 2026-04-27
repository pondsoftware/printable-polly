import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Printable Kindergarten Worksheets — Letters, Numbers & More | Printable Polly",
  description:
    "Free printable kindergarten worksheets — tracing letters, sight words, counting, coloring, and more. Printable PDFs for 5–6 year olds, no signup required.",
  alternates: { canonical: "https://printablepolly.com/kindergarten-worksheets" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What worksheets should kindergarteners practice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kindergarteners benefit most from worksheets that build core early literacy and numeracy skills: tracing letters and numbers, recognizing sight words, counting objects, matching uppercase and lowercase letters, and coloring activities that develop fine motor skills. Short daily practice with a mix of reading, writing, and math tasks sets a strong foundation for first grade.",
      },
    },
    {
      "@type": "Question",
      name: "What math should a kindergartener know?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "By the end of kindergarten, most children can count to 100 by ones and tens, recognize and write numbers 0–20, understand the concept of more and less, add and subtract within 10, and identify basic shapes like circles, squares, triangles, and rectangles. Using a number line, counting objects, and simple addition practice are all great ways to reinforce these skills.",
      },
    },
    {
      "@type": "Question",
      name: "Are these kindergarten worksheets free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — every worksheet on Printable Polly is completely free to print. There is no account, no signup, and no paywall. Simply open the worksheet you need and print it directly from your browser. All worksheets are formatted as standard 8.5×11 printable PDFs.",
      },
    },
    {
      "@type": "Question",
      name: "How many sight words should a kindergartener know?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most kindergarten programs target 20–50 sight words by the end of the year, typically drawn from the Dolch Pre-K and Kindergarten lists. Common words include the, a, I, is, it, in, and, see, we, and look. Regular practice with flashcards, word lists, and read-aloud activities helps children recognize these high-frequency words instantly.",
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
      name: "Kindergarten Worksheets",
      item: "https://printablepolly.com/kindergarten-worksheets",
    },
  ],
};

const worksheets = [
  {
    href: "/tracing-letters",
    emoji: "✏️",
    title: "Tracing Letters",
    description: "Practice writing the alphabet with guided tracing lines",
  },
  {
    href: "/handwriting-practice",
    emoji: "📝",
    title: "Handwriting Practice",
    description: "Letter and word formation practice sheets",
  },
  {
    href: "/sight-words",
    emoji: "👁️",
    title: "Sight Words",
    description: "Pre-K and kindergarten Dolch sight word lists",
  },
  {
    href: "/flash-cards",
    emoji: "🃏",
    title: "Flash Cards",
    description: "Letter, number, and shape flash cards",
  },
  {
    href: "/math-worksheets",
    emoji: "➕",
    title: "Math Worksheets",
    description: "Counting, number recognition, and basic addition",
  },
  {
    href: "/number-line",
    emoji: "📏",
    title: "Number Line",
    description: "Number lines from 0–10 and 0–20 for counting practice",
  },
  {
    href: "/coloring-pages",
    emoji: "🎨",
    title: "Coloring Pages",
    description: "Fun coloring sheets to build fine motor skills",
  },
  {
    href: "/word-search",
    emoji: "🔍",
    title: "Word Search Puzzles",
    description: "Simple 4-letter word searches for early readers",
  },
  {
    href: "/telling-time",
    emoji: "🕐",
    title: "Telling Time",
    description: "Clock worksheets for learning hours and half-hours",
  },
  {
    href: "/spelling-worksheets",
    emoji: "🔤",
    title: "Spelling Worksheets",
    description: "CVC and simple word spelling practice",
  },
];

const gradeLevels = [
  { label: "1st Grade", href: "/first-grade-worksheets" },
  { label: "2nd Grade", href: "/second-grade-worksheets" },
  { label: "3rd Grade", href: "/third-grade-worksheets" },
  { label: "4th Grade", href: "/fourth-grade-worksheets" },
  { label: "5th Grade", href: "/fifth-grade-worksheets" },
];

export default function KindergartenWorksheetsPage() {
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
          <span className="text-gray-700">Kindergarten Worksheets</span>
        </nav>

        {/* H1 + Intro */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Free Printable Kindergarten Worksheets
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mb-10">
          Everything your kindergartener needs in one place. These free printable worksheets are
          designed for ages 5–6 and cover letter tracing, sight words, counting, shapes, coloring,
          and more. Print directly from your browser — no account required, no signup, completely
          free. Perfect for classroom practice, homework, or at-home learning with your child.
        </p>

        {/* Worksheet Grid */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Browse Kindergarten Worksheets
          </h2>
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

        {/* What Kindergarteners Are Learning */}
        <section className="mb-14 max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            What Kindergarteners Are Learning
          </h2>

          <div className="space-y-7">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Letter Recognition &amp; Phonics
              </h3>
              <p className="text-gray-600">
                One of the biggest milestones in kindergarten is learning to recognize all 26
                uppercase and lowercase letters and connect each one to its sound. Phonics
                instruction helps children decode simple consonant-vowel-consonant (CVC) words like{" "}
                <em>cat</em>, <em>dog</em>, and <em>sun</em>. Letter tracing worksheets reinforce
                both the visual shape and the stroke order needed for handwriting, while phonics
                activities build the sound-symbol connections that make early reading possible.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Reading &amp; Sight Words
              </h3>
              <p className="text-gray-600">
                Kindergarteners begin learning high-frequency "sight words" — words like{" "}
                <em>the</em>, <em>and</em>, <em>is</em>, and <em>see</em> — that appear so often in
                text that fluent readers recognize them instantly without sounding them out. Most
                kindergarten programs draw from the Dolch Pre-K and Kindergarten lists, targeting
                20–50 words by year&apos;s end. Paired with phonics, sight word mastery allows
                children to read simple sentences and early reader books with growing confidence.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Math Foundations</h3>
              <p className="text-gray-600">
                Kindergarten math lays the groundwork for everything that follows. Children learn to
                count to 100 by ones and tens, recognize and write numbers 0–20, compare quantities
                using more and less, and begin adding and subtracting within 10. They also explore
                basic geometry — identifying circles, squares, triangles, and rectangles — and
                practice sorting objects by size, shape, and color. Number lines and counting
                manipulatives are especially effective tools at this stage.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Writing &amp; Fine Motor Skills
              </h3>
              <p className="text-gray-600">
                Before children can write freely, they need strong fine motor skills — the small
                muscle control required to hold a pencil and form letters accurately. Tracing
                worksheets, coloring pages, and cutting activities all build this dexterity. By the
                end of kindergarten, most children can write their name, copy simple words, and
                attempt to write short sentences using invented spelling. Consistent handwriting
                practice leads to neater, more confident writing in the years ahead.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Science &amp; Social Studies
              </h3>
              <p className="text-gray-600">
                Kindergarten science introduces children to the world around them through
                observation and curiosity. Common topics include the five senses, weather and
                seasons, basic plant and animal life, and simple cause-and-effect relationships.
                Social studies at this level focuses on self, family, and community — understanding
                rules, roles, and how people live and work together. Both subjects encourage
                children to ask questions, make observations, and talk about what they notice,
                building habits of mind that support lifelong learning.
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
