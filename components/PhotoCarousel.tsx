"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface PhotoCarouselProps {
  photos: string[]; // Array of photo URLs
  alt: string; // Alt text for images
  stretchToFit?: boolean; // If true, stretches to fill container height
}

/**
 * Photo Carousel Component
 * Displays a carousel of photos with navigation arrows, indicators, and swipe support
 * Aspect ratio: 3:4 (portrait) on mobile, stretches on desktop if stretchToFit is true
 */
export default function PhotoCarousel({ photos, alt, stretchToFit = false }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  if (!photos || photos.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // Minimum distance for a swipe

    if (swipeDistance > minSwipeDistance) {
      // Swiped left -> go to next
      goToNext();
    } else if (swipeDistance < -minSwipeDistance) {
      // Swiped right -> go to previous
      goToPrevious();
    }

    // Reset
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Only show navigation if there's more than 1 photo
  const showNavigation = photos.length > 1;

  return (
    <div
      className={`relative w-full bg-gray-100 rounded-lg overflow-hidden group ${
        stretchToFit ? 'aspect-[3/4] lg:aspect-auto lg:h-full' : 'aspect-[3/4]'
      }`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Render all photos for preloading, but only show current */}
      {photos.map((photo, index) => (
        <Image
          key={photo}
          src={photo}
          alt={`${alt} photo ${index + 1}`}
          fill
          className={`object-cover transition-opacity duration-300 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={index === 0}
        />
      ))}

      {/* Navigation Arrows - Only show if multiple photos */}
      {showNavigation && (
        <>
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Previous photo"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Next photo"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-white w-6"
                    : "bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Photo counter (e.g., "1 / 5") */}
      {showNavigation && (
        <div className="absolute top-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
          {currentIndex + 1} / {photos.length}
        </div>
      )}
    </div>
  );
}
