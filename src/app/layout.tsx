import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://printablepolly.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/polly.png",
  },
  title: "Printable Polly — Free Printable Templates",
  description:
    "Free printable template generator. Create graph paper, lined paper, planners, calendars, checklists, and more. Customize and print instantly — no signup required.",
  openGraph: {
    title: "Printable Polly — Free Printable Templates",
    description:
      "Free printable template generator. Create graph paper, lined paper, planners, calendars, checklists, and more. Customize and print instantly.",
    type: "website",
    url: "https://printablepolly.com",
    siteName: "Printable Polly",
  },
  twitter: {
    card: "summary",
    title: "Printable Polly — Free Printable Templates",
    description:
      "Free printable template generator. Create graph paper, planners, calendars, checklists, and more. Customize and print instantly.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-DW4CLWDB9M"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-DW4CLWDB9M');
        `}
      </Script>
      <body className="min-h-full flex flex-col font-sans bg-gray-50 text-gray-900">
        <header className="bg-emerald-600 shadow-sm no-print">
          <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/polly.png"
                alt="Polly the Parrot"
                width={32}
                height={32}
                className="rounded"
              />
              <span className="text-xl font-bold text-white">
                Printable Polly
              </span>
            </Link>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-gray-200 mt-12 no-print">
          <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 text-center mb-2">
                More Free Tools
              </p>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
                <a href="https://appliancecostcalculator.net" className="text-emerald-600 hover:underline">Appliance Cost Calculator</a>
                <a href="https://sidehustletaxcalculator.net" className="text-emerald-600 hover:underline">Side Hustle Tax Calculator</a>
                <a href="https://imageconverters.net" className="text-emerald-600 hover:underline">Image Converter</a>
                <a href="https://photometadata.net" className="text-emerald-600 hover:underline">Photo Metadata Viewer</a>
                <a href="https://freelancerates.net" className="text-emerald-600 hover:underline">Freelance Rate Calculator</a>
                <a href="https://imageresizers.net" className="text-emerald-600 hover:underline">Social Image Resizer</a>
                <a href="https://lendingcalculator.net" className="text-emerald-600 hover:underline">Mortgage Calculator</a>
                <a href="https://compoundinterestcalc.app" className="text-emerald-600 hover:underline">Compound Interest Calculator</a>
                <a href="https://salaryconverter.net" className="text-emerald-600 hover:underline">Salary Converter</a>
                <a href="https://biblegarden.net" className="text-emerald-600 hover:underline">Bible Garden</a>
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center">
              All templates are generated in your browser. No data is uploaded or stored.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
