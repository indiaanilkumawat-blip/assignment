import Link from 'next/link';
import { SettingsData, PageData, DEFAULT_SETTINGS } from '@/lib/defaults';

const services = ['Essay Help', 'Dissertation Writing', 'Report Writing', 'CV Writing', 'SOP Writing', 'Case Study Help', 'Research Paper', 'Blog Writing'];
const domains = ['Law Assignment', 'Engineering', 'Nursing', 'Finance & Stats', 'Management & HR', 'Science', 'Psychology', 'Calculus'];

export default function Footer({
  settings = DEFAULT_SETTINGS,
  pages = [],
}: {
  settings?: SettingsData;
  pages?: PageData[];
}) {
  const waLink = `https://api.whatsapp.com/send/?phone=${settings.whatsapp}`;
  const a = settings.address;
  const addressLine = [a.line1, a.line2, a.city, a.state, a.pincode, a.country]
    .filter(Boolean).join(', ');

  const socials = [
    { href: settings.social.instagram, icon: '📸', label: 'Instagram' },
    { href: settings.social.facebook, icon: '📘', label: 'Facebook' },
    { href: settings.social.linkedin, icon: '💼', label: 'LinkedIn' },
    { href: waLink, icon: '💬', label: 'WhatsApp' },
  ].filter(s => s.href);

  const footerPages = pages.filter(p => p.showInFooter);

  return (
    <footer style={{ background: 'var(--primary)', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div style={{ height: 4, background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 50%, var(--accent) 100%)' }} />
      <div style={{ position: 'absolute', top: -120, right: -120, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand + business info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800 }}>A</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, lineHeight: 1.1 }}>{settings.siteName}</div>
                <div style={{ fontSize: 9, opacity: 0.5, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{settings.tagline}</div>
              </div>
            </div>
            <p style={{ opacity: 0.6, fontSize: 13, lineHeight: 1.9, marginBottom: 18 }}>
              {settings.business.about ||
                `India's most trusted academic writing service with ${settings.stats.writers} expert writers and ${settings.stats.assignments} assignments delivered.`}
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {socials.map(({ href, icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label} aria-label={label}
                  style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, textDecoration: 'none' }}
                  className="hover:bg-white/20">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 18 }}>Services</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {services.map(s => (
                <Link key={s} href="/contact" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 13, fontWeight: 500 }} className="hover:text-white">{s}</Link>
              ))}
            </div>
          </div>

          {/* Domains */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 18 }}>Domains</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {domains.map(d => (
                <Link key={d} href="/contact" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 13, fontWeight: 500 }} className="hover:text-white">{d}</Link>
              ))}
            </div>
          </div>

          {/* Contact + address */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 18 }}>Get In Touch</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 18 }}>
              <a href={`tel:${settings.phone.replace(/\s/g, '')}`} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
                <span style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>📞</span>
                {settings.phone}
              </a>
              <a href={`mailto:${settings.email}`} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 13, fontWeight: 500, wordBreak: 'break-word' }}>
                <span style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✉️</span>
                {settings.email}
              </a>
              {addressLine && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 500, lineHeight: 1.6 }}>
                  <span style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>📍</span>
                  <span>{addressLine}</span>
                </div>
              )}
            </div>
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 16px', background: '#25d366', borderRadius: 12, color: 'white', textDecoration: 'none', fontSize: 13, fontWeight: 700, boxShadow: '0 6px 20px rgba(37,211,102,0.25)' }}>
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: 44, paddingTop: 20, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ fontSize: 12, opacity: 0.45, fontWeight: 500 }}>
            © {new Date().getFullYear()} {settings.business.legalName || settings.siteName}. All rights reserved.
            {settings.business.gstin ? ` · GSTIN: ${settings.business.gstin}` : ''}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            {footerPages.map(p => (
              <Link key={p.slug} href={`/${p.slug}`} style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontWeight: 500 }} className="hover:text-white">{p.title}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
