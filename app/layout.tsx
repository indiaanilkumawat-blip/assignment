import type { Metadata } from 'next';
import './globals.css';
import { getSettings } from '@/lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  const base = s.seo.siteUrl || undefined;
  return {
    metadataBase: base ? new URL(base) : undefined,
    title: s.seo.metaTitle || s.siteName,
    description: s.seo.metaDescription,
    keywords: s.seo.keywords ? s.seo.keywords.split(',').map(k => k.trim()) : undefined,
    openGraph: {
      title: s.seo.metaTitle || s.siteName,
      description: s.seo.metaDescription,
      type: 'website',
      siteName: s.siteName,
      url: base,
      images: s.seo.ogImage ? [{ url: s.seo.ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: s.seo.metaTitle || s.siteName,
      description: s.seo.metaDescription,
      site: s.seo.twitterHandle || undefined,
      images: s.seo.ogImage ? [s.seo.ogImage] : undefined,
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
