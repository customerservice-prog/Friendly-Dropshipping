import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/', '/api/', '/cart', '/search'],
    },
    sitemap: 'https://eventequipmentdirect.com/sitemap.xml',
    host: 'eventequipmentdirect.com',
  };
}
