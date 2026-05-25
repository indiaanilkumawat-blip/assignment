import Link from 'next/link';

const services = ['Essay Help', 'Dissertation Writing', 'Report Writing', 'CV Writing', 'SOP Writing', 'Case Study Help', 'Research Paper', 'Blog Writing'];
const domains = ['Law Assignment', 'Engineering', 'Nursing', 'Finance & Stats', 'Management & HR', 'Science', 'Psychology', 'Calculus'];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--primary)', color: 'white', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative top border */}
      <div style={{ height: 4, background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 50%, var(--accent) 100%)' }} />

      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: -120, right: -120, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }} />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800 }}>A</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, lineHeight: 1.1 }}>Assignment Hub</div>
                <div style={{ fontSize: 9, opacity: 0.5, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Expert Academic Writing</div>
              </div>
            </div>
            <p style={{ opacity: 0.6, fontSize: 13, lineHeight: 1.9, marginBottom: 20 }}>
              India's most trusted academic writing service with 7,000+ expert writers and 3.5M+ assignments delivered.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { icon: '📘', label: 'Facebook' },
                { icon: '💬', label: 'WhatsApp' },
                { icon: '📸', label: 'Instagram' },
                { icon: '💼', label: 'LinkedIn' },
              ].map(({ icon, label }) => (
                <div key={label} title={label} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 15, transition: 'background 0.2s' }}
                  className="hover:bg-white/20">
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 18 }}>Services</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {services.map(s => (
                <Link key={s} href="/contact" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 13, fontWeight: 500, transition: 'color 0.2s' }}
                  className="hover:text-white">{s}</Link>
              ))}
            </div>
          </div>

          {/* Domains */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 18 }}>Domains</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {domains.map(d => (
                <Link key={d} href="/contact" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}
                  className="hover:text-white">{d}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 18 }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
              <a href="tel:+917357274693" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
                <span style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📞</span>
                +91-7357274693
              </a>
              <a href="mailto:contact.assignmenthub1@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
                <span style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✉️</span>
                contact.assignmenthub1@gmail.com
              </a>
            </div>

            {/* WhatsApp CTA */}
            <a href="https://api.whatsapp.com/send/?phone=917357274693" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 16px', background: '#25d366', borderRadius: 12, color: 'white', textDecoration: 'none', fontSize: 13, fontWeight: 700, boxShadow: '0 6px 20px rgba(37,211,102,0.25)' }}>
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Divider & bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: 48, paddingTop: 20, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ fontSize: 12, opacity: 0.45, fontWeight: 500 }}>© 2025 The Assignment Hub. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Terms of Use', 'Privacy Policy', 'Refund Policy'].map(t => (
              <Link key={t} href="#" style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
                className="hover:text-white">{t}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
