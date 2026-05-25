'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const serviceTypes = [
  'Essay Writing', 'Dissertation/Thesis', 'Report Writing', 'Case Study',
  'CV Writing', 'SOP Writing', 'Research Paper', 'Blog/Article Writing',
  'Law Assignment', 'Engineering Assignment', 'Nursing Assignment',
  'Finance/Statistics', 'Psychology Assignment', 'Technical Writing',
  'Online Exam Help', 'Other',
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', serviceType: '', message: '', deadline: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) setSuccess(true);
      else setError(data.error || 'Something went wrong. Please try again.');
    } catch {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 110, minHeight: '100vh', background: 'var(--bg)' }}>

        {/* Hero strip */}
        <div style={{
          background: 'linear-gradient(135deg, #0f2137 0%, #1a3a5c 100%)',
          padding: '40px 0 80px', position: 'relative', overflow: 'hidden',
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

        {/* Cards section — pulled up */}
        <div className="max-w-6xl mx-auto px-6" style={{ marginTop: -40, paddingBottom: 80 }}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Left info */}
            <div className="lg:col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Contact cards */}
              {[
                { icon: '📞', label: 'Phone / WhatsApp', value: '+91-7357274693', href: 'tel:+917357274693' },
                { icon: '✉️', label: 'Email', value: 'contact.assignmenthub1@gmail.com', href: 'mailto:contact.assignmenthub1@gmail.com' },
                { icon: '👤', label: 'Manager', value: 'Anil Kumawat', href: null },
                { icon: '🕐', label: 'Support Hours', value: '24/7 Available', href: null },
              ].map((item, i) => (
                item.href ? (
                  <a key={i} href={item.href} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 20px', background: 'white', borderRadius: 16,
                    border: '1.5px solid var(--border)', textDecoration: 'none',
                    boxShadow: '0 2px 12px rgba(15,33,55,0.05)',
                    transition: 'border-color 0.2s',
                  }} className="hover:border-blue-300">
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--bg)', border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{item.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginTop: 2 }}>{item.value}</div>
                    </div>
                  </a>
                ) : (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 20px', background: 'white', borderRadius: 16,
                    border: '1.5px solid var(--border)',
                    boxShadow: '0 2px 12px rgba(15,33,55,0.05)',
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
                {[
                  '✅ AI-Free, Human-Written Work',
                  '⏰ On-Time Delivery Guaranteed',
                  '🔒 100% Confidential',
                  '🔄 Free Revisions Included',
                  '📋 Plagiarism-Free Certificate',
                ].map(b => (
                  <div key={b} style={{ fontSize: 13, marginBottom: 10, opacity: 0.88, display: 'flex', alignItems: 'center', gap: 4 }}>{b}</div>
                ))}
              </div>

              {/* WhatsApp button */}
              <a href="https://api.whatsapp.com/send/?phone=917357274693" target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  padding: '14px 20px', background: '#25d366', borderRadius: 14, color: 'white',
                  textDecoration: 'none', fontSize: 14, fontWeight: 700,
                  boxShadow: '0 6px 20px rgba(37,211,102,0.3)',
                }}>
                💬 Chat on WhatsApp Now
              </a>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div style={{
                background: 'white', borderRadius: 24, padding: '36px 32px',
                boxShadow: '0 8px 48px rgba(15,33,55,0.09)', border: '1px solid var(--border)',
              }}>
                {success ? (
                  <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                    <div style={{ fontSize: 68, marginBottom: 22 }}>✅</div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--primary)', marginBottom: 14 }}>
                      Inquiry Submitted!
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 28, lineHeight: 1.7 }}>
                      Thank you! We'll contact you within 15 minutes via WhatsApp or email.
                    </p>
                    <button onClick={() => { setSuccess(false); setForm({ name: '', email: '', phone: '', subject: '', serviceType: '', message: '', deadline: '' }); }}
                      style={{ padding: '13px 30px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-body)' }}>
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <>
                    <div style={{ marginBottom: 28 }}>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--primary)', marginBottom: 6, letterSpacing: '-0.01em' }}>
                        Tell Us About Your Assignment
                      </h2>
                      <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>All fields marked * are required</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[
                        { label: 'Full Name *', name: 'name', type: 'text', placeholder: 'Your full name' },
                        { label: 'Email Address *', name: 'email', type: 'email', placeholder: 'your@email.com' },
                        { label: 'Phone / WhatsApp *', name: 'phone', type: 'text', placeholder: '+91 XXXXX XXXXX' },
                        { label: 'Deadline', name: 'deadline', type: 'date', placeholder: '' },
                      ].map(field => (
                        <div key={field.name}>
                          <label style={{ display: 'block', fontWeight: 600, fontSize: 12, color: 'var(--text)', marginBottom: 7, letterSpacing: '0.03em', textTransform: 'uppercase' }}>{field.label}</label>
                          <input name={field.name} type={field.type} value={(form as Record<string, string>)[field.name]} onChange={handleChange} placeholder={field.placeholder} className="form-input" />
                        </div>
                      ))}

                      <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: 12, color: 'var(--text)', marginBottom: 7, letterSpacing: '0.03em', textTransform: 'uppercase' }}>Service Type *</label>
                        <select name="serviceType" value={form.serviceType} onChange={handleChange} className="form-input">
                          <option value="">Select a service</option>
                          {serviceTypes.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: 12, color: 'var(--text)', marginBottom: 7, letterSpacing: '0.03em', textTransform: 'uppercase' }}>Subject / Topic *</label>
                        <input name="subject" value={form.subject} onChange={handleChange} placeholder="e.g. Marketing Strategy Essay" className="form-input" />
                      </div>

                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: 12, color: 'var(--text)', marginBottom: 7, letterSpacing: '0.03em', textTransform: 'uppercase' }}>Message / Requirements *</label>
                        <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Describe your assignment requirements, word count, referencing style, etc." className="form-input" style={{ resize: 'vertical' }} />
                      </div>
                    </div>

                    {error && (
                      <div style={{ marginTop: 16, padding: '13px 18px', background: '#fef2f2', borderRadius: 10, color: '#dc2626', fontSize: 13, border: '1px solid #fecaca' }}>
                        ❌ {error}
                      </div>
                    )}

                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      style={{
                        marginTop: 26, width: '100%', padding: '16px',
                        borderRadius: 13, fontFamily: 'var(--font-body)',
                        background: loading ? '#94a3b8' : 'var(--primary)',
                        color: 'white', border: 'none', fontSize: 15, fontWeight: 700,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        boxShadow: loading ? 'none' : '0 6px 24px rgba(15,33,55,0.22)',
                        transition: 'background 0.2s',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {loading ? '⏳ Submitting...' : '📋 Submit Inquiry →'}
                    </button>
                    <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 14 }}>
                      🔒 Your information is completely confidential. We respond within 15 minutes.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
