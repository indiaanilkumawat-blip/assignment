'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SettingsData, SectionData, ContentItemData, DEFAULT_SETTINGS, serviceHref } from '@/lib/defaults';

/* Keys that appear as top-level nav links. */
const NAV_KEYS: Record<string, true> = {
  services: true, about: true, 'how-it-works': true, reviews: true, faq: true,
};

export default function Navbar({
  settings = DEFAULT_SETTINGS,
  sections = [],
  services = [],
  domains = [],
}: {
  settings?: SettingsData;
  sections?: SectionData[];
  services?: ContentItemData[];
  domains?: ContentItemData[];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === '/';
  const waLink = `https://api.whatsapp.com/send/?phone=${settings.whatsapp}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Section links derived from enabled sections; falls back to the standard set
  // on inner pages. "Home" is always first.
  const sectionLinks = (sections.length
    ? sections.filter((s) => NAV_KEYS[s.key])
    : [
        { key: 'services', label: 'Services' },
        { key: 'about', label: 'About' },
        { key: 'how-it-works', label: 'How It Works' },
        { key: 'reviews', label: 'Reviews' },
        { key: 'faq', label: 'FAQ' },
      ] as Pick<SectionData, 'key' | 'label'>[]
  ).map((s) => ({ href: `/#${s.key}`, label: s.label || s.key }));

  const navLinks = [{ href: '/', label: 'Home' }, ...sectionLinks];
  const hasDropdownData = services.length > 0 || domains.length > 0;
  // Glassy/transparent only while sitting over the dark hero on the homepage.
  // Everywhere else (scrolled, or any inner page) the bar is solid for contrast.
  const solid = scrolled || !onHome;

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        // Consistent navy bar at all times — only the depth changes on scroll.
        background: solid ? 'rgba(13, 28, 48, 0.94)' : 'rgba(15, 33, 55, 0.55)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: solid ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        boxShadow: solid ? '0 10px 30px rgba(8, 18, 32, 0.35)' : 'none',
        transition: 'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Top strip — responsive, never overlaps */}
      <div style={{ background: 'rgba(0,0,0,0.22)', color: 'white', fontSize: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4" style={{ height: 34 }}>
          <div className="flex items-center min-w-0" style={{ gap: 16 }}>
            <a
              href={`tel:${settings.phone.replace(/\s/g, '')}`}
              style={{ color: 'rgba(255,255,255,0.88)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              <span aria-hidden>📞</span> {settings.phone}
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="hidden sm:inline-flex"
              style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', alignItems: 'center', gap: 6, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              <span aria-hidden>✉️</span> <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{settings.email}</span>
            </a>
          </div>
          {settings.topStripText && (
            <div
              className="hidden md:flex"
              style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              <span aria-hidden style={{ letterSpacing: 0 }}>★★★★★</span> {settings.topStripText}
            </div>
          )}
        </div>
      </div>

      {/* Main nav */}
      <nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4" style={{ height: 68 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }} aria-label={settings.siteName}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              background: '#ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5,
              boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-mark.png" alt={settings.siteName} width={34} height={34} style={{ width: 34, height: 34, objectFit: 'contain', display: 'block' }} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'white', lineHeight: 1.1, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
                {settings.siteName}
              </div>
              {settings.tagline && (
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  {settings.tagline}
                </div>
              )}
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) =>
              l.href === '/#services' && hasDropdownData ? (
                <div key={l.href} className="relative group" style={{ paddingTop: 6, paddingBottom: 6 }}>
                  <Link href={l.href} className="nav-link-light" style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                    {l.label} <span style={{ fontSize: 10, opacity: 0.55 }}>&#9662;</span>
                  </Link>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible" style={{ transition: 'opacity 0.2s' }}>
                    <div style={{ background: 'white', borderRadius: 18, padding: 22, width: 440, boxShadow: '0 24px 60px rgba(15,33,55,0.22)', border: '1px solid var(--border)', display: 'grid', gridTemplateColumns: services.length && domains.length ? '1fr 1fr' : '1fr', gap: 4 }}>
                      {services.length > 0 && (
                        <div>
                          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10, paddingLeft: 8 }}>Services</div>
                          {services.map((s) => (
                            <Link key={s._id || s.title} href={serviceHref(s)} style={{ display: 'block', padding: '7px 10px', borderRadius: 8, fontSize: 13, color: 'var(--text)', textDecoration: 'none', fontWeight: 500 }} className="hover:bg-blue-50 hover:text-blue-700">{s.title}</Link>
                          ))}
                        </div>
                      )}
                      {domains.length > 0 && (
                        <div>
                          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10, paddingLeft: 8 }}>Subjects</div>
                          {domains.map((d) => (
                            <Link key={d._id || d.title} href="/contact" style={{ display: 'block', padding: '7px 10px', borderRadius: 8, fontSize: 13, color: 'var(--text)', textDecoration: 'none', fontWeight: 500 }} className="hover:bg-blue-50 hover:text-blue-700">{d.title}</Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`nav-link-light${l.href === '/' && onHome ? ' is-active' : ''}`}
                >
                  {l.label}
                </Link>
              )
            )}
          </div>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, color: '#4ade80', background: 'rgba(37,211,102,0.12)', textDecoration: 'none', border: '1px solid rgba(37,211,102,0.28)' }}>
              💬 WhatsApp
            </a>
            <Link href="/contact" style={{ padding: '10px 22px', borderRadius: 10, fontSize: 13, fontWeight: 700, background: 'var(--accent)', color: 'var(--accent-ink)', textDecoration: 'none', boxShadow: '0 6px 18px rgba(var(--accent-rgb),0.35)' }}>
              Get Help Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', flexDirection: 'column', gap: 5, flexShrink: 0 }}>
            <div style={{ width: 24, height: 2, background: 'white', borderRadius: 2, transition: 'all 0.2s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <div style={{ width: 24, height: 2, background: 'white', borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
            <div style={{ width: 24, height: 2, background: 'white', borderRadius: 2, transition: 'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: 'white', borderTop: '1px solid var(--border)', padding: '8px 20px 24px', maxHeight: 'calc(100vh - 110px)', overflowY: 'auto' }} className="lg:hidden">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                style={{ display: 'block', padding: '13px 0', color: 'var(--text)', textDecoration: 'none', fontWeight: 600, fontSize: 15, borderBottom: '1px solid var(--border)' }}>
                {l.label}
              </Link>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <a href={waLink} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '13px', background: '#25d366', color: 'white', textDecoration: 'none', borderRadius: 12, fontWeight: 700, fontSize: 14 }}>
                💬 WhatsApp
              </a>
              <Link href="/contact" onClick={() => setMenuOpen(false)}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '13px', background: 'var(--accent)', color: 'var(--accent-ink)', textDecoration: 'none', borderRadius: 12, fontWeight: 700, fontSize: 14 }}>
                Get Help &#8594;
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
