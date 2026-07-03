import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { getSettings } from '@/lib/content';

const GTM_ID = 'GTM-KBS32BXG';

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const s = await getSettings(); // deduped by React cache() — same query as generateMetadata
  const base = (s.seo.siteUrl || '').replace(/\/$/, '');

  /* Organization schema — tells Google which logo to show in search results. */
  const orgJsonLd = base
    ? {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: s.siteName,
        url: base,
        logo: `${base}/logo-mark.png`,
      }
    : null;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* display=swap → text renders immediately in the system fallback font. */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        {orgJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
          />
        )}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        {/* Google Tag Manager — loaded after hydration so it never blocks first paint */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* End Google Tag Manager */}
      </body>
    </html>
  );
}
