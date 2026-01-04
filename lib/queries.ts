import { client } from "@/sanity/client";
import { PrayerSpace } from "./types";

/**
 * GROQ Queries for fetching Prayer Space data from Sanity
 */

// Query to get all prayer spaces
const allPrayerSpacesQuery = `
  *[_type == "prayerSpace"] | order(name asc) {
    _id,
    name,
    slug,
    building,
    buildingFullName,
    room,
    campusLocation,
    address,
    latitude,
    longitude,
    hasPrayerRugs,
    hasWuduAccess,
    hasDivider,
    isPrivateFromPublic,
    isQuiet,
    isCleanTidy,
    capacity,
    genderPrivacyDetails,
    accessInstructions,
    photos
  }
`;

// Query to get a single prayer space by slug
const prayerSpaceBySlugQuery = `
  *[_type == "prayerSpace" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    building,
    buildingFullName,
    room,
    campusLocation,
    address,
    latitude,
    longitude,
    hasPrayerRugs,
    hasWuduAccess,
    hasDivider,
    isPrivateFromPublic,
    isQuiet,
    isCleanTidy,
    capacity,
    genderPrivacyDetails,
    accessInstructions,
    photos
  }
`;

/**
 * Fetch all prayer spaces from Sanity
 * Used on the home page to display the list
 */
export async function getAllPrayerSpaces(): Promise<PrayerSpace[]> {
  try {
    const spaces = await client.fetch(allPrayerSpacesQuery);
    return spaces;
  } catch (error) {
    console.error("Error fetching prayer spaces:", error);
    return [];
  }
}

/**
 * Fetch a single prayer space by its slug
 * Used on the detail page
 */
export async function getPrayerSpaceBySlug(
  slug: string
): Promise<PrayerSpace | null> {
  try {
    const space = await client.fetch(prayerSpaceBySlugQuery, { slug });
    return space;
  } catch (error) {
    console.error("Error fetching prayer space:", error);
    return null;
  }
}
