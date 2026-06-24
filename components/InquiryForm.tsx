'use client';

import { useRef, useState } from 'react';
import type { SettingsData } from '@/lib/defaults';

const serviceTypes = [
  'Essay Writing', 'Dissertation/Thesis', 'Report Writing', 'Case Study',
  'CV Writing', 'SOP Writing', 'Research Paper', 'Blog/Article Writing',
  'Law Assignment', 'Engineering Assignment', 'Nursing Assignment',
  'Finance/Statistics', 'Psychology Assignment', 'Technical Writing',
  'Online Exam Help', 'Other',
];

const MAX_BYTES = 4 * 1024 * 1024;

const emptyForm = { name: '', email: '', phone: '', subject: '', serviceType: '', message: '', deadline: '' };

export default function InquiryForm({ settings }: { settings: SettingsData }) {
  const [form, setForm] = useState({ ...emptyForm });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const f = e.target.files?.[0] || null;
    if (f && f.size > MAX_BYTES) {
      setError('File exceeds the 4 MB limit. Please upload a smaller file.');
      if (fileRef.current) fileRef.current.value = '';
      setFile(null);
      return;
    }
    setFile(f);
  };

  const reset = () => {
    setSuccess(false);
    setForm({ ...emptyForm });
    setFile(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.phone || !form.subject || !form.serviceType || !form.message) {
      setError('Please fill in all required fields marked with *.');
      return;
    }

    setLoading(true);
    try {
      let attachmentId: string | undefined;
      let attachmentName: string | undefined;

      // 1) Upload the file first (if any), then attach its reference to the inquiry.
      if (file) {
        const fd = new FormData();
        fd.append('file', file);
        const up = await fetch('/api/upload', { method: 'POST', body: fd });
        const upData = await up.json();
        if (!up.ok) {
          setError(upData.error || 'File upload failed. Please try again.');
          setLoading(false);
          return;
        }
        attachmentId = upData.id;
        attachmentName = upData.filename;
      }

      // 2) Submit the inquiry.
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, attachmentId, attachmentName }),
      });
      const data = await res.json();
      if (res.ok) setSuccess(true);
      else setError(data.error || 'Something went wrong. Please try again.');
    } catch {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontWeight: 600, fontSize: 12, color: 'var(--text)',
    marginBottom: 7, letterSpacing: '0.03em', textTransform: 'uppercase',
  };

  if (success) {
    return (
      <div style={{
        background: 'white', borderRadius: 24, padding: '36px 32px',
        boxShadow: '0 8px 48px rgba(15,33,55,0.09)', border: '1px solid var(--border)',
      }}>
        <div style={{ textAlign: 'center', padding: '48px 20px' }}>
          <div style={{ fontSize: 68, marginBottom: 22 }}>✅</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--primary)', marginBottom: 14 }}>
            Inquiry Submitted!
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 28, lineHeight: 1.7 }}>
            Thank you! We&apos;ll contact you within 15 minutes via WhatsApp or email.
          </p>
          <button onClick={reset}
            style={{ padding: '13px 30px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-body)' }}>
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'white', borderRadius: 24, padding: 'clamp(22px, 4vw, 36px)',
      boxShadow: '0 8px 48px rgba(15,33,55,0.09)', border: '1px solid var(--border)',
    }}>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 26px)', fontWeight: 700, color: 'var(--primary)', marginBottom: 6, letterSpacing: '-0.01em' }}>
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
            <label style={labelStyle}>{field.label}</label>
            <input name={field.name} type={field.type} value={(form as Record<string, string>)[field.name]} onChange={handleChange} placeholder={field.placeholder} className="form-input" />
          </div>
        ))}

        <div>
          <label style={labelStyle}>Service Type *</label>
          <select name="serviceType" value={form.serviceType} onChange={handleChange} className="form-input">
            <option value="">Select a service</option>
            {serviceTypes.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Subject / Topic *</label>
          <input name="subject" value={form.subject} onChange={handleChange} placeholder="e.g. Marketing Strategy Essay" className="form-input" />
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Message / Requirements *</label>
          <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Describe your assignment requirements, word count, referencing style, etc." className="form-input" style={{ resize: 'vertical' }} />
        </div>

        {/* File upload — requirement #1 */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Attach Assignment File (optional)</label>
          <label
            htmlFor="inquiry-file"
            style={{
              display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
              padding: '14px 18px', borderRadius: 12,
              border: '1.5px dashed var(--border)', background: 'var(--bg)',
              transition: 'border-color 0.2s',
            }}
          >
            <span style={{ fontSize: 22 }}>📎</span>
            <span style={{ fontSize: 13, color: file ? 'var(--text)' : 'var(--text-muted)', fontWeight: file ? 600 : 500, wordBreak: 'break-all' }}>
              {file ? file.name : 'Click to upload — PDF, Word, Excel, TXT, ZIP or image (max 4 MB)'}
            </span>
          </label>
          <input
            id="inquiry-file"
            ref={fileRef}
            type="file"
            onChange={handleFile}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.png,.jpg,.jpeg,.webp"
            style={{ display: 'none' }}
          />
          {file && (
            <button
              type="button"
              onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = ''; }}
              style={{ marginTop: 8, fontSize: 12, color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, padding: 0 }}
            >
              ✕ Remove file
            </button>
          )}
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
          transition: 'background 0.2s', letterSpacing: '0.02em',
        }}
      >
        {loading ? '⏳ Submitting...' : '📋 Submit Inquiry →'}
      </button>
      <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 14 }}>
        🔒 Your information is completely confidential. We respond within 15 minutes.
      </p>
    </div>
  );
}
