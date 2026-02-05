import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { origin, destinations } = await request.json();

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Google Maps API key not configured" },
        { status: 500 }
      );
    }

    // Format origin and destinations for the API
    const originStr = `${origin.lat},${origin.lng}`;
    const destinationsStr = destinations
      .map((d: { lat: number; lng: number }) => `${d.lat},${d.lng}`)
      .join("|");

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originStr}&destinations=${destinationsStr}&mode=walking&units=imperial&key=${apiKey}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Distance Matrix API request failed" },
        { status: 500 }
      );
    }

    const data = await response.json();

    if (data.status !== "OK") {
      return NextResponse.json(
        { error: `Distance Matrix API error: ${data.status}` },
        { status: 500 }
      );
    }

    // Parse results
    const elements = data.rows[0]?.elements || [];
    const results = elements.map((element: any) => {
      if (element.status !== "OK") {
        return null;
      }

      return {
        distance: Math.round((element.distance.value / 1609.34) * 100) / 100, // meters to miles
        duration: Math.round(element.duration.value / 60), // seconds to minutes
      };
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Error in walking-distances API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
