import type { MetadataRoute } from 'next';
import { getSettings } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSettings();
  const base = settings.seo.siteUrl?.replace(/\/$/, '') || '';

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api'] },
    ],
    ...(base ? { sitemap: `${base}/sitemap.xml`, host: base } : {}),
  };
}
