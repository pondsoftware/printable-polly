/**
 * One-time script: Add WebApplication JSON-LD schema to all subpage page.tsx files.
 * Run with: node scripts/add-webapp-schema.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const APP_DIR = "src/app";
const DOMAIN = "https://printablepolly.com";

// Get all subpage directories (exclude root page.tsx and not-found)
const dirs = readdirSync(APP_DIR).filter((d) => {
  const full = join(APP_DIR, d);
  return statSync(full).isDirectory() && d !== "not-found";
});

let modified = 0;
let skipped = 0;

for (const dir of dirs) {
  const pagePath = join(APP_DIR, dir, "page.tsx");
  let content;
  try {
    content = readFileSync(pagePath, "utf-8");
  } catch {
    continue;
  }

  // Skip if already has WebApplication schema
  if (content.includes("WebApplication")) {
    skipped++;
    continue;
  }

  // Extract metadata fields
  const titleMatch = content.match(/title:\s*"([^"]+)"/);
  const descMatch = content.match(/description:\s*\n?\s*"([^"]+)"/);
  const canonicalMatch = content.match(/canonical:\s*"([^"]+)"/);

  if (!titleMatch || !descMatch) {
    console.log(`  SKIP (no metadata): ${dir}`);
    skipped++;
    continue;
  }

  // Clean title: remove "| Printable Polly" suffix
  const appName = titleMatch[1].replace(/\s*[|\-]\s*Printable Polly$/, "").replace(/^Free Printable\s+/, "").replace(/\s*-\s*.*$/, "").trim();
  const description = descMatch[1];
  const url = canonicalMatch ? canonicalMatch[1] : `${DOMAIN}/${dir}`;

  // Determine category based on directory name
  let category = "UtilityApplication";
  const educationalPages = [
    "math-worksheets", "fractions-worksheets", "algebra-worksheets", "geometry-worksheets",
    "sight-words", "spelling-worksheets", "flash-cards", "telling-time", "tracing-letters",
    "place-value", "handwriting-practice", "multiplication-table", "number-line",
    "periodic-table", "math-formulas", "grammar-rules", "us-states", "unit-conversions",
  ];
  if (educationalPages.includes(dir)) {
    category = "EducationalApplication";
  }

  // Build the JSON-LD constant
  const jsonLdBlock = `
const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "${appName}",
  description: "${description.replace(/"/g, '\\"')}",
  url: "${url}",
  applicationCategory: "${category}",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};
`;

  // Find the function component and wrap return in fragment with schema
  // Pattern: return <XxxClient />; → return (<><script .../><XxxClient /></>);
  const clientMatch = content.match(/return <(\w+Client)\s*\/>/);
  if (!clientMatch) {
    console.log(`  SKIP (no client return): ${dir}`);
    skipped++;
    continue;
  }

  const clientName = clientMatch[1];

  // Insert jsonLd const before the export default function
  let newContent = content.replace(
    /export default function/,
    `${jsonLdBlock}\nexport default function`
  );

  // Replace simple return with fragment containing schema
  newContent = newContent.replace(
    `return <${clientName} />;`,
    `return (\n    <>\n      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />\n      <${clientName} />\n    </>\n  );`
  );

  writeFileSync(pagePath, newContent);
  modified++;
  console.log(`  Added WebApplication schema: ${dir}`);
}

console.log(`\nDone: ${modified} modified, ${skipped} skipped`);
