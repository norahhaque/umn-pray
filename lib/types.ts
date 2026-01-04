/**
 * TypeScript types for Prayer Space data
 */

export interface PrayerSpace {
  _id: string;
  name: string; // Prayer space name/title (e.g., "AMCC", "Lind Hall")
  slug: {
    current: string;
  };
  building: string; // Building abbreviation/code (e.g., "CSE", "Coffman")
  buildingFullName?: string; // Full building name
  room?: string; // Room number including floor (e.g., "234" = floor 2 room 34)
  campusLocation: "East Bank" | "West Bank" | "St. Paul";
  address: string; // Building address or name for Google Maps
  latitude?: number; // Auto-calculated from address
  longitude?: number; // Auto-calculated from address

  // Amenities
  hasPrayerRugs?: boolean;
  hasWuduAccess?: boolean;
  hasDivider?: boolean;
  isPrivateFromPublic?: boolean;
  isQuiet?: boolean;
  isCleanTidy?: boolean;

  // Additional details
  capacity?: number;
  genderPrivacyDetails?: string;
  accessInstructions?: string;

  // Photos
  photos?: Array<{
    _key: string;
    asset: {
      _ref: string;
      _type: "reference";
    };
  }>;
}
