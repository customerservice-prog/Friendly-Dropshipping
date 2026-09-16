import type { MetadataRoute } from 'next';
import { categories, products } from '@/lib/catalog';

const base = 'https://eventequipmentdirect.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: 'about', priority: 0.55 },
    { path: 'buying-guides', priority: 0.8 },
    { path: 'quote', priority: 0.75 },
    { path: 'starter-packages', priority: 0.8 },
    { path: 'shipping', priority: 0.55 },
    { path: 'returns', priority: 0.55 },
    { path: 'privacy', priority: 0.35 },
    { path: 'terms', priority: 0.35 },
  ];

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...pages.map(({ path, priority }) => ({
      url: `${base}/${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority,
    })),
    ...categories.map((category) => ({
      url: `${base}/category/${category.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    ...products.map((product) => ({
      url: `${base}/product/${product.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
