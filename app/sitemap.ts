import { MetadataRoute } from 'next';
import { getAllPrayerSpaces } from '@/lib/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://umnpray.org';

  // Get all prayer spaces for dynamic routes
  const spaces = await getAllPrayerSpaces();

  const spaceUrls = spaces.map((space) => ({
    url: `${baseUrl}/space/${space.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...spaceUrls,
  ];
}
