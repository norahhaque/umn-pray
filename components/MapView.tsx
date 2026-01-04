"use client";

import { useEffect, useRef, useState } from "react";
import { PrayerSpace } from "@/lib/types";

interface MapViewProps {
  spaces: PrayerSpace[];
  userLocation?: { lat: number; lng: number } | null;
}

export default function MapView({ spaces, userLocation }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const userMarkerRef = useRef<google.maps.Marker | null>(null);
  const isInitialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  // UMN Twin Cities campus center coordinates
  const UMN_CENTER = { lat: 44.9747, lng: -93.2354 };

  useEffect(() => {
    const initializeMap = async () => {
      // Only initialize once
      if (isInitialized.current || !mapRef.current) return;

      // Wait for Google Maps
      if (!window.google?.maps) {
        setTimeout(initializeMap, 100);
        return;
      }

      isInitialized.current = true;

      // Create the map only once
      const map = new google.maps.Map(mapRef.current, {
        center: UMN_CENTER,
        zoom: 14,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });

      googleMapRef.current = map;

      // Add initial markers
      await addMarkers(map, spaces);
      setIsLoading(false);
    };

    initializeMap();
  }, []);

  // Update markers when spaces change (due to filtering)
  useEffect(() => {
    if (googleMapRef.current && isInitialized.current) {
      addMarkers(googleMapRef.current, spaces);
    }
  }, [spaces]);

  // Update user location marker when location changes
  useEffect(() => {
    if (!googleMapRef.current || !isInitialized.current) return;

    // Remove existing user marker
    if (userMarkerRef.current) {
      userMarkerRef.current.setMap(null);
      userMarkerRef.current = null;
    }

    // Add new user marker if location is available
    if (userLocation) {
      userMarkerRef.current = new google.maps.Marker({
        position: userLocation,
        map: googleMapRef.current,
        title: "Your Location",
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#4285F4",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
        zIndex: 1000,
      });

      // Add info window for user location
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px;">
            <h3 style="margin: 0; font-size: 14px; font-weight: 600; color: #451616;">
              Your Location
            </h3>
          </div>
        `,
      });

      userMarkerRef.current.addListener("click", () => {
        infoWindow.open(googleMapRef.current!, userMarkerRef.current!);
      });
    }
  }, [userLocation]);

  const addMarkers = async (map: google.maps.Map, spacesToShow: PrayerSpace[]) => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Create geocoder instance
    const geocoder = new google.maps.Geocoder();

    // Add markers for all spaces
    for (const space of spacesToShow) {
      let lat = space.latitude;
      let lng = space.longitude;

      // Geocode if coordinates are missing using Google Maps JS API
      if (!lat || !lng) {
        try {
          // Add "University of Minnesota, Minneapolis, MN" context if not already in address
          const addressWithContext = space.address.toLowerCase().includes('minneapolis')
            ? space.address
            : `${space.address}, University of Minnesota, Minneapolis, MN`;

          const result = await geocoder.geocode({ address: addressWithContext });
          if (result.results[0]) {
            lat = result.results[0].geometry.location.lat();
            lng = result.results[0].geometry.location.lng();
          }
        } catch (error) {
          console.error(`Failed to geocode address for ${space.name}:`, error);
          continue;
        }
      }

      if (lat && lng) {
        const marker = new google.maps.Marker({
          position: { lat, lng },
          map,
          title: space.name,
          animation: google.maps.Animation.DROP,
        });

        // Create info window content
        const infoWindow = new google.maps.InfoWindow({
          content: createInfoWindowContent(space),
        });

        // Show info window on click
        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });

        markersRef.current.push(marker);
      }
    }

    // Adjust map bounds to fit all markers if there are any
    if (markersRef.current.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      markersRef.current.forEach(marker => {
        const position = marker.getPosition();
        if (position) bounds.extend(position);
      });
      // Also include user location in bounds if available
      if (userMarkerRef.current) {
        const position = userMarkerRef.current.getPosition();
        if (position) bounds.extend(position);
      }
      map.fitBounds(bounds);

      // Don't zoom in too much if there's only one marker
      const listener = google.maps.event.addListenerOnce(map, "bounds_changed", () => {
        const zoom = map.getZoom();
        if (zoom && zoom > 16) {
          map.setZoom(16);
        }
      });
    }
  };

  const createInfoWindowContent = (space: PrayerSpace): string => {
    const amenities = [];
    if (space.hasPrayerRugs) amenities.push("Prayer Rugs");
    if (space.hasWuduAccess) amenities.push("Wudu Access");
    if (space.hasDivider) amenities.push("Divider");
    if (space.isPrivateFromPublic) amenities.push("Private");

    return `
      <div style="padding: 8px; max-width: 250px;">
        <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 600; color: #451616;">
          ${space.name}
        </h3>
        <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">
          ${space.building} ${space.room}
        </p>
        ${amenities.length > 0 ? `
          <div style="margin-bottom: 8px;">
            ${amenities.map(amenity =>
              `<span style="display: inline-block; background: #E0E0DF; padding: 2px 8px; margin: 2px; border-radius: 4px; font-size: 12px;">${amenity}</span>`
            ).join('')}
          </div>
        ` : ''}
        <a href="/space/${space.slug.current}"
           style="display: inline-block; background: #451616; color: white; padding: 6px 12px; border-radius: 4px; text-decoration: none; font-size: 14px; margin-top: 4px;">
          View Details
        </a>
      </div>
    `;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Map Container */}
      <div className="flex-1 w-full relative">
        <div ref={mapRef} className="absolute inset-0" />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <p className="text-gray-600">Loading map...</p>
          </div>
        )}
      </div>
    </div>
  );
}
