import { notFound } from "next/navigation";
import Link from "next/link";
import { getPrayerSpaceBySlug, getAllPrayerSpaces } from "@/lib/queries";
import { urlFor } from "@/lib/sanity-image";
import PhotoCarousel from "@/components/PhotoCarousel";

/**
 * Prayer Space Detail Page
 * Shows full information about a single prayer space
 */

// Generate static params for all prayer spaces at build time
export async function generateStaticParams() {
  const spaces = await getAllPrayerSpaces();
  return spaces.map((space) => ({
    slug: space.slug.current,
  }));
}

export default async function PrayerSpaceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const space = await getPrayerSpaceBySlug(slug);

  if (!space) {
    notFound();
  }

  // Build Google Maps URLs using coordinates if available, otherwise use address
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const mapQuery = space.latitude && space.longitude
    ? `${space.latitude},${space.longitude}`
    : space.address;
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(mapQuery)}&zoom=17`;
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

  // Process photos for carousel
  const photoUrls = space.photos?.map((photo) =>
    urlFor(photo).width(600).height(800).url()
  ) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-umn-maroon mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        All spaces
      </Link>

      {/* Title */}
      <div className="flex justify-between items-start flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-umn-maroon mb-2">{space.name}</h1>
          <p className="text-lg text-gray-600">
            {space.room ? `${space.building} ${space.room}` : space.building}
          </p>
        </div>
        <a
          href={`mailto:usg@umn.edu,sesb@umn.edu?subject=UMN%20Pray%20-%20Issue%20with%20${encodeURIComponent(space.name)}`}
          className="text-sm text-umn-maroon hover:underline"
        >
          Report an Issue
        </a>
      </div>

      {/* Main Grid: 3 columns on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-stretch">
        {/* Column 1: Photo Carousel */}
        <div className="lg:col-span-1 flex">
          {photoUrls.length > 0 ? (
            <div className="w-full lg:h-auto">
              <PhotoCarousel photos={photoUrls} alt={space.name} stretchToFit />
            </div>
          ) : (
            <div className="w-full aspect-[3/4] lg:h-full bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">No photos available</span>
            </div>
          )}
        </div>

        {/* Column 2: Amenities + Location */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Amenities Card (50% height) */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 flex-1">
            <h2 className="text-xl font-semibold text-umn-maroon mb-2">
              Amenities
            </h2>
            <div className="space-y-3">
              <AmenityItem
                label="Prayer Rugs"
                available={space.hasPrayerRugs}
              />
              <AmenityItem
                label="Wudu Access"
                available={space.hasWuduAccess}
              />
              <AmenityItem label="Divider" available={space.hasDivider} />
              <AmenityItem
                label="Private from Public View"
                available={space.isPrivateFromPublic}
              />
              <AmenityItem
                label="Clean and Tidy"
                available={space.isCleanTidy}
              />
            </div>
          </div>

          {/* Location Card (50% height) */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 flex-1">
            <h2 className="text-xl font-semibold text-umn-maroon mb-2">
              Location
            </h2>
            <div className="relative w-full h-48 bg-gray-100 rounded overflow-hidden mb-3">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-umn-maroon hover:underline"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open in Google Maps
            </a>
          </div>
        </div>

        {/* Column 3: Privacy Details + Capacity + Access Guide */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Privacy Details Card (33% height) */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 flex-1">
            <h2 className="text-xl font-semibold text-umn-maroon mb-2">
              Privacy Details
            </h2>
            {space.genderPrivacyDetails ? (
              <p className="text-gray-700 whitespace-pre-line">
                {space.genderPrivacyDetails}
              </p>
            ) : (
              <p className="text-gray-400 italic">No privacy details provided</p>
            )}
          </div>

          {/* Capacity Card (33% height) */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 flex-1">
            <h2 className="text-xl font-semibold text-umn-maroon mb-2">
              Capacity
            </h2>
            {space.capacity ? (
              <p className="text-gray-700">
                This room accommodates {space.capacity} people at a time.
              </p>
            ) : (
              <p className="text-gray-400 italic">Capacity not specified</p>
            )}
          </div>

          {/* Access Guide Card (33% height) */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 flex-1">
            <h2 className="text-xl font-semibold text-umn-maroon mb-2">
              Access Guide
            </h2>
            {space.accessInstructions ? (
              <p className="text-gray-700 whitespace-pre-line">
                {space.accessInstructions}
              </p>
            ) : (
              <p className="text-gray-400 italic">No access instructions provided</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Helper component to display amenity status with custom check/x icons
 */
function AmenityItem({
  label,
  available,
}: {
  label: string;
  available?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 flex-shrink-0">
        {available ? (
          // Green checkmark
          <svg
            className="w-5 h-5 text-umn-green"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          // Maroon X
          <svg
            className="w-5 h-5 text-umn-maroon"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <span className="text-gray-700">{label}</span>
    </div>
  );
}
