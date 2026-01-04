"use client";

import dynamic from "next/dynamic";
import { PrayerSpace } from "@/lib/types";

// Disable SSR for MapView
const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      <p className="text-gray-600">Loading map...</p>
    </div>
  ),
});

interface MapPageClientProps {
  spaces: PrayerSpace[];
}

export default function MapPageClient({ spaces }: MapPageClientProps) {
  return (
    <div className="h-screen flex flex-col">
      {/* Page Title */}
      <div className="bg-white border-b border-umn-light-gray px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div>
            <h1 className="text-2xl font-bold text-umn-maroon">Prayer Spaces Map</h1>
            <p className="text-sm text-gray-600 mt-1">
              Click on any marker to view space details
            </p>
          </div>
          <a
            href="mailto:usg@umn.edu,sesb@umn.edu?subject=UMN%20Pray%20Map%20Feedback"
            className="text-xs text-umn-maroon hover:underline"
          >
            Report an Issue
          </a>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1">
        <MapView spaces={spaces} />
      </div>
    </div>
  );
}
