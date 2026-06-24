'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SettingsData, DEFAULT_SETTINGS } from '@/lib/defaults';

const services = [
  'Essay Writing', 'Dissertation/Thesis', 'Report Writing', 'Case Study',
  'CV Writing', 'SOP Writing', 'Research Paper', 'Blog/Article Writing',
];
const domains = [
  'Law', 'Engineering', 'Nursing', 'Finance & Statistics',
  'Management & HR', 'Science', 'Psychology', 'Calculus',
];

export default function Navbar({ settings = DEFAULT_SETTINGS }: { settings?: SettingsData }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const waLink = `https://api.whatsapp.com/send/?phone=${settings.whatsapp}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(15,33,55,0.85)',
      backdropFilter: 'blur(12px)',
      boxShadow: scrolled ? '0 1px 0 rgba(15,33,55,0.08), 0 4px 24px rgba(15,33,55,0.06)' : 'none',
    }}>
      {/* Top strip */}
      <div style={{
        background: 'var(--primary)', color: 'white', fontSize: 12,
        padding: '7px 0', letterSpacing: '0.02em',
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center gap-3">
          <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap', minWidth: 0 }}>
            <a href={`tel:${settings.phone.replace(/\s/g, '')}`} style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
              <span>📞</span> {settings.phone}
            </a>
            <a href={`mailto:${settings.email}`} className="hidden sm:flex" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', alignItems: 'center', gap: 6, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <span>✉️</span> {settings.email}
            </a>
          </div>
          <div style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }} className="hidden md:flex">
            ★★★★★ &nbsp;{settings.topStripText}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between" style={{ height: 64 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }} aria-label={settings.siteName}>
            <div style={{
              width: 42, height: 42, borderRadius: 11, flexShrink: 0,
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: 20, fontWeight: 800,
              boxShadow: '0 4px 12px rgba(15,33,55,0.2)',
            }}>A</div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, color: scrolled ? 'var(--primary)' : 'white', lineHeight: 1.1, letterSpacing: '-0.01em', transition: 'color 0.3s' }}>
                {settings.siteName}
              </div>
              <div style={{ fontSize: 9, color: scrolled ? 'var(--text-muted)' : 'rgba(255,255,255,0.6)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, transition: 'color 0.3s' }}>
                {settings.tagline}
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8" style={{ color: scrolled ? 'var(--text)' : 'white' }}>
            <div className="relative group" style={{ paddingTop: 8, paddingBottom: 8 }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, fontWeight: 500, color: 'inherit' }}>
                Services <span style={{ fontSize: 10, opacity: 0.5 }}>▾</span>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                style={{ transition: 'opacity 0.2s' }}>
                <div style={{
                  background: 'white', borderRadius: 18, padding: 24, width: 440,
                  boxShadow: '0 24px 60px rgba(15,33,55,0.15)', border: '1px solid var(--border)',
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4,
                }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10, paddingLeft: 8 }}>Writing Services</div>
                    {services.map(s => (
                      <Link key={s} href="/contact" style={{ display: 'block', padding: '7px 10px', borderRadius: 8, fontSize: 13, color: 'var(--text)', textDecoration: 'none', fontWeight: 500 }}
                        className="hover:bg-blue-50 hover:text-blue-700">{s}</Link>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10, paddingLeft: 8 }}>Domains</div>
                    {domains.map(d => (
                      <Link key={d} href="/contact" style={{ display: 'block', padding: '7px 10px', borderRadius: 8, fontSize: 13, color: 'var(--text)', textDecoration: 'none', fontWeight: 500 }}
                        className="hover:bg-blue-50 hover:text-blue-700">{d}</Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link href="/#about" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 500, fontSize: 14 }}>About</Link>
            <Link href="/#how-it-works" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 500, fontSize: 14 }}>How It Works</Link>
            <Link href="/#testimonials" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 500, fontSize: 14 }}>Reviews</Link>
            <Link href="/#faq" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 500, fontSize: 14 }}>FAQ</Link>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 10, fontSize: 13, fontWeight: 600, color: scrolled ? '#1a7a42' : '#4ade80', background: 'rgba(37,211,102,0.12)', textDecoration: 'none', border: '1px solid rgba(37,211,102,0.25)' }}>
              💬 WhatsApp
            </a>
            <Link href="/contact"
              style={{ padding: '10px 22px', borderRadius: 10, fontSize: 13, fontWeight: 700, background: 'var(--accent)', color: 'white', textDecoration: 'none', boxShadow: '0 4px 14px rgba(232,160,32,0.3)' }}>
              Get Help Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div style={{ width: 24, height: 2, background: scrolled ? 'var(--primary)' : 'white', borderRadius: 2, transition: 'all 0.2s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <div style={{ width: 24, height: 2, background: scrolled ? 'var(--primary)' : 'white', borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
            <div style={{ width: 24, height: 2, background: scrolled ? 'var(--primary)' : 'white', borderRadius: 2, transition: 'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: 'white', borderTop: '1px solid var(--border)', padding: '12px 20px 24px', maxHeight: 'calc(100vh - 110px)', overflowY: 'auto' }} className="lg:hidden">
            {[['/contact', 'Services'], ['/#how-it-works', 'How It Works'], ['/#testimonials', 'Reviews'], ['/#faq', 'FAQ'], ['/#about', 'About']].map(([href, label]) => (
              <Link key={label} href={href} onClick={() => setMenuOpen(false)}
                style={{ display: 'block', padding: '13px 0', color: 'var(--text)', textDecoration: 'none', fontWeight: 600, fontSize: 15, borderBottom: '1px solid var(--border)' }}>
                {label}
              </Link>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <a href={waLink} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '13px', background: '#25d366', color: 'white', textDecoration: 'none', borderRadius: 12, fontWeight: 700, fontSize: 14 }}>
                💬 WhatsApp
              </a>
              <Link href="/contact" onClick={() => setMenuOpen(false)}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '13px', background: 'var(--accent)', color: 'white', textDecoration: 'none', borderRadius: 12, fontWeight: 700, fontSize: 14 }}>
                Get Help →
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
