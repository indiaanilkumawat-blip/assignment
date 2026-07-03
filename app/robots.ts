import type { MetadataRoute } from 'next';
import { getSettings } from '@/lib/content';

// ISR: serve cached HTML from the CDN, re-render in the background at most
// every 5 minutes. Admin saves also trigger instant revalidation (lib/revalidate.ts).
export const revalidate = 300;

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
