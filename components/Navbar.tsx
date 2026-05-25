'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const services = [
  'Essay Help', 'Dissertation/Thesis', 'Report Writing', 'Case Study',
  'CV Writing', 'SOP Writing', 'Research Paper', 'Blog Writing',
];

const domains = [
  'Law', 'Engineering', 'Nursing', 'Finance & Statistics',
  'Management & HR', 'Science', 'Psychology', 'Calculus',
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      {/* Top bar */}
      <div style={{ background: 'var(--primary)', color: 'white', fontSize: 13, padding: '6px 0' }}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span>📞 +91-9352555548</span>
          <span>✉️ contact@theassignmenthub.com</span>
          <span className="hidden md:block">🎓 3.5M+ Assignments Delivered | 4.8★ Rated</span>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: 18, fontWeight: 800,
          }}>A</div>
          <div>
            <div className="font-playfair font-bold" style={{ color: 'var(--primary)', fontSize: 18, lineHeight: 1 }}>
              Assignment Hub
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
              EXPERT ACADEMIC WRITING
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7">
          <div className="relative group">
            <button
              className="nav-link flex items-center gap-1"
              style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 15, padding: '4px 0' }}
            >
              Services ▾
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div style={{
                background: 'white', borderRadius: 16, boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                border: '1px solid var(--border)', padding: 24, width: 480, display: 'grid',
                gridTemplateColumns: '1fr 1fr', gap: 4,
              }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Writing Services</div>
                  {services.map(s => (
                    <Link key={s} href="/contact" style={{ display: 'block', padding: '6px 10px', borderRadius: 8, fontSize: 14, color: 'var(--text)', textDecoration: 'none', transition: 'background 0.15s' }}
                      className="hover:bg-blue-50">{s}</Link>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Our Domains</div>
                  {domains.map(d => (
                    <Link key={d} href="/contact" style={{ display: 'block', padding: '6px 10px', borderRadius: 8, fontSize: 14, color: 'var(--text)', textDecoration: 'none' }}
                      className="hover:bg-blue-50">{d} Assignment</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link href="/#about" className="nav-link" style={{ fontSize: 15 }}>About</Link>
          <Link href="/#how-it-works" className="nav-link" style={{ fontSize: 15 }}>How It Works</Link>
          <Link href="/#testimonials" className="nav-link" style={{ fontSize: 15 }}>Reviews</Link>
          <Link href="/#faq" className="nav-link" style={{ fontSize: 15 }}>FAQ</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/contact" style={{
            padding: '10px 24px', borderRadius: 10, fontSize: 14, fontWeight: 600,
            background: 'var(--primary)', color: 'white', textDecoration: 'none',
            transition: 'background 0.2s, transform 0.2s',
          }}
            className="hover:opacity-90">
            Get Help Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
        >
          <div style={{ width: 24, height: 2, background: 'var(--primary)', margin: '5px 0', borderRadius: 2 }} />
          <div style={{ width: 24, height: 2, background: 'var(--primary)', margin: '5px 0', borderRadius: 2 }} />
          <div style={{ width: 24, height: 2, background: 'var(--primary)', margin: '5px 0', borderRadius: 2 }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: 'white', borderTop: '1px solid var(--border)', padding: '16px 20px' }} className="md:hidden">
          <Link href="/#how-it-works" style={{ display: 'block', padding: '10px 0', color: 'var(--text)', textDecoration: 'none', borderBottom: '1px solid var(--border)' }} onClick={() => setMenuOpen(false)}>How It Works</Link>
          <Link href="/#testimonials" style={{ display: 'block', padding: '10px 0', color: 'var(--text)', textDecoration: 'none', borderBottom: '1px solid var(--border)' }} onClick={() => setMenuOpen(false)}>Reviews</Link>
          <Link href="/#faq" style={{ display: 'block', padding: '10px 0', color: 'var(--text)', textDecoration: 'none', borderBottom: '1px solid var(--border)' }} onClick={() => setMenuOpen(false)}>FAQ</Link>
          <Link href="/contact" style={{ display: 'block', marginTop: 12, padding: '12px 20px', background: 'var(--primary)', color: 'white', textDecoration: 'none', borderRadius: 10, textAlign: 'center', fontWeight: 600 }} onClick={() => setMenuOpen(false)}>Get Help Now</Link>
        </div>
      )}
    </header>
  );
}
