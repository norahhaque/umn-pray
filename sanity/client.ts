import { createClient } from "next-sanity";

// Read-only client for fetching data
// These values come from .env.local
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01", // Use current date in YYYY-MM-DD format
  useCdn: true, // Set to false if you want fresh data on every request
});
