import type { MetadataRoute } from 'next';
import { getSettings, getPublishedPages, getServiceSlugs } from '@/lib/content';

// ISR: serve cached HTML from the CDN, re-render in the background at most
// every 5 minutes. Admin saves also trigger instant revalidation (lib/revalidate.ts).
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, pages, serviceSlugs] = await Promise.all([
    getSettings(), getPublishedPages(), getServiceSlugs(),
  ]);
  const base = settings.seo.siteUrl?.replace(/\/$/, '') || '';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/contact`, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${base}/services/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const pageRoutes: MetadataRoute.Sitemap = pages.map((p) => ({
    url: `${base}/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : undefined,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...pageRoutes];
}
