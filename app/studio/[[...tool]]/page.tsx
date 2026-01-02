"use client";

/**
 * Sanity Studio Route
 * This route mounts the Sanity Studio at /studio
 * Editors can access it to manage prayer space content
 */

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
