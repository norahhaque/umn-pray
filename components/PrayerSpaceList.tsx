"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read state from URL params
  const urlCampus = (searchParams.get("campus") as CampusFilter) || "All";
  const urlShowAll = searchParams.get("showAll") === "true";
  const urlViewMode = (searchParams.get("view") as ViewMode) || "list";

  const [selectedCampus, setSelectedCampus] = useState<CampusFilter>(urlCampus);
  const [nearMeActive, setNearMeActive] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [spacesWithDistance, setSpacesWithDistance] = useState<SpaceWithDistance[]>(spaces);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>(urlViewMode);
  const [showAll, setShowAll] = useState(urlShowAll);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isInitialMount = useRef(true);
  const isRestoringFromURL = useRef(false);

  // Sync state FROM URL params when they change (e.g., browser back/forward)
  useEffect(() => {
    // Skip on initial mount since useState already used the initial values
    if (isInitialMount.current) {
      return;
    }

    // Mark that we're restoring from URL to prevent the reset useEffect from firing
    isRestoringFromURL.current = true;

    setSelectedCampus(urlCampus);
    setViewMode(urlViewMode);
    setShowAll(urlShowAll);

    // Reset the flag after state updates have been processed
    setTimeout(() => {
      isRestoringFromURL.current = false;
    }, 0);
  }, [urlCampus, urlShowAll, urlViewMode]);

  const INITIAL_DISPLAY_COUNT = isMobile ? 6 : 9;

  // Update URL when state changes
  const updateURL = useCallback((params: { campus?: CampusFilter; showAll?: boolean; view?: ViewMode }) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (params.campus !== undefined) {
      if (params.campus === "All") {
        newParams.delete("campus");
      } else {
        newParams.set("campus", params.campus);
      }
    }

    if (params.showAll !== undefined) {
      if (params.showAll) {
        newParams.set("showAll", "true");
      } else {
        newParams.delete("showAll");
      }
    }

    if (params.view !== undefined) {
      if (params.view === "list") {
        newParams.delete("view");
      } else {
        newParams.set("view", params.view);
      }
    }

    const newURL = newParams.toString() ? `?${newParams.toString()}` : "/";
    router.replace(newURL, { scroll: false });
  }, [searchParams, router]);

  // Detect mobile/desktop for initial display count
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggleShowAll = () => {
    if (showAll) {
      // Scroll to top when collapsing
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setShowAll(false);
      updateURL({ showAll: false });
    } else {
      // Trigger animation when expanding
      setIsAnimating(true);
      setShowAll(true);
      updateURL({ showAll: true });
      // Reset animation state after animation completes
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

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

  // Reset showAll when filters change (but not on initial mount or URL restore)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    // Don't reset if we're restoring state from URL (browser back/forward)
    if (isRestoringFromURL.current) {
      return;
    }
    setShowAll(false);
    updateURL({ showAll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCampus, nearMeActive, viewMode]);

  // Filter spaces based on selected campus
  let filteredSpaces = selectedCampus === "All"
    ? spacesWithDistance
    : spacesWithDistance.filter(space => space.campusLocation === selectedCampus);

  // Apply "show more" limit only in list view
  let displayedSpaces = filteredSpaces;
  if (viewMode === "list" && !showAll && filteredSpaces.length > INITIAL_DISPLAY_COUNT) {
    displayedSpaces = filteredSpaces.slice(0, INITIAL_DISPLAY_COUNT);
  }

  const hasMore = viewMode === "list" && filteredSpaces.length > INITIAL_DISPLAY_COUNT;

  return (
    <div>
      {/* Mobile Hero CTA Button - Only shown on mobile when showHeroButton is true */}
      {showHeroButton && (
        <div className="lg:hidden mb-8">
          <button
            onClick={handleFindNearest}
            disabled={isLoadingLocation}
            className="w-full flex items-center justify-center gap-2 bg-umn-maroon text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-umn-maroon-light transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            onClick={() => {
              const newMode = viewMode === "list" ? "map" : "list";
              setViewMode(newMode);
              updateURL({ view: newMode });
            }}
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
                const newCampus = e.target.value as CampusFilter;
                setSelectedCampus(newCampus);
                setNearMeActive(false);
                updateURL({ campus: newCampus });
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
        <>
          <div className="relative">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {displayedSpaces.map((space, index) => {
                const isNewlyRevealed = showAll && index >= INITIAL_DISPLAY_COUNT;
                const animationDelay = isNewlyRevealed && isAnimating
                  ? `${(index - INITIAL_DISPLAY_COUNT) * 50}ms`
                  : '0ms';

                return (
                  <div
                    key={space._id}
                    className={isNewlyRevealed && isAnimating ? 'animate-fade-in' : ''}
                    style={{ animationDelay }}
                  >
                    <PrayerSpaceCard
                      space={space}
                      distance={nearMeActive ? space.distance : undefined}
                    />
                  </div>
                );
              })}
            </div>

            {/* Gradient overlay */}
            {hasMore && !showAll && (
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
            )}
          </div>

          {/* See more button - below the grid */}
          {hasMore && !showAll && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleToggleShowAll}
                className="text-umn-maroon text-sm font-medium tracking-wide hover:scale-105 transition-transform duration-200 ease-out"
              >
                See more
              </button>
            </div>
          )}

          {/* See Less option when expanded */}
          {showAll && hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleToggleShowAll}
                className="text-umn-maroon text-sm font-medium tracking-wide hover:scale-105 transition-transform duration-200 ease-out"
              >
                See less
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="h-[600px] w-full">
          <MapView spaces={displayedSpaces} userLocation={userLocation} />
        </div>
      )}
    </div>
  );
}
