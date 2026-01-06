import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UMN Pray - Prayer Spaces at University of Minnesota | Twin Cities Campus",
  description: "Find prayer and reflection spaces at the University of Minnesota Twin Cities. Search prayer rooms across East Bank, West Bank, and St. Paul campuses with amenities like wudu access, prayer rugs, and private spaces for students, faculty, and staff.",
  keywords: [
    "UMN prayer spaces",
    "University of Minnesota prayer rooms",
    "prayer spaces at the U",
    "UMN Twin Cities prayer",
    "UMN wudu",
    "Muslim prayer UMN",
    "prayer rooms Minneapolis",
    "UMN East Bank prayer",
    "UMN quiet spaces",
    "UMN reflection rooms",
    "University of Minnesota Muslim",
    "campus prayer facilities",
  ],
  authors: [{ name: "UMN Student Government & CSE Student Board" }],
  openGraph: {
    title: "UMN Pray - Prayer Spaces at University of Minnesota",
    description: "Find prayer and reflection spaces at the University of Minnesota Twin Cities. Search prayer rooms with amenities across all campuses.",
    url: "https://umnpray.org",
    siteName: "UMN Pray",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UMN Pray - Prayer Spaces at University of Minnesota",
    description: "Find prayer and reflection spaces at UMN Twin Cities. Search prayer rooms across East Bank, West Bank, and St. Paul campuses.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://umnpray.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-umn-green">
      <body className="antialiased m-0 p-0 bg-white">
        {/* Header with logo on left */}
        <header className="bg-white border-b border-umn-light-gray">
          <div className="py-4 pl-2 md:pl-10">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="UMN Pray Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main className="min-h-screen p-0 m-0">
          {children}
        </main>

        {/* Footer with green background */}
        <footer className="bg-umn-green mt-16">
          <div className="py-8 pl-2 md:pl-10">
            <div className="flex flex-col items-start gap-1">
              {/* Logo */}
              <Image
                src="/images/logo.png"
                alt="UMN Pray Logo"
                width={140}
                height={47}
                className="h-10 w-auto"
              />

              {/* Footer text directly underneath */}
              <p className="text-umn-maroon text-sm font-semibold leading-relaxed max-w-8xl">
                UMNPray is maintained by the DEI Committees on the Undergraduate Student Government and CSE Student Board. It is not officially affiliated with the University of Minnesota.
              </p>

              {/* Contact and Privacy links */}
              <div className="flex gap-3 mt-1">
                <a
                  href="/about"
                  className="text-umn-maroon text-xs hover:underline"
                >
                  About
                </a>
                <span className="text-umn-maroon text-xs">·</span>
                <a
                  href="/privacy"
                  className="text-umn-maroon text-xs hover:underline"
                >
                  Privacy Policy
                </a>
                <span className="text-umn-maroon text-xs">·</span>
                <a
                  href="mailto:usg@umn.edu,sesb@umn.edu?subject=UMN%20Pray%20Feedback"
                  className="text-umn-maroon text-xs hover:underline"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
