'use client';
import { useState } from 'react';
import Link from 'next/link';
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
      <main style={{ paddingTop: 100, minHeight: '100vh', background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left info */}
            <div className="lg:col-span-2">
              <div className="section-tag mb-5">Submit Inquiry</div>
              <h1 className="font-playfair" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: 'var(--primary)', marginBottom: 16 }}>
                Get Expert Help Today
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>
                Fill in your assignment details and our expert team will get back to you within minutes.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: '📞', label: 'Phone / WhatsApp', value: '+91-7357274693' },
                  { icon: '✉️', label: 'Email', value: 'contact.assignmenthub1@gmail.com' },
                  { icon: '👤', label: 'Manager', value: 'Anil Kumawat' },
                  { icon: '🕐', label: 'Support Hours', value: '24/7 Available' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: 'white', borderRadius: 14, border: '1px solid var(--border)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <span style={{ fontSize: 22 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{item.label}</div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 24, padding: 20, background: 'var(--primary)', borderRadius: 16, color: 'white' }}>
                <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 6 }}>Why students choose us:</div>
                {['✅ AI-Free, Human-Written Work', '⏰ On-Time Delivery Guaranteed', '🔒 100% Confidential', '🔄 Free Revisions Included'].map(b => (
                  <div key={b} style={{ fontSize: 14, marginBottom: 6, opacity: 0.9 }}>{b}</div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div style={{ background: 'white', borderRadius: 24, padding: 36, boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: '1px solid var(--border)' }}>
                {success ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
                    <h2 className="font-playfair" style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)', marginBottom: 12 }}>
                      Inquiry Submitted!
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: 16, marginBottom: 24 }}>
                      Thank you! We'll contact you within 15 minutes. Check your email or WhatsApp for confirmation.
                    </p>
                    <button onClick={() => { setSuccess(false); setForm({ name: '', email: '', phone: '', subject: '', serviceType: '', message: '', deadline: '' }); }}
                      style={{ padding: '12px 28px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 600, fontSize: 15 }}>
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-playfair" style={{ fontSize: 24, fontWeight: 800, color: 'var(--primary)', marginBottom: 6 }}>Tell Us About Your Assignment</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>All fields marked * are required</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text)', marginBottom: 6 }}>Full Name *</label>
                        <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="form-input" />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text)', marginBottom: 6 }}>Email Address *</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="form-input" />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text)', marginBottom: 6 }}>Phone / WhatsApp *</label>
                        <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="form-input" />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text)', marginBottom: 6 }}>Service Type *</label>
                        <select name="serviceType" value={form.serviceType} onChange={handleChange} className="form-input">
                          <option value="">Select a service</option>
                          {serviceTypes.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text)', marginBottom: 6 }}>Subject / Topic *</label>
                        <input name="subject" value={form.subject} onChange={handleChange} placeholder="e.g. Marketing Strategy Essay" className="form-input" />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text)', marginBottom: 6 }}>Deadline</label>
                        <input name="deadline" type="date" value={form.deadline} onChange={handleChange} className="form-input" />
                      </div>
                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text)', marginBottom: 6 }}>Message / Requirements *</label>
                        <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Describe your assignment requirements, word count, referencing style, etc." className="form-input" style={{ resize: 'vertical' }} />
                      </div>
                    </div>

                    {error && (
                      <div style={{ marginTop: 16, padding: '12px 16px', background: '#fee2e2', borderRadius: 10, color: '#dc2626', fontSize: 14 }}>
                        ❌ {error}
                      </div>
                    )}

                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      style={{
                        marginTop: 24, width: '100%', padding: '15px', borderRadius: 12,
                        background: loading ? '#94a3b8' : 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
                        color: 'white', border: 'none', fontSize: 16, fontWeight: 700,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'opacity 0.2s', boxShadow: '0 6px 20px rgba(26,58,92,0.2)',
                      }}
                    >
                      {loading ? '⏳ Submitting...' : '📋 Submit Inquiry →'}
                    </button>
                    <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>
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
