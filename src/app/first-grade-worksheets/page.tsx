import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Printable 1st Grade Worksheets — Math, Reading & More | Printable Polly",
  description:
    "Free printable 1st grade worksheets — sight words, addition, place value, spelling, telling time, and more. Printable PDFs for 6–7 year olds, no signup required.",
  alternates: { canonical: "https://printablepolly.com/first-grade-worksheets" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What worksheets should 1st graders practice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "First graders benefit most from worksheets that reinforce the foundational skills of the year: sight word recognition, phonics and short-vowel spelling, addition and subtraction within 20, place value (tens and ones), telling time to the hour and half-hour, and handwriting practice. A mix of reading, writing, and math worksheets keeps learning balanced and builds confidence across subjects.",
      },
    },
    {
      "@type": "Question",
      name: "What math does 1st grade cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "First grade math focuses on addition and subtraction within 20, with students working toward fluency with basic facts. They also learn place value concepts (tens and ones), how to compare numbers, measure lengths with non-standard units, and tell time to the hour and half-hour. Number lines and ten-frames are common tools used to build number sense.",
      },
    },
    {
      "@type": "Question",
      name: "Are these 1st grade worksheets free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — every worksheet on Printable Polly is completely free. There is no signup, no account, and no paywall. Open any worksheet you need and print it directly from your browser. These are designed for both classroom teachers and parents supporting learning at home.",
      },
    },
    {
      "@type": "Question",
      name: "How many sight words should a 1st grader know?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "By the end of 1st grade, most students are expected to know between 100 and 150 sight words. The Dolch word list includes 220 words total, and 1st graders typically master the Pre-Primer, Primer, and Grade 1 lists. Regular practice with sight word worksheets and flash cards helps build the automatic recognition that supports fluent reading.",
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
      name: "1st Grade Worksheets",
      item: "https://printablepolly.com/first-grade-worksheets",
    },
  ],
};

const worksheets = [
  {
    href: "/sight-words",
    emoji: "👁️",
    title: "Sight Words",
    description: "First grade Dolch and Fry sight word practice sheets",
  },
  {
    href: "/spelling-worksheets",
    emoji: "🔤",
    title: "Spelling Worksheets",
    description: "Short vowel, blends, and digraph spelling practice",
  },
  {
    href: "/math-worksheets",
    emoji: "➕",
    title: "Math Worksheets",
    description: "Addition and subtraction within 20",
  },
  {
    href: "/number-line",
    emoji: "📏",
    title: "Number Line",
    description: "Number lines to 20 and 100 for addition practice",
  },
  {
    href: "/place-value",
    emoji: "🔢",
    title: "Place Value",
    description: "Tens and ones place value worksheets",
  },
  {
    href: "/telling-time",
    emoji: "🕐",
    title: "Telling Time",
    description: "Telling time to the hour and half-hour",
  },
  {
    href: "/handwriting-practice",
    emoji: "✏️",
    title: "Handwriting Practice",
    description: "Sentence writing with proper letter formation",
  },
  {
    href: "/tracing-letters",
    emoji: "📝",
    title: "Tracing Letters",
    description: "Alphabet tracing for letter formation reinforcement",
  },
  {
    href: "/flash-cards",
    emoji: "🃏",
    title: "Flash Cards",
    description: "Sight word and math fact flash cards",
  },
  {
    href: "/coloring-pages",
    emoji: "🎨",
    title: "Coloring Pages",
    description: "Coloring pages for creative expression and relaxation",
  },
  {
    href: "/word-search",
    emoji: "🔍",
    title: "Word Search Puzzles",
    description: "Simple word searches with first grade vocabulary",
  },
  {
    href: "/reading-log",
    emoji: "📚",
    title: "Reading Log",
    description: "Track books read at home with this printable log",
  },
];

const gradeLevels = [
  { label: "Kindergarten", href: "/kindergarten-worksheets" },
  { label: "2nd Grade", href: "/second-grade-worksheets" },
  { label: "3rd Grade", href: "/third-grade-worksheets" },
  { label: "4th Grade", href: "/fourth-grade-worksheets" },
  { label: "5th Grade", href: "/fifth-grade-worksheets" },
];

export default function FirstGradeWorksheetsPage() {
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
          <span className="text-gray-700">1st Grade Worksheets</span>
        </nav>

        {/* H1 + Intro */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Free Printable 1st Grade Worksheets
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mb-10">
          All the printable worksheets your first grader needs, completely free. Designed for ages
          6–7, these printable PDFs cover math, reading, spelling, handwriting, and more — ready
          to print directly from your browser with no account or signup required. Whether you&apos;re a
          classroom teacher or a parent supporting learning at home, every worksheet here is built
          for the real skills of first grade.
        </p>

        {/* Worksheet Grid */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Browse 1st Grade Worksheets</h2>
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

        {/* What 1st Graders Are Learning */}
        <section className="mb-14 max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            What 1st Graders Are Learning
          </h2>

          <div className="space-y-7">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Phonics &amp; Reading</h3>
              <p className="text-gray-600">
                First grade is when most children truly learn to read. Students master short vowel
                sounds, consonant blends (like &quot;bl,&quot; &quot;cr,&quot; and &quot;st&quot;), and common digraphs like
                &quot;sh,&quot; &quot;ch,&quot; and &quot;th.&quot; They build a bank of high-frequency sight words drawn from
                the Dolch and Fry lists, working toward automatic recognition of the most common
                words in print. By year&apos;s end, most 1st graders can read simple books independently
                and begin to understand what they read through basic comprehension strategies.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Math</h3>
              <p className="text-gray-600">
                First grade math builds the number sense that supports all future math learning.
                Students work intensively on addition and subtraction within 20, aiming for fluency
                with basic facts. They explore place value by grouping objects into tens and ones,
                compare two-digit numbers, and use tools like number lines and ten-frames to reason
                about quantity. Measurement (using non-standard units), data (simple graphs and
                tallies), and geometry (identifying 2D and 3D shapes) round out the year.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Writing &amp; Grammar</h3>
              <p className="text-gray-600">
                In first grade, students move from copying letters to expressing ideas in writing.
                They practice forming all uppercase and lowercase letters correctly, write complete
                sentences with capital letters and end punctuation, and begin drafting short
                informational and narrative pieces. Spelling patterns — short vowels, consonant
                blends, simple word families — are introduced alongside grammar basics like nouns,
                verbs, and adjectives. Daily writing practice, even just one or two sentences,
                builds both skill and confidence.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Science</h3>
              <p className="text-gray-600">
                First grade science introduces students to observation and inquiry. Common topics
                include the properties of matter (solid, liquid, gas), plants and their life cycles,
                animal habitats, weather and seasons, and the differences between living and
                non-living things. Students begin to use science notebooks to record what they
                observe and ask simple questions about the world around them — laying the groundwork
                for scientific thinking that deepens in later grades.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Social Studies</h3>
              <p className="text-gray-600">
                Social studies in first grade typically centers on the concept of community — the
                family, the classroom, the school, and the neighborhood. Students learn about roles
                and responsibilities, rules and laws, and how people work together. Many curricula
                also introduce basic map skills (identifying land and water, reading simple maps),
                national symbols and holidays, and notable figures who contributed to the community
                or country. These lessons help young learners develop a sense of belonging and
                civic identity.
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
