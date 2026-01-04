import Link from "next/link";
import Image from "next/image";
import { PrayerSpace } from "@/lib/types";
import { urlFor } from "@/lib/sanity-image";

/**
 * Color mapping for amenity tags
 * Each amenity gets a specific color from the design system
 */
const AMENITY_COLORS: Record<string, string> = {
  "Prayer Rugs": "bg-umn-maroon-light text-white",
  "Wudu Access": "bg-umn-beige-dark text-white",
  "Clean": "bg-umn-green-light text-gray-800",
  "Divider": "bg-umn-brown-dark text-white",
  "Private": "bg-umn-sage text-white",
  "Small": "bg-umn-olive text-white",
  "Medium": "bg-umn-tan text-gray-800",
  "Large": "bg-umn-green-dark text-white",
  "East Bank": "bg-umn-maroon text-white",
  "West Bank": "bg-umn-brown-light text-gray-800",
  "St. Paul": "bg-umn-beige-light text-gray-800",
};

/**
 * Prayer Space Card Component
 * Displays a summary card for each prayer space on the main listing page
 */
export default function PrayerSpaceCard({
  space,
  distance
}: {
  space: PrayerSpace;
  distance?: number;
}) {
  // Collect active amenities to display
  const amenities = [];
  if (space.hasPrayerRugs) amenities.push("Prayer Rugs");
  if (space.hasWuduAccess) amenities.push("Wudu Access");
  if (space.hasDivider) amenities.push("Divider");
  if (space.campusLocation) amenities.push(space.campusLocation);
  if (space.isPrivateFromPublic) amenities.push("Private");
  if (space.isCleanTidy) amenities.push("Clean");
  

  if (space.capacity) {
    if (space.capacity <= 5) {
      amenities.push("Small");
    } else if (space.capacity <= 15) {
      amenities.push("Medium");
    } else {
      amenities.push("Large");
    }
  }

  // Get first photo for thumbnail if available
  const firstPhoto = space.photos?.[0];
  const imageUrl = firstPhoto
    ? urlFor(firstPhoto).width(400).height(300).url()
    : null;

  // Format location subtitle: "Building Abbreviation Room#"
  const locationSubtitle = space.room ? `${space.building} ${space.room}` : space.building;

  return (
    <Link
      href={`/space/${space.slug.current}`}
      className="block bg-white rounded-lg shadow-sm border border-umn-light-gray hover:shadow-lg transition-shadow overflow-hidden"
    >
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full h-48 bg-gray-100">
          <Image
            src={imageUrl}
            alt={space.name}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-umn-maroon mb-2">
          {space.name}
        </h3>
        <p className="text-sm text-umn-gray mb-2">
          {locationSubtitle}
        </p>
        {distance !== undefined && (
          <p className="text-sm font-medium text-umn-maroon mb-4 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {distance} {distance === 1 ? 'mile' : 'miles'} away
          </p>
        )}

        {/* Amenity tags with color mapping */}
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity) => (
              <span
                key={amenity}
                className={`px-3 py-1.5 text-xs font-medium rounded ${
                  AMENITY_COLORS[amenity] || "bg-gray-200 text-gray-800"
                }`}
              >
                {amenity}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
