import Link from 'next/link';

const services = ['Essay Help', 'Dissertation Writing', 'Report Writing', 'CV Writing', 'SOP Writing', 'Case Study Help', 'Research Paper', 'Blog Writing'];
const domains = ['Law Assignment', 'Engineering', 'Nursing', 'Finance & Stats', 'Management & HR', 'Science', 'Psychology', 'Calculus'];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--primary)', color: 'white' }}>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, color: 'var(--primary)' }}>A</div>
              <div>
                <div className="font-playfair font-bold text-white" style={{ fontSize: 18 }}>Assignment Hub</div>
                <div style={{ fontSize: 10, opacity: 0.6, letterSpacing: '0.1em' }}>EXPERT ACADEMIC WRITING</div>
              </div>
            </div>
            <p style={{ opacity: 0.7, fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>
              India's trusted academic writing service. 7000+ expert writers. AI-free, plagiarism-free work delivered on time.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {['📘', '💬', '📸', '💼'].map((icon, i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16, transition: 'background 0.2s' }}>
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.5, marginBottom: 16 }}>Services</div>
            {services.map(s => (
              <Link key={s} href="/contact" style={{ display: 'block', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14, marginBottom: 8, transition: 'color 0.2s' }}
                className="hover:text-white">{s}</Link>
            ))}
          </div>

          {/* Domains */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.5, marginBottom: 16 }}>Domains</div>
            {domains.map(d => (
              <Link key={d} href="/contact" style={{ display: 'block', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14, marginBottom: 8 }}
                className="hover:text-white">{d}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.5, marginBottom: 16 }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <a href="tel:+917357274693" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 14 }}>
                <span style={{ fontSize: 18 }}>📞</span> +91-7357274693
              </a>
              <a href="mailto:contact.assignmenthub1@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 14 }}>
                <span style={{ fontSize: 18 }}>✉️</span> contact.assignmenthub1@gmail.com
              </a>
              <div style={{ marginTop: 12, padding: '14px 16px', background: 'rgba(255,255,255,0.08)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)' }}>
                <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 4 }}>Managed by</div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>Anil Kumawat</div>
                <div style={{ fontSize: 12, opacity: 0.6 }}>The Assignment Hub</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '16px 20px' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p style={{ fontSize: 13, opacity: 0.6 }}>© 2025 The Assignment Hub. All rights reserved.</p>
          <div className="flex gap-5">
            {['Terms of Use', 'Privacy Policy', 'Refund Policy'].map(t => (
              <Link key={t} href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}
                className="hover:text-white">{t}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
