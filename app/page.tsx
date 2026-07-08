import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  getSettings, getContent, getPublishedPages, getSections,
  SettingsData, SectionData,
} from '@/lib/content';
import { serviceHref } from '@/lib/defaults';
import { IconArrowRight, IconWhatsApp } from '@/components/Icons';

// ISR: serve cached HTML from the CDN, re-render in the background at most
// every 5 minutes. Admin saves also trigger instant revalidation (lib/revalidate.ts).
export const revalidate = 300;

const stepPalette = [
  { accent: '#dbeafe', text: '#1e40af' },
  { accent: '#dcfce7', text: '#15803d' },
  { accent: '#fef3c7', text: '#92400e' },
  { accent: '#f3e8ff', text: '#7e22ce' },
];

/* Replace {siteName}, {assignments}, … tokens with live settings values. */
function fill(text: string, s: SettingsData): string {
  return (text || '')
    .replace(/\{siteName\}/g, s.siteName)
    .replace(/\{assignments\}/g, s.stats.assignments)
    .replace(/\{writers\}/g, s.stats.writers)
    .replace(/\{rating\}/g, s.stats.rating)
    .replace(/\{years\}/g, s.stats.years)
    .replace(/\{phone\}/g, s.phone)
    .replace(/\{email\}/g, s.email);
}

/* Centered content box honoring the per-section left/right px margins. */
function box(sec: SectionData): React.CSSProperties {
  return {
    maxWidth: sec.maxWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: sec.marginLeft,
    paddingRight: sec.marginRight,
  };
}

/* Standard centered heading block (tag + H2 + subheading) used by most sections. */
function SectionHeading({ sec, settings }: { sec: SectionData; settings: SettingsData }) {
  const heading = fill(sec.heading, settings);
  const subheading = fill(sec.subheading, settings);
  if (!sec.tag && !heading && !subheading) return null;
  return (
    <div style={{ textAlign: 'center', marginBottom: 56 }}>
      {sec.tag && <div className="section-tag mx-auto mb-5">{sec.tag}</div>}
      {heading && (
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: 'var(--primary)', marginBottom: 14, letterSpacing: '-0.01em' }}>
          {heading}
        </h2>
      )}
      {subheading && (
        <p style={{ color: 'var(--text-muted)', maxWidth: 540, margin: '0 auto', fontSize: 16, lineHeight: 1.7 }}>
          {subheading}
        </p>
      )}
    </div>
  );
}

