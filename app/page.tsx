import Script from "next/script";
import Link from "next/link";
import { Suspense } from "react";
import { getAllPrayerSpaces } from "@/lib/queries";
import PrayerSpaceList from "@/components/PrayerSpaceList";
import HeroTyping from "@/components/HeroTyping";

/**
 * Home Page - Lists all prayer spaces
 * Data is fetched from Sanity at build time
 */
export default async function HomePage() {
  const spaces = await getAllPrayerSpaces();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "UMN Pray",
    url: "https://umnpray.org",
    description:
      "Find prayer and reflection spaces at the University of Minnesota Twin Cities campus",
    publisher: {
      "@type": "Organization",
      name: "UMN Student Government & CSE Student Board",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://umnpray.org/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
        strategy="beforeInteractive"
      />
      <div>
        {/* Hero Section */}
        <div
          className="w-full flex flex-col px-4 md:px-8 lg:px-10 pt-16 pb-8 md:pb-6"
          style={{ minHeight: "clamp(220px, 30vw, 340px)" }}
        >
          <h1
            className="text-umn-maroon"
            style={{
              fontFamily: "var(--font-league-spartan)",
              fontSize: "clamp(92px, 13vw, 130px)",
              fontWeight: 700,
              lineHeight: 0.75,
              marginBottom: 0,
            }}
          >
            <span className="block text-umn-maroon/30" style={{ fontSize: '0.82em', marginBottom: '0.1em' }}>UMN</span>
            <HeroTyping />
          </h1>
          <p
            className="text-umn-maroon/60 max-w-md"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(15px, 1.8vw, 18px)",
              fontWeight: 400,
              lineHeight: 1,
              marginTop: "clamp(6px, 1vw, 4px)",
            }}
          >
            Prayer, reflection, and quiet spaces at the University of Minnesota
          </p>
        </div>

        {/* Main content section */}
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-12 md:py-12">
          {spaces.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-umn-gray mb-4">
                No prayer spaces have been added yet.
              </p>
              <p className="text-sm text-umn-gray">
                Visit{" "}
                <Link
                  href="/studio"
                  className="text-umn-maroon hover:underline"
                >
                  /studio
                </Link>{" "}
                to add prayer spaces.
              </p>
            </div>
          ) : (
            <Suspense
              fallback={<div className="text-center py-12">Loading...</div>}
            >
              <PrayerSpaceList spaces={spaces} showHeroButton={true} />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
}
