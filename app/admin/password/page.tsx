'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '@/components/AdminNav';

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 14px', border: '1.5px solid #e2e8f0',
  borderRadius: 10, fontSize: 14, outline: 'none', background: '#fafbfc',
};
const lbl: React.CSSProperties = {
  display: 'block', fontSize: 12, fontWeight: 700, color: '#475569',
  marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em',
};

export default function AdminPasswordPage() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const submit = async () => {
    setError(''); setSuccess(false);
    if (!current || !next || !confirm) { setError('Please fill in all fields.'); return; }
    if (next.length < 8) { setError('New password must be at least 8 characters.'); return; }
    if (next !== confirm) { setError('New password and confirmation do not match.'); return; }
    if (next === current) { setError('New password must be different from the current one.'); return; }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: current, newPassword: next, confirmPassword: confirm }),
      });
      if (res.status === 401) {
        const data = await res.json().catch(() => ({}));
        // Distinguish "session expired" from "wrong current password".
        if (data?.error?.toLowerCase().includes('current password')) {
          setError(data.error);
        } else {
          router.push('/admin/login');
          return;
        }
      } else {
        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          setSuccess(true);
          setCurrent(''); setNext(''); setConfirm('');
        } else {
          setError(data.error || 'Something went wrong. Please try again.');
        }
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setSaving(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      <AdminNav active="password" />
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '24px 18px 80px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1a3a5c', marginBottom: 4 }}>Change Password</h1>
        <p style={{ fontSize: 13, color: '#64748b', marginBottom: 22 }}>
          Update the password used to sign in to the admin panel. Minimum 8 characters.
        </p>

        <div style={{ background: 'white', borderRadius: 16, padding: 24, border: '1.5px solid #e2e8f0' }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '24px 12px' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#15803d', marginBottom: 6 }}>Password updated</div>
              <p style={{ fontSize: 13.5, color: '#64748b', marginBottom: 20 }}>
                Your new password is now active. Use it the next time you log in.
              </p>
              <button onClick={() => setSuccess(false)} style={{ padding: '10px 20px', borderRadius: 10, fontSize: 14, fontWeight: 700, background: '#1a3a5c', color: 'white', border: 'none', cursor: 'pointer' }}>
                Change again
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 16 }}>
              <div>
                <label style={lbl}>Current Password</label>
                <input type={show ? 'text' : 'password'} value={current} onChange={e => setCurrent(e.target.value)} placeholder="Enter current password" style={inputStyle} autoComplete="current-password" />
              </div>
              <div>
                <label style={lbl}>New Password</label>
                <input type={show ? 'text' : 'password'} value={next} onChange={e => setNext(e.target.value)} placeholder="At least 8 characters" style={inputStyle} autoComplete="new-password" />
              </div>
              <div>
                <label style={lbl}>Confirm New Password</label>
                <input type={show ? 'text' : 'password'} value={confirm} onChange={e => setConfirm(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} placeholder="Re-enter new password" style={inputStyle} autoComplete="new-password" />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                <input type="checkbox" checked={show} onChange={e => setShow(e.target.checked)} style={{ width: 16, height: 16 }} />
                Show passwords
              </label>

              {error && (
                <div style={{ padding: '11px 14px', background: '#fef2f2', borderRadius: 10, color: '#dc2626', fontSize: 13, border: '1px solid #fecaca' }}>
                  ❌ {error}
                </div>
              )}

              <button onClick={submit} disabled={saving} style={{ padding: '13px 20px', borderRadius: 11, fontSize: 14.5, fontWeight: 700, background: saving ? '#94a3b8' : '#1a3a5c', color: 'white', border: 'none', cursor: saving ? 'not-allowed' : 'pointer' }}>
                {saving ? '⏳ Updating…' : '🔒 Update Password'}
              </button>
            </div>
          )}
        </div>

        <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 14, lineHeight: 1.6 }}>
          Note: the very first password comes from the <code style={{ background: '#e2e8f0', padding: '1px 6px', borderRadius: 5 }}>ADMIN_PASSWORD</code> environment variable.
          Once you change it here, the new password is stored securely (hashed) in the database and the environment variable is no longer used.
        </p>
      </div>
    </div>
  );
}