export default async function HomePage() {
  const [settings, sections, services, reasons, steps, testimonials, faqs, domains, pages] = await Promise.all([
    getSettings(),
    getSections(),
    getContent('service'),
    getContent('reason'),
    getContent('step'),
    getContent('testimonial'),
    getContent('faq'),
    getContent('domain'),
    getPublishedPages(),
  ]);

  const waLink = `https://api.whatsapp.com/send/?phone=${settings.whatsapp}`;
  const stats = (settings.heroStats || [])
    .filter((s) => s.number && String(s.number).trim())
    .map((s) => ({ number: s.number, label: s.label, icon: s.icon }));
  const a = settings.address;
  const addressLine = [a.line1, a.line2, a.city, a.state, a.pincode, a.country].filter(Boolean).join(', ');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: settings.siteName,
    description: settings.seo.metaDescription,
    telephone: settings.phone,
    email: settings.email,
    url: settings.seo.siteUrl || undefined,
    address: addressLine
      ? { '@type': 'PostalAddress', streetAddress: [a.line1, a.line2].filter(Boolean).join(', '), addressLocality: a.city, addressRegion: a.state, postalCode: a.pincode, addressCountry: a.country }
      : undefined,
  };

  const visible = sections.filter((s) => s.enabled).sort((x, y) => x.order - y.order);

  /* Render a single section by key. Content-driven sections with no items
     return null so the live page never shows an empty heading. */
  const render = (sec: SectionData) => {
    switch (sec.key) {

      /* ── HERO ── */
      case 'hero': {
        const heading = fill(sec.heading, settings);
        const [headMain, headAccent] = heading.split('|').map((t) => t.trim());
        // Hero background GIF is stored on the 'gif' section (Admin → GIF tab).
        const gifSec = sections.find((s) => s.key === 'gif');
        const heroGif = gifSec && gifSec.enabled ? (gifSec.mediaUrl || '') : '';
        const overlay = gifSec && typeof gifSec.mediaOverlay === 'number' ? gifSec.mediaOverlay : 55;
        const ov = Math.max(0, Math.min(90, overlay)) / 100;
        return (
          <section key={sec.key} id="hero" style={{
            minHeight: '100vh',
            background: 'linear-gradient(150deg, #0f2137 0%, #1a3a5c 55%, #1e4a7a 100%)',
            paddingTop: 140, paddingBottom: 90, position: 'relative', overflow: 'hidden',
          }}>
            {/* Animated GIF background (admin-uploaded). Sits behind everything;
                a dark overlay on top keeps the hero text readable. */}
            {heroGif && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={heroGif} alt="" aria-hidden="true"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
                  background: `linear-gradient(150deg, rgba(15,33,55,${ov + 0.15}) 0%, rgba(26,58,92,${ov}) 55%, rgba(30,74,122,${ov}) 100%)` }} />
              </>
            )}
            <div style={{ position: 'absolute', top: -200, right: -200, width: 700, height: 700, borderRadius: '50%', background: 'rgba(37,99,168,0.15)', pointerEvents: 'none', filter: 'blur(60px)', zIndex: 1 }} />
            <div style={{ position: 'absolute', bottom: -100, left: -150, width: 500, height: 500, borderRadius: '50%', background: 'rgba(232,160,32,0.08)', pointerEvents: 'none', filter: 'blur(60px)', zIndex: 1 }} />
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', zIndex: 1 }} />
            <div style={{ ...box(sec), position: 'relative', zIndex: 2 }}>
              <div className={`grid grid-cols-1 gap-12 lg:gap-16 items-center${stats.length ? ' lg:grid-cols-2' : ''}`}>
                <div className="animate-fadeUp">
                  {sec.tag && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 26, padding: '7px 18px', borderRadius: 100, background: 'rgba(232,160,32,0.15)', border: '1px solid rgba(232,160,32,0.35)', color: 'var(--accent)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      🏆 {sec.tag}
                    </div>
                  )}
                  <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5.5vw, 66px)', fontWeight: 700, lineHeight: 1.12, color: 'white', marginBottom: 22, letterSpacing: '-0.01em' }}>
                    {headMain}{headAccent ? ' ' : ''}
                    {headAccent && <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{headAccent}</span>}
                  </h1>
                  {fill(sec.subheading, settings) && (
                    <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.85, marginBottom: 32, maxWidth: 500 }}>
                      {fill(sec.subheading, settings)}
                    </p>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                    <Link href="/contact" className="btn btn-accent">
                      Get Help Now <IconArrowRight size={18} />
                    </Link>
                    <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                      <IconWhatsApp size={18} /> WhatsApp Us
                    </a>
                  </div>
                </div>
                {stats.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:gap-5 animate-fadeUp-1">
                  {stats.map((stat, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', borderRadius: 20, padding: '26px 20px', border: '1px solid rgba(255,255,255,0.12)', textAlign: 'center' }}>
                      {stat.icon && <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>}
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>{stat.number}</div>
                      {stat.label && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 6, fontWeight: 500 }}>{stat.label}</div>}
                    </div>
                  ))}
                </div>
                )}
              </div>
            </div>
          </section>
        );
      }

      /* ── DOMAINS STRIP ── */
      case 'domains': {
        if (domains.length === 0) return null;
        return (
          <section key={sec.key} id="domains" style={{ background: 'var(--accent)', padding: '22px 0', overflow: 'hidden' }}>
            <div style={box(sec)}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                {sec.tag && <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: 8 }}>{sec.tag}</span>}
                {domains.map((d) => (
                  <Link key={d._id || d.title} href="/contact" style={{ padding: '6px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600, background: 'rgba(255,255,255,0.2)', color: 'white', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }} className="hover:bg-white/30">{d.title}</Link>
                ))}
              </div>
            </div>
          </section>
        );
      }

      /* ── SERVICES ── */
      case 'services': {
        if (services.length === 0) return null;
        return (
          <section key={sec.key} id="services" style={{ padding: '88px 0', background: 'var(--bg-warm)' }}>
            <div style={box(sec)}>
              <SectionHeading sec={sec} settings={settings} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 card-grid items-stretch">
                {services.map((s) => (
                  <Link key={s._id || s.title} href={serviceHref(s)} className="card-hover card-col" style={{ background: 'white', borderRadius: 20, padding: '28px 24px', border: '1.5px solid var(--border)', boxShadow: '0 2px 12px rgba(15,33,55,0.04)', textDecoration: 'none' }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, marginBottom: 18, background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, border: '1.5px solid var(--border)' }}>{s.icon}</div>
                    <h3 style={{ fontWeight: 700, fontSize: 15, color: 'var(--primary)', marginBottom: 10 }}>{s.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>{s.body}</p>
                    <span className="card-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, paddingTop: 16, fontSize: 12, fontWeight: 700, color: 'var(--primary-light)' }}>
                      Learn More <IconArrowRight size={14} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      }

      /* ── HOW IT WORKS ── */
      case 'how-it-works': {
        if (steps.length === 0) return null;
        return (
          <section key={sec.key} id="how-it-works" style={{ padding: '88px 0', background: 'white' }}>
            <div style={box(sec)}>
              <SectionHeading sec={sec} settings={settings} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                {steps.map((step, i) => {
                  const pal = stepPalette[i % stepPalette.length];
                  return (
                    <div key={step._id || step.title} style={{ position: 'relative' }}>
                      <div className="card-hover" style={{ background: 'var(--bg)', borderRadius: 20, padding: '28px 24px', border: '1.5px solid var(--border)', height: '100%' }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: pal.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: pal.text }}>{step.icon || String(i + 1).padStart(2, '0')}</div>
                        <h3 style={{ fontWeight: 700, fontSize: 15, color: 'var(--primary)', marginBottom: 10 }}>{step.title}</h3>
                        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>{step.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      }

      /* ── WHY CHOOSE US / ABOUT ── */
      case 'about': {
        if (reasons.length === 0 && !settings.business.about && !fill(sec.subheading, settings)) return null;
        const aboutText = fill(sec.subheading, settings) || settings.business.about;
        return (
          <section key={sec.key} id="about" style={{ padding: '88px 0', background: 'var(--bg)' }}>
            <div style={box(sec)}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                <div className="lg:sticky" style={{ top: 110 }}>
                  {sec.tag && <div className="section-tag mb-6">{sec.tag}</div>}
                  {fill(sec.heading, settings) && (
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: 'var(--primary)', marginBottom: 18, letterSpacing: '-0.01em' }}>
                      {fill(sec.heading, settings)}
                    </h2>
                  )}
                  {aboutText && (
                    <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.85, marginBottom: 28 }}>{aboutText}</p>
                  )}
                  <Link href="/contact" className="btn btn-primary btn-sm">
                    Submit an Inquiry <IconArrowRight size={16} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch">
                  {reasons.map((r) => (
                    <div key={r._id || r.title} className="card-hover" style={{ background: 'white', borderRadius: 18, padding: '22px 20px', border: '1.5px solid var(--border)', boxShadow: '0 2px 12px rgba(15,33,55,0.04)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ fontSize: 26, marginBottom: 12 }}>{r.icon}</div>
                      <h3 style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary)', marginBottom: 8 }}>{r.title}</h3>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65 }}>{r.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      }

      /* ── BUSINESS INFO / ADDRESS ── */
      case 'business-info': {
        const heading = fill(sec.heading, settings);
        return (
          <section key={sec.key} id="business-info" style={{ padding: '72px 0', background: 'white' }}>
            <div style={box(sec)}>
              {(sec.tag || heading) && <SectionHeading sec={sec} settings={settings} />}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div style={{ background: 'var(--bg)', borderRadius: 18, padding: '28px 26px', border: '1.5px solid var(--border)' }}>
                  <div style={{ fontSize: 26, marginBottom: 14 }}>🏢</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Business</div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--primary)', marginBottom: 6 }}>{settings.business.legalName || settings.siteName}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                    Managed by {settings.managerName}{settings.business.foundedYear ? ` · Since ${settings.business.foundedYear}` : ''}.
                    {settings.business.gstin ? ` GSTIN: ${settings.business.gstin}.` : ''}
                  </div>
                </div>
                <div style={{ background: 'var(--bg)', borderRadius: 18, padding: '28px 26px', border: '1.5px solid var(--border)' }}>
                  <div style={{ fontSize: 26, marginBottom: 14 }}>📍</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Address</div>
                  <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8 }}>
                    {addressLine || 'Address coming soon — update it from the admin panel.'}
                  </div>
                  {a.mapUrl && (
                    <a href={a.mapUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 12, fontSize: 12, fontWeight: 700, color: 'var(--primary-light)', textDecoration: 'none' }}>View on Map →</a>
                  )}
                </div>
                <div style={{ background: 'var(--bg)', borderRadius: 18, padding: '28px 26px', border: '1.5px solid var(--border)' }}>
                  <div style={{ fontSize: 26, marginBottom: 14 }}>📞</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Reach Us</div>
                  <a href={`tel:${settings.phone.replace(/\s/g, '')}`} style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--primary)', textDecoration: 'none', marginBottom: 6 }}>{settings.phone}</a>
                  <a href={`mailto:${settings.email}`} style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', wordBreak: 'break-word', marginBottom: 6 }}>{settings.email}</a>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>🕐 {settings.supportHours}</div>
                </div>
              </div>
            </div>
          </section>
        );
      }

      /* ── CTA BANNER ── */
      case 'cta': {
        const heading = fill(sec.heading, settings);
        const subheading = fill(sec.subheading, settings);
        if (!heading && !subheading) return null;
        return (
          <section key={sec.key} id="cta" style={{ background: 'linear-gradient(135deg, #0f2137 0%, #1a3a5c 60%, #1e4a7a 100%)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(232,160,32,0.07)', filter: 'blur(40px)', pointerEvents: 'none' }} />
            <div style={{ ...box(sec), textAlign: 'center' }}>
              {heading && (
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 46px)', fontWeight: 700, color: 'white', marginBottom: 16, letterSpacing: '-0.01em' }}>
                  {heading}
                </h2>
              )}
              {subheading && (
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, marginBottom: 36, lineHeight: 1.7 }}>{subheading}</p>
              )}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn btn-accent">
                  Get Help Now <IconArrowRight size={18} />
                </Link>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                  <IconWhatsApp size={18} /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </section>
        );
      }

      /* ── TESTIMONIALS / REVIEWS ── */
      case 'reviews': {
        if (testimonials.length === 0) return null;
        return (
          <section key={sec.key} id="reviews" style={{ padding: '88px 0', background: 'var(--bg-warm)' }}>
            <div style={box(sec)}>
              <SectionHeading sec={sec} settings={settings} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((t) => (
                  <div key={t._id || t.title} className="card-hover" style={{ background: 'white', borderRadius: 22, padding: '28px 26px', border: '1.5px solid var(--border)', boxShadow: '0 4px 20px rgba(15,33,55,0.05)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                      {Array(Math.max(0, Math.min(5, t.rating))).fill(0).map((_, j) => (
                        <span key={j} style={{ color: 'var(--accent)', fontSize: 15 }}>★</span>
                      ))}
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, lineHeight: 0.8, color: 'var(--accent)', opacity: 0.3, marginBottom: 8 }}>&ldquo;</div>
                    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.75, flex: 1, marginBottom: 20 }}>{t.body}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                      <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 17, flexShrink: 0 }}>
                        {t.title ? t.title[0] : '★'}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{t.title}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>{t.subtitle}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }

      /* ── FAQ ── */
      case 'faq': {
        if (faqs.length === 0) return null;
        return (
          <section key={sec.key} id="faq" style={{ padding: '88px 0', background: 'white' }}>
            <div style={box(sec)}>
              <SectionHeading sec={sec} settings={settings} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {faqs.map((faq) => (
                  <details key={faq._id || faq.title} style={{ background: 'var(--bg)', borderRadius: 16, border: '1.5px solid var(--border)', overflow: 'hidden' }}>
                    <summary style={{ padding: '20px 24px', fontWeight: 600, fontSize: 14, cursor: 'pointer', color: 'var(--text)', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                      {faq.title}
                      <span style={{ color: 'var(--accent)', fontSize: 22, flexShrink: 0, fontWeight: 300, lineHeight: 1 }}>+</span>
                    </summary>
                    <div style={{ padding: '0 24px 20px', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8 }}>{faq.body}</div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        );
      }

      /* ── GIF ── Not rendered as its own section. The uploaded GIF is used as
         the HERO background (see the 'hero' case above). This section row only
         stores the media config, managed from Admin → GIF. */
      case 'gif':
        return null;

      default:
        return null;
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar settings={settings} sections={visible} services={services} domains={domains} />
      <main>
        {visible.map((sec) => render(sec))}
      </main>
      <Footer settings={settings} pages={pages} services={services.map((s) => ({ title: s.title, slug: s.slug }))} domainTitles={domains.map((d) => d.title)} />

      <a href={waLink} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" style={{ position: 'fixed', bottom: 24, right: 20, zIndex: 100, width: 56, height: 56, borderRadius: '50%', background: '#25d366', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 28px rgba(37,211,102,0.45)', textDecoration: 'none' }} className="hover:scale-110">
        <IconWhatsApp size={28} />
      </a>
    </>
  );
}
