import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://danixsoft-hooks-docs.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Adding a few specific hooks, but in a real scenario this could be dynamic
    {
      url: 'https://danixsoft-hooks-docs.vercel.app/use-local-storage',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  ];
}
