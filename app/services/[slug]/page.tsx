import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  getServiceBySlug, getSettings, getPublishedPages, getContent,
} from '@/lib/content';
import { serviceHref } from '@/lib/defaults';
import { IconArrowRight, IconSend, IconWhatsApp, IconPhone, IconDoc, IconCheck } from '@/components/Icons';

// ISR: serve cached HTML from the CDN, re-render in the background at most
// every 5 minutes. Admin saves also trigger instant revalidation (lib/revalidate.ts).
export const revalidate = 300;

/* Pre-render known service slugs at build; unknown slugs render on first
   request and are then cached (ISR). */
export async function generateStaticParams() {
  const { getServiceSlugs } = await import('@/lib/content');
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [service, settings] = await Promise.all([getServiceBySlug(slug), getSettings()]);
  if (!service) return { title: 'Service Not Found' };

  // Prefer the short teaser as the meta description; fall back to a generated one.
  const description =
    service.body ||
    `Get expert ${service.title.toLowerCase()} help from ${settings.siteName}. 100% original, on-time delivery by qualified writers.`;
  const title = `${service.title} — ${settings.siteName}`;
  const ogImage = settings.seo.ogImage;
  const canonical = settings.seo.siteUrl
    ? `${settings.seo.siteUrl.replace(/\/$/, '')}/services/${service.slug}`
    : undefined;

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonical,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const [service, settings, pages, services, domains] = await Promise.all([
    getServiceBySlug(slug),
    getSettings(),
    getPublishedPages(),
    getContent('service'),
    getContent('domain'),
  ]);

  if (!service) notFound();

  const waNumber = settings.whatsapp || settings.phone.replace(/[^\d]/g, '');
  const waText = encodeURIComponent(`Hi ${settings.siteName}, I'd like help with: ${service.title}.`);
  const waLink = `https://api.whatsapp.com/send/?phone=${waNumber}${waText ? `&text=${waText}` : ''}`;
  // Deep-link to the inquiry form with the service pre-selected.
  const inquiryLink = `/contact?service=${encodeURIComponent(service.title)}`;

  // JSON-LD so search engines understand each service page.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.body || undefined,
    provider: { '@type': 'Organization', name: settings.siteName },
    areaServed: settings.address?.country || 'IN',
    url: settings.seo.siteUrl ? `${settings.seo.siteUrl.replace(/\/$/, '')}/services/${service.slug}` : undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar settings={settings} services={services} domains={domains} />

      <main style={{ paddingTop: 110, minHeight: '100vh', background: 'var(--bg)' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0f2137 0%, #1a3a5c 100%)',
          padding: '44px 0 64px', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(232,160,32,0.08)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div className="svc-shell">
            <nav style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 18 }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Home</Link>
              <span style={{ margin: '0 8px' }}>/</span>
              <Link href="/#services" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Services</Link>
              <span style={{ margin: '0 8px' }}>/</span>
              <span style={{ color: 'var(--accent)' }}>{service.title}</span>
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              {service.icon && (
                <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
                  {service.icon}
                </div>
              )}
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 700, color: 'white', letterSpacing: '-0.01em' }}>
                {service.title}
              </h1>
            </div>
            {service.body && (
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, marginTop: 16, maxWidth: 640, lineHeight: 1.7 }}>
                {service.body}
              </p>
            )}
          </div>
        </div>

        {/* Body — centered content (≤780px) + far-right sticky inquiry rail (320px) */}
        <div className="svc-shell" style={{ marginTop: -32, paddingBottom: 96 }}>
          <div className="svc-layout">

            {/* Main content — centered in its column, generous reading width */}
            <div className="svc-main">
              <div className="svc-main-inner" style={{
                background: 'white', borderRadius: 20, padding: 'clamp(26px, 4vw, 48px)',
                boxShadow: '0 8px 48px rgba(15,33,55,0.08)', border: '1px solid var(--border)',
              }}>
                {service.bodyHtml ? (
                  <article
                    className="cms-content"
                    style={{ color: 'var(--text)', fontSize: 15.5, lineHeight: 1.85 }}
                    dangerouslySetInnerHTML={{ __html: service.bodyHtml }}
                  />
                ) : (
                  <p style={{ color: 'var(--text-muted)', fontSize: 15.5, lineHeight: 1.85 }}>
                    {service.body || `Get expert help with ${service.title.toLowerCase()} from our qualified academic writers. Reach out and we'll get back to you within minutes.`}
                  </p>
                )}

                {/* Benefits / features */}
                {service.benefits && service.benefits.length > 0 && (
                  <div style={{ marginTop: 40 }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--primary)', marginBottom: 20 }}>
                      Benefits &amp; Features
                    </h2>
                    <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 14 }}>
                      {service.benefits.map((b, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, fontSize: 14, color: 'var(--text)', lineHeight: 1.6 }}>
                          <span style={{ color: '#15803d', flexShrink: 0, marginTop: 1, display: 'inline-flex' }}>
                            <IconCheck size={20} />
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Far-right inquiry rail — sticky on desktop, static on mobile */}
            <aside className="svc-rail">
              <div style={{
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-mid) 100%)',
                borderRadius: 20, padding: '26px 22px', color: 'white',
                boxShadow: '0 16px 40px rgba(15,33,55,0.18)',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>
                  Get Started
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 700, lineHeight: 1.25, marginBottom: 8 }}>
                  Need help with {service.title}?
                </div>
                <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 20 }}>
                  Send your requirements and our expert team responds within minutes.
                </p>
                <Link href={inquiryLink} className="btn btn-accent btn-sm btn-block" style={{ marginBottom: 12 }}>
                  <IconSend size={18} /> Send an Inquiry
                </Link>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-sm btn-block">
                  <IconWhatsApp size={18} /> Chat on WhatsApp
                </a>
                <a href={`tel:${settings.phone.replace(/\s/g, '')}`} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 16,
                  fontSize: 13, color: 'rgba(255,255,255,0.78)', textDecoration: 'none', fontWeight: 600,
                }}>
                  <IconPhone size={14} /> Or call {settings.phone}
                </a>
              </div>
            </aside>
          </div>

          {/* Other services — equal-height cards, consistent spacing */}
          {services.length > 1 && (
            <div className="svc-main-inner" style={{ marginTop: 72 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--primary)', marginBottom: 20, textAlign: 'center' }}>
                Other Services
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 card-grid items-stretch">
                {services
                  .filter((s) => (s.slug || '') !== service.slug && s.title !== service.title)
                  .slice(0, 6)
                  .map((s) => (
                    <Link key={s._id || s.title} href={serviceHref(s)} className="card-hover card-col" style={{
                      background: 'white', borderRadius: 16, padding: '18px 16px',
                      border: '1.5px solid var(--border)', textDecoration: 'none',
                    }}>
                      <div style={{ color: 'var(--primary-light)', marginBottom: 10, display: 'inline-flex' }}>
                        <IconDoc size={22} />
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--primary)', lineHeight: 1.4 }}>{s.title}</div>
                      <span className="card-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 12, fontSize: 12, fontWeight: 700, color: 'var(--primary-light)' }}>
                        View <IconArrowRight size={14} />
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer settings={settings} pages={pages} services={services.map((s) => ({ title: s.title, slug: s.slug }))} domainTitles={domains.map((d) => d.title)} />

      <a href={waLink} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" style={{ position: 'fixed', bottom: 24, right: 20, zIndex: 100, width: 56, height: 56, borderRadius: '50%', background: '#25d366', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 28px rgba(37,211,102,0.45)', textDecoration: 'none' }} className="hover:scale-110">
        <IconWhatsApp size={28} />
      </a>
    </>
  );
}
