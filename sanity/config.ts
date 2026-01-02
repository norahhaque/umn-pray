import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

// These values should be set in .env.local
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "UMN Pray",
  projectId,
  dataset,
  basePath: "/studio", // Studio will be available at /studio route
  plugins: [
    structureTool(),
    visionTool(), // Helpful for testing GROQ queries
  ],
  schema: {
    types: schemaTypes,
  },
});
