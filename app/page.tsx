import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSettings, getContent, getPublishedPages } from '@/lib/content';

export const dynamic = 'force-dynamic';

const stepPalette = [
  { accent: '#dbeafe', text: '#1e40af' },
  { accent: '#dcfce7', text: '#15803d' },
  { accent: '#fef3c7', text: '#92400e' },
  { accent: '#f3e8ff', text: '#7e22ce' },
];

export default async function HomePage() {
  const [settings, services, reasons, steps, testimonials, faqs, domains, pages] = await Promise.all([
    getSettings(),
    getContent('service'),
    getContent('reason'),
    getContent('step'),
    getContent('testimonial'),
    getContent('faq'),
    getContent('domain'),
    getPublishedPages(),
  ]);

  const waLink = `https://api.whatsapp.com/send/?phone=${settings.whatsapp}`;
  const stats = [
    { number: settings.stats.assignments, label: 'Assignments Delivered', icon: '📚' },
    { number: settings.stats.writers, label: 'Expert Writers', icon: '👨‍🏫' },
    { number: settings.stats.rating, label: 'Average Rating', icon: '⭐' },
    { number: settings.stats.years, label: 'Years of Excellence', icon: '🏆' },
  ];
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
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '1200' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar settings={settings} />
      <main>

        {/* ── HERO ── */}
        <section style={{
          minHeight: '100vh',
          background: 'linear-gradient(150deg, #0f2137 0%, #1a3a5c 55%, #1e4a7a 100%)',
          paddingTop: 140, paddingBottom: 90, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -200, right: -200, width: 700, height: 700, borderRadius: '50%', background: 'rgba(37,99,168,0.15)', pointerEvents: 'none', filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', bottom: -100, left: -150, width: 500, height: 500, borderRadius: '50%', background: 'rgba(232,160,32,0.08)', pointerEvents: 'none', filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="animate-fadeUp">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 26, padding: '7px 18px', borderRadius: 100, background: 'rgba(232,160,32,0.15)', border: '1px solid rgba(232,160,32,0.35)', color: 'var(--accent)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  🏆 India&apos;s Most Trusted Academic Help
                </div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5.5vw, 66px)', fontWeight: 700, lineHeight: 1.12, color: 'white', marginBottom: 22, letterSpacing: '-0.01em' }}>
                  Expert Assignment Help —{' '}
                  <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>AI-Free &amp; Plagiarism-Free</span>
                </h1>
                <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.85, marginBottom: 32, maxWidth: 500 }}>
                  Get your assignments done by {settings.stats.writers} qualified academic experts. 100% original, on-time delivery, and grades you deserve — guaranteed.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 36 }}>
                  {['✅ AI-Free Content', '📋 Plagiarism Report', '⚡ 12-Hr Delivery', '🔒 100% Confidential'].map(b => (
                    <div key={b} style={{ padding: '8px 16px', borderRadius: 100, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>{b}</div>
                  ))}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                  <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 34px', borderRadius: 13, fontWeight: 700, fontSize: 15, background: 'var(--accent)', color: 'white', textDecoration: 'none', boxShadow: '0 8px 28px rgba(232,160,32,0.4)' }}>
                    Get Help Now →
                  </Link>
                  <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 34px', borderRadius: 13, fontWeight: 600, fontSize: 15, background: 'rgba(37,211,102,0.15)', color: '#4ade80', textDecoration: 'none', border: '1.5px solid rgba(37,211,102,0.3)' }}>
                    💬 WhatsApp Us
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-5 animate-fadeUp-1">
                {stats.map((stat, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', borderRadius: 20, padding: '26px 20px', border: '1px solid rgba(255,255,255,0.12)', textAlign: 'center' }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>{stat.number}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 6, fontWeight: 500 }}>{stat.label}</div>
                  </div>
                ))}
                <div style={{ gridColumn: '1 / -1', background: 'rgba(232,160,32,0.12)', border: '1px solid rgba(232,160,32,0.25)', borderRadius: 20, padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 5 }}>🌍 Serving students from</div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>India · UK · Canada · UAE · Ireland</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 26 }}>🎓</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>100+ subjects</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── DOMAINS STRIP ── */}
        <section style={{ background: 'var(--accent)', padding: '22px 0', overflow: 'hidden' }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: 8 }}>100+ Subjects:</span>
              {domains.map(d => (
                <Link key={d._id || d.title} href="/contact" style={{ padding: '6px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600, background: 'rgba(255,255,255,0.2)', color: 'white', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }} className="hover:bg-white/30">{d.title}</Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section style={{ padding: '88px 0', background: 'var(--bg-warm)' }} id="services">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="section-tag mx-auto mb-5">Our Services</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: 'var(--primary)', marginBottom: 14, letterSpacing: '-0.01em' }}>
                Complete Academic Writing Services
              </h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: 540, margin: '0 auto', fontSize: 16, lineHeight: 1.7 }}>
                From essays to dissertations — our expert team handles every type of academic assignment with precision.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {services.map((s) => (
                <div key={s._id || s.title} className="card-hover" style={{ background: 'white', borderRadius: 20, padding: '28px 24px', border: '1.5px solid var(--border)', boxShadow: '0 2px 12px rgba(15,33,55,0.04)' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, marginBottom: 18, background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, border: '1.5px solid var(--border)' }}>{s.icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: 15, color: 'var(--primary)', marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>{s.body}</p>
                  <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 16, fontSize: 12, fontWeight: 700, color: 'var(--primary-light)', textDecoration: 'none' }}>
                    Get Started →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{ padding: '88px 0', background: 'white' }} id="how-it-works">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="section-tag mx-auto mb-5">Process</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: 'var(--primary)', letterSpacing: '-0.01em' }}>
                How It Works in 4 Simple Steps
              </h2>
            </div>
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
            <div style={{ textAlign: 'center', marginTop: 44 }}>
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 38px', borderRadius: 13, fontWeight: 700, fontSize: 15, background: 'var(--primary)', color: 'white', textDecoration: 'none', boxShadow: '0 8px 28px rgba(15,33,55,0.2)' }}>
                Start Your Inquiry Now →
              </Link>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section style={{ padding: '88px 0', background: 'var(--bg)' }} id="about">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div className="section-tag mb-6">Why Choose Us</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: 'var(--primary)', marginBottom: 18, letterSpacing: '-0.01em' }}>
                  The {settings.siteName} Advantage
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.85, marginBottom: 28 }}>
                  {settings.business.about || `We don't just write assignments — we craft academic success stories. With over a decade of expertise, we've helped thousands of students across the globe achieve their academic goals.`}
                </p>
                <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
                  {[[settings.stats.assignments, 'Assignments'], [settings.stats.writers, 'Writers'], [settings.stats.rating, 'Rating']].map(([n, l]) => (
                    <div key={l} style={{ textAlign: 'center', padding: '14px 20px', background: 'white', borderRadius: 14, border: '1.5px solid var(--border)', minWidth: 90 }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--primary-light)' }}>{n}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</div>
                    </div>
                  ))}
                </div>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 30px', borderRadius: 12, fontWeight: 700, fontSize: 14, background: 'var(--primary)', color: 'white', textDecoration: 'none', boxShadow: '0 6px 20px rgba(15,33,55,0.18)' }}>
                  Submit an Inquiry →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {reasons.map((r) => (
                  <div key={r._id || r.title} className="card-hover" style={{ background: 'white', borderRadius: 18, padding: '22px 20px', border: '1.5px solid var(--border)', boxShadow: '0 2px 12px rgba(15,33,55,0.04)' }}>
                    <div style={{ fontSize: 26, marginBottom: 12 }}>{r.icon}</div>
                    <h3 style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary)', marginBottom: 8 }}>{r.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65 }}>{r.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── BUSINESS INFO / ADDRESS (#8, #9) ── */}
        <section style={{ padding: '72px 0', background: 'white' }} id="business-info">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
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

        {/* ── CTA BANNER ── */}
        <section style={{ background: 'linear-gradient(135deg, #0f2137 0%, #1a3a5c 60%, #1e4a7a 100%)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(232,160,32,0.07)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 46px)', fontWeight: 700, color: 'white', marginBottom: 16, letterSpacing: '-0.01em' }}>
              Ready to Get the Grade You Deserve?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, marginBottom: 36, lineHeight: 1.7 }}>
              Join {settings.stats.assignments} students who trust {settings.siteName} for their academic success.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/contact" style={{ display: 'inline-block', padding: '16px 40px', borderRadius: 13, fontWeight: 700, fontSize: 15, background: 'var(--accent)', color: 'white', textDecoration: 'none', boxShadow: '0 8px 28px rgba(232,160,32,0.35)' }}>
                📋 Get Help Now
              </Link>
              <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '16px 40px', borderRadius: 13, fontWeight: 600, fontSize: 15, background: 'rgba(255,255,255,0.1)', color: 'white', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.25)' }}>
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section style={{ padding: '88px 0', background: 'var(--bg-warm)' }} id="testimonials">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="section-tag mx-auto mb-5">Student Reviews</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: 'var(--primary)', marginBottom: 14, letterSpacing: '-0.01em' }}>
                What Our Students Say
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
                Rated 4.8/5 on SiteJabber and Trustpilot by thousands of verified students
              </p>
            </div>
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

        {/* ── FAQ ── */}
        <section style={{ padding: '88px 0', background: 'white' }} id="faq">
          <div className="max-w-3xl mx-auto px-5 sm:px-6">
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="section-tag mx-auto mb-5">FAQ</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: 'var(--primary)', letterSpacing: '-0.01em' }}>
                Frequently Asked Questions
              </h2>
            </div>
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

      </main>
      <Footer settings={settings} pages={pages} />

      <a href={waLink} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" style={{ position: 'fixed', bottom: 24, right: 20, zIndex: 100, width: 56, height: 56, borderRadius: '50%', background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 28px rgba(37,211,102,0.45)', fontSize: 28, textDecoration: 'none' }} className="hover:scale-110">
        💬
      </a>
    </>
  );
}
