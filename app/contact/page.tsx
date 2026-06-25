import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InquiryForm from '@/components/InquiryForm';
import { getSettings, getPublishedPages } from '@/lib/content';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    title: `Submit Inquiry — ${s.siteName}`,
    description: `Get expert academic writing help from ${s.siteName}. Submit your assignment details and our team responds within minutes.`,
  };
}

export default async function ContactPage() {
  const [settings, pages] = await Promise.all([getSettings(), getPublishedPages()]);

  const waNumber = settings.whatsapp || settings.phone.replace(/[^\d]/g, '');
  const cards = [
    { icon: '📞', label: 'Phone / WhatsApp', value: settings.phone, href: `tel:${settings.phone.replace(/\s/g, '')}` },
    { icon: '✉️', label: 'Email', value: settings.email, href: `mailto:${settings.email}` },
    { icon: '👤', label: 'Manager', value: settings.managerName, href: null },
    { icon: '🕐', label: 'Support Hours', value: settings.supportHours, href: null },
  ].filter(c => c.value);

  const benefits = [
    '✅ AI-Free, Human-Written Work',
    '⏰ On-Time Delivery Guaranteed',
    '🔒 100% Confidential',
    '🔄 Free Revisions Included',
    '📋 Plagiarism-Free Certificate',
  ];

  return (
    <>
      <Navbar settings={settings} />
      <main style={{ paddingTop: 110, minHeight: '100vh', background: 'var(--bg)' }}>

        {/* Hero strip */}
        <div style={{
          background: 'linear-gradient(135deg, #0f2137 0%, #1a3a5c 100%)',
          padding: '52px 0 116px', position: 'relative', overflow: 'hidden',
          borderRadius: '0 0 32px 32px',
        }}>
          <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(232,160,32,0.08)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="section-tag mx-auto mb-5" style={{ color: 'var(--accent)', borderColor: 'rgba(232,160,32,0.4)', background: 'rgba(232,160,32,0.12)' }}>
              Submit Inquiry
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4vw, 50px)', fontWeight: 700, color: 'white', marginBottom: 12, letterSpacing: '-0.01em' }}>
              Get Expert Help Today
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
              Fill in your assignment details and our expert team will get back to you within minutes.
            </p>
          </div>
        </div>

        {/* Cards section — floats over the hero base */}
        <div className="max-w-6xl mx-auto px-6 relative z-10 -mt-16 lg:-mt-24" style={{ paddingBottom: 80 }}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Left info */}
            <div className="lg:col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {cards.map((item, i) => (
                item.href ? (
                  <a key={i} href={item.href} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 20px', background: 'white', borderRadius: 16,
                    border: '1.5px solid var(--border)', textDecoration: 'none',
                    boxShadow: '0 16px 40px rgba(15,33,55,0.14)',
                    transition: 'border-color 0.2s',
                  }} className="hover:border-blue-300">
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--bg)', border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{item.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginTop: 2, wordBreak: 'break-word' }}>{item.value}</div>
                    </div>
                  </a>
                ) : (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 20px', background: 'white', borderRadius: 16,
                    border: '1.5px solid var(--border)',
                    boxShadow: '0 16px 40px rgba(15,33,55,0.14)',
                  }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--bg)', border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{item.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginTop: 2 }}>{item.value}</div>
                    </div>
                  </div>
                )
              ))}

              {/* Why us box */}
              <div style={{
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-mid) 100%)',
                borderRadius: 18, padding: '22px 20px', color: 'white', marginTop: 4,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Why students choose us</div>
                {benefits.map(b => (
                  <div key={b} style={{ fontSize: 13, marginBottom: 10, opacity: 0.88, display: 'flex', alignItems: 'center', gap: 4 }}>{b}</div>
                ))}
              </div>

              {waNumber && (
                <a href={`https://api.whatsapp.com/send/?phone=${waNumber}`} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    padding: '14px 20px', background: '#25d366', borderRadius: 14, color: 'white',
                    textDecoration: 'none', fontSize: 14, fontWeight: 700,
                    boxShadow: '0 6px 20px rgba(37,211,102,0.3)',
                  }}>
                  💬 Chat on WhatsApp Now
                </a>
              )}
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <InquiryForm settings={settings} />
            </div>
          </div>
        </div>
      </main>
      <Footer settings={settings} pages={pages} />
    </>
  );
}
