"use client";

import { useState } from "react";
import { PrayerSpace } from "@/lib/types";
import PrayerSpaceCard from "./PrayerSpaceCard";

interface PrayerSpaceListProps {
  spaces: PrayerSpace[];
}

type CampusFilter = "All" | "East Bank" | "West Bank" | "St. Paul";

export default function PrayerSpaceList({ spaces }: PrayerSpaceListProps) {
  const [selectedCampus, setSelectedCampus] = useState<CampusFilter>("All");

  // Filter spaces based on selected campus
  const filteredSpaces = selectedCampus === "All"
    ? spaces
    : spaces.filter(space => space.campusLocation === selectedCampus);

  const filterOptions: CampusFilter[] = ["All", "East Bank", "West Bank", "St. Paul"];

  return (
    <div>
      {/* Filter Bar */}
      <div className="flex justify-end mb-6">
        <div className="flex gap-2 flex-wrap justify-end">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedCampus(option)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCampus === option
                  ? "bg-umn-maroon text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Prayer space cards */}
      {filteredSpaces.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-umn-gray mb-4">
            No prayer spaces found for {selectedCampus}.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredSpaces.map((space) => (
            <PrayerSpaceCard key={space._id} space={space} />
          ))}
        </div>
      )}
    </div>
  );
}
