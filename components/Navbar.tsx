'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const services = [
  'Essay Writing', 'Dissertation/Thesis', 'Report Writing', 'Case Study',
  'CV Writing', 'SOP Writing', 'Research Paper', 'Blog/Article Writing',
];
const domains = [
  'Law', 'Engineering', 'Nursing', 'Finance & Statistics',
  'Management & HR', 'Science', 'Psychology', 'Calculus',
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      boxShadow: scrolled ? '0 1px 0 rgba(15,33,55,0.08), 0 4px 24px rgba(15,33,55,0.06)' : 'none',
    }}>
      {/* Top strip */}
      <div style={{
        background: 'var(--primary)',
        color: 'white',
        fontSize: 12,
        padding: '7px 0',
        letterSpacing: '0.02em',
      }}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <a href="tel:+917357274693" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>📞</span> +91-7357274693
            </a>
            <a href="mailto:contact.assignmenthub1@gmail.com" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>✉️</span> contact.assignmenthub1@gmail.com
            </a>
          </div>
          <div style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 6 }} className="hidden md:flex">
            ★★★★★ &nbsp;4.8 RATED · 3.5M+ ASSIGNMENTS DELIVERED
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav style={{ padding: '0 0' }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: 68 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 11,
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: 20, fontWeight: 800,
              boxShadow: '0 4px 12px rgba(15,33,55,0.2)',
            }}>A</div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--primary)', lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                Assignment Hub
              </div>
              <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
                Expert Academic Writing
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {/* Services dropdown */}
            <div className="relative group" style={{ paddingTop: 8, paddingBottom: 8 }}>
              <button className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 14 }}>
                Services
                <span style={{ fontSize: 10, opacity: 0.5 }}>▾</span>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                style={{ transition: 'opacity 0.2s, transform 0.2s', transform: 'translateY(4px)' }}>
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

            <Link href="/#about" className="nav-link">About</Link>
            <Link href="/#how-it-works" className="nav-link">How It Works</Link>
            <Link href="/#testimonials" className="nav-link">Reviews</Link>
            <Link href="/#faq" className="nav-link">FAQ</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="https://api.whatsapp.com/send/?phone=917357274693" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 10, fontSize: 13, fontWeight: 600, color: '#1a7a42', background: 'rgba(37,211,102,0.1)', textDecoration: 'none', border: '1px solid rgba(37,211,102,0.25)' }}>
              💬 WhatsApp
            </a>
            <Link href="/contact"
              style={{ padding: '10px 22px', borderRadius: 10, fontSize: 13, fontWeight: 700, background: 'var(--primary)', color: 'white', textDecoration: 'none', boxShadow: '0 4px 14px rgba(15,33,55,0.2)', letterSpacing: '0.01em' }}>
              Get Help Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div style={{ width: 22, height: 2, background: 'var(--primary)', borderRadius: 2, transition: 'transform 0.2s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <div style={{ width: 22, height: 2, background: 'var(--primary)', borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
            <div style={{ width: 22, height: 2, background: 'var(--primary)', borderRadius: 2, transition: 'transform 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: 'white', borderTop: '1px solid var(--border)', padding: '16px 24px 24px' }} className="md:hidden">
            {[['/#how-it-works', 'How It Works'], ['/#testimonials', 'Reviews'], ['/#faq', 'FAQ'], ['/#about', 'About']].map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                style={{ display: 'block', padding: '12px 0', color: 'var(--text)', textDecoration: 'none', fontWeight: 500, fontSize: 15, borderBottom: '1px solid var(--border)' }}>
                {label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setMenuOpen(false)}
              style={{ display: 'block', marginTop: 16, padding: '13px 20px', background: 'var(--primary)', color: 'white', textDecoration: 'none', borderRadius: 12, textAlign: 'center', fontWeight: 700, fontSize: 15 }}>
              Get Help Now →
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
