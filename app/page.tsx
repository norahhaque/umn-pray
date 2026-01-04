import Script from "next/script";
import Image from "next/image";
import { getAllPrayerSpaces } from "@/lib/queries";
import PrayerSpaceList from "@/components/PrayerSpaceList";
import heroImage from "@/public/images/umn-twin-cities-northrop.jpg";

/**
 * Home Page - Lists all prayer spaces
 * Data is fetched from Sanity at build time
 */
export default async function HomePage() {
  const spaces = await getAllPrayerSpaces();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
        strategy="beforeInteractive"
      />
      <div>
        {/* Hero Section with background image */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        {/* Next.js Image with blur placeholder */}
        <Image
          src={heroImage}
          alt="UMN Twin Cities Northrop"
          fill
          priority
          placeholder="blur"
          className="object-cover"
          sizes="100vw"
        />

        {/* White overlay for subtle lightening effect */}
        <div className="absolute inset-0 bg-white opacity-[0.06]" />

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-14 px-2 md:px-8 lg:px-10 z-10">
          <h1
            className="text-white"
            style={{
              fontFamily: 'var(--font-league-spartan)',
              fontSize: 'clamp(48px, 10vw, 115px)',
              fontWeight: 700,
              lineHeight: 0.75,
              marginBottom: 0
            }}
          >
            UMN PRAY
          </h1>
          <p
            className="text-white max-w-md"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(12px, 2vw, 20px)',
              fontWeight: 400,
              lineHeight: 1,
              marginTop: 'clamp(-3px, -0.7vw, -6px)'
            }}
          >
            Prayer, reflection, and quiet spaces at the University of Minnesota
          </p>
        </div>
      </div>

      {/* Main content section */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {spaces.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-umn-gray mb-4">
              No prayer spaces have been added yet.
            </p>
            <p className="text-sm text-umn-gray">
              Visit <a href="/studio" className="text-umn-maroon hover:underline">/studio</a> to add prayer spaces.
            </p>
          </div>
        ) : (
          <PrayerSpaceList spaces={spaces} showHeroButton={true} />
        )}
      </div>
      </div>
    </>
  );
}
