import { getAllPrayerSpaces } from "@/lib/queries";
import PrayerSpaceList from "@/components/PrayerSpaceList";

/**
 * Home Page - Lists all prayer spaces
 * Data is fetched from Sanity at build time
 */
export default async function HomePage() {
  const spaces = await getAllPrayerSpaces();

  return (
    <div>
      {/* Hero Section with background image */}
      <div
        className="relative w-full h-[400px] md:h-[500px] bg-cover bg-center"
        style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06)), url('/images/umn-twin-cities-northrop.jpg')" }}
      >
        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col justify-end pb-11 md:pb-14 px-2 md:px-8 lg:px-10">
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
          <PrayerSpaceList spaces={spaces} />
        )}
      </div>
    </div>
  );
}
