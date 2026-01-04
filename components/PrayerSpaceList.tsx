"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { PrayerSpace } from "@/lib/types";
import PrayerSpaceCard from "./PrayerSpaceCard";
import { getUserLocation, calculateDistance, geocodeAddress } from "@/lib/geocoding";

// Dynamically import MapView with SSR disabled
const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full flex items-center justify-center bg-gray-100 rounded-lg">
      <p className="text-gray-600">Loading map...</p>
    </div>
  ),
});

interface PrayerSpaceListProps {
  spaces: PrayerSpace[];
  showHeroButton?: boolean;
}

type CampusFilter = "All" | "East Bank" | "West Bank" | "St. Paul";
type ViewMode = "list" | "map";

interface SpaceWithDistance extends PrayerSpace {
  distance?: number;
}

export default function PrayerSpaceList({ spaces, showHeroButton = false }: PrayerSpaceListProps) {
  const [selectedCampus, setSelectedCampus] = useState<CampusFilter>("All");
  const [nearMeActive, setNearMeActive] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [spacesWithDistance, setSpacesWithDistance] = useState<SpaceWithDistance[]>(spaces);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  // Handle "Sort by Distance" button click
  const handleFindNearest = async () => {
    setIsLoadingLocation(true);
    try {
      const position = await getUserLocation();
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      setUserLocation({ lat: userLat, lng: userLng });
      setNearMeActive(true);

      // Calculate distances and geocode if needed
      const spacesWithDist = await Promise.all(
        spaces.map(async (space) => {
          let spaceLat = space.latitude;
          let spaceLng = space.longitude;

          // If coordinates missing, geocode the address
          if (!spaceLat || !spaceLng) {
            const geocoded = await geocodeAddress(space.address);
            if (geocoded) {
              spaceLat = geocoded.latitude;
              spaceLng = geocoded.longitude;
            }
          }

          if (spaceLat && spaceLng) {
            const distance = calculateDistance(userLat, userLng, spaceLat, spaceLng);
            return { ...space, distance };
          }
          return { ...space, distance: undefined };
        })
      );

      // Sort by distance
      spacesWithDist.sort((a, b) => {
        if (a.distance === undefined) return 1;
        if (b.distance === undefined) return -1;
        return a.distance - b.distance;
      });

      setSpacesWithDistance(spacesWithDist);
    } catch (error) {
      console.error('Error getting location:', error);
      alert('Unable to get your location. Please enable location services.');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  // Reset to original list when near me is turned off
  useEffect(() => {
    if (!nearMeActive) {
      setSpacesWithDistance(spaces);
    }
  }, [nearMeActive, spaces]);

  // Filter spaces based on selected campus
  let displayedSpaces = selectedCampus === "All"
    ? spacesWithDistance
    : spacesWithDistance.filter(space => space.campusLocation === selectedCampus);

  return (
    <div>
      {/* Mobile Hero CTA Button - Only shown on mobile when showHeroButton is true */}
      {showHeroButton && (
        <div className="lg:hidden mb-8">
          <button
            onClick={handleFindNearest}
            disabled={isLoadingLocation}
            className="w-full flex items-center justify-center gap-3 bg-umn-maroon text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-umn-maroon-light transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {isLoadingLocation ? 'Finding...' : 'Sort by Distance'}
          </button>
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        {/* View Toggle Switch - Left side */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">List</span>
          <button
            onClick={() => setViewMode(viewMode === "list" ? "map" : "list")}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none border-0 shadow-sm ${
              viewMode === "map" ? "bg-umn-maroon" : "bg-gray-300"
            }`}
            role="switch"
            aria-checked={viewMode === "map"}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out ${
                viewMode === "map" ? "translate-x-8" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-sm font-medium text-gray-700">Map</span>
        </div>

        {/* Filters - Right side */}
        <div className="flex gap-3 flex-wrap items-center">
          {/* Sort by Distance button - shown on desktop in list view only */}
          {viewMode === "list" && (
            <button
              onClick={() => {
                if (nearMeActive) {
                  setNearMeActive(false);
                } else {
                  handleFindNearest();
                }
              }}
              disabled={isLoadingLocation}
              className={`hidden lg:inline-flex items-center gap-2 pl-3 pr-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                nearMeActive
                  ? "bg-umn-maroon text-white hover:shadow-md"
                  : "bg-umn-maroon text-white hover:shadow-md"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {nearMeActive ? 'Clear Distance Sort' : 'Sort by Distance'}
            </button>
          )}

          {/* Campus Filter Dropdown */}
          <div className="relative">
            <select
              value={selectedCampus}
              onChange={(e) => {
                setSelectedCampus(e.target.value as CampusFilter);
                setNearMeActive(false);
              }}
              className="appearance-none bg-gray-50 border-[0.5px] border-gray-200 rounded-md pl-3 pr-9 py-2 text-sm text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:bg-white cursor-pointer transition-colors"
            >
              <option value="All">All Campuses</option>
              <option value="East Bank">East Bank</option>
              <option value="West Bank">West Bank</option>
              <option value="St. Paul">St. Paul</option>
            </select>
            {/* Dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Prayer space cards or map view */}
      {displayedSpaces.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-umn-gray mb-4">
            No prayer spaces found {nearMeActive ? 'near you' : `for ${selectedCampus}`}.
          </p>
        </div>
      ) : viewMode === "list" ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {displayedSpaces.map((space) => (
            <PrayerSpaceCard
              key={space._id}
              space={space}
              distance={nearMeActive ? space.distance : undefined}
            />
          ))}
        </div>
      ) : (
        <div className="h-[600px] w-full">
          <MapView spaces={displayedSpaces} userLocation={userLocation} />
        </div>
      )}
    </div>
  );
}
