import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";

/**
 * Helper for building Sanity image URLs
 * Used to optimize and transform images from Sanity
 */
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
