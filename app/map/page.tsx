import Script from "next/script";
import { getAllPrayerSpaces } from "@/lib/queries";
import MapPageClient from "@/components/MapPageClient";

/**
 * Map Page - Shows all prayer spaces on an interactive map
 */
export default async function MapPage() {
  const spaces = await getAllPrayerSpaces();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
        strategy="beforeInteractive"
      />
      <MapPageClient spaces={spaces} />
    </>
  );
}
