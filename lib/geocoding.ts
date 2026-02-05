/**
 * Geocoding utilities for converting addresses to coordinates
 */

interface GeocodeResult {
  latitude: number;
  longitude: number;
}

/**
 * Geocode an address to coordinates using Google Geocoding API
 * Falls back to a simple cache to avoid excessive API calls
 */
export async function geocodeAddress(address: string): Promise<GeocodeResult | null> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('Google Maps API key not found');
      return null;
    }

    // Add UMN context if not already in address
    const addressWithContext = address.toLowerCase().includes('minneapolis')
      ? address
      : `${address}, University of Minnesota, Minneapolis, MN`;

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addressWithContext)}&key=${apiKey}`
    );

    if (!response.ok) {
      console.error('Geocoding API request failed');
      return null;
    }

    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    }

    console.error('Geocoding failed:', data.status);
    return null;
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in miles
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 100) / 100; // Round to 2 decimal places
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Get user's current location using browser geolocation API
 */
export function getUserLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, // Cache position for 5 minutes
    });
  });
}

export interface WalkingDistanceResult {
  distance: number; // in miles
  duration: number; // in minutes
}

/**
 * Get walking distances and times from origin to multiple destinations
 * Uses our API route which calls Google Maps Distance Matrix API
 */
export async function getWalkingDistances(
  origin: { lat: number; lng: number },
  destinations: { lat: number; lng: number }[]
): Promise<(WalkingDistanceResult | null)[]> {
  try {
    const response = await fetch('/api/walking-distances', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ origin, destinations }),
    });

    if (!response.ok) {
      console.error('Walking distances API request failed');
      return destinations.map(() => null);
    }

    const data = await response.json();

    if (data.error) {
      console.error('Walking distances API error:', data.error);
      return destinations.map(() => null);
    }

    return data.results;
  } catch (error) {
    console.error('Error calling walking distances API:', error);
    return destinations.map(() => null);
  }
}
