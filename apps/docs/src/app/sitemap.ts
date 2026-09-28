import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://react-hooks.danixsoft.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Adding a few specific hooks, but in a real scenario this could be dynamic
    {
      url: 'https://react-hooks.danixsoft.com/use-local-storage',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  ];
}
