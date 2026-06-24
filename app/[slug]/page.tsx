import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getPageBySlug, getSettings, getPublishedPages } from '@/lib/content';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [page, settings] = await Promise.all([getPageBySlug(slug), getSettings()]);
  if (!page) return { title: 'Not Found' };

  const title = page.metaTitle || `${page.title} — ${settings.siteName}`;
  const description = page.metaDescription || settings.seo.metaDescription;
  const ogImage = page.ogImage || settings.seo.ogImage;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    alternates: settings.seo.siteUrl ? { canonical: `${settings.seo.siteUrl}/${slug}` } : undefined,
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const [page, settings, pages] = await Promise.all([
    getPageBySlug(slug),
    getSettings(),
    getPublishedPages(),
  ]);

  if (!page) notFound();

  return (
    <>
      <Navbar settings={settings} />
      <main style={{ paddingTop: 110, minHeight: '100vh', background: 'var(--bg)' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0f2137 0%, #1a3a5c 100%)',
          padding: '40px 0 64px', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(232,160,32,0.08)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div className="max-w-4xl mx-auto px-6">
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 700, color: 'white', letterSpacing: '-0.01em' }}>
              {page.title}
            </h1>
            {page.updatedAt && (
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 10 }}>
                Last updated: {new Date(page.updatedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="max-w-4xl mx-auto px-6" style={{ marginTop: -32, paddingBottom: 80 }}>
          <article
            className="cms-content"
            style={{
              background: 'white', borderRadius: 20, padding: 'clamp(24px, 5vw, 48px)',
              boxShadow: '0 8px 48px rgba(15,33,55,0.08)', border: '1px solid var(--border)',
              color: 'var(--text)', fontSize: 15.5, lineHeight: 1.8,
            }}
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </main>
      <Footer settings={settings} pages={pages} />
    </>
  );
}
