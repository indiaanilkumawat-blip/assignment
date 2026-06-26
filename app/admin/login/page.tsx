'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!password) { setError('Please enter your password'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) router.push('/admin/dashboard');
      else setError('Invalid password. Please try again.');
    } catch {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a3a5c 0%, #2563a8 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }}>
      <div style={{ background: 'white', borderRadius: 24, padding: 40, width: '100%', maxWidth: 420, boxShadow: '0 24px 60px rgba(0,0,0,0.3)' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="The Assignment Hub" style={{ width: 200, maxWidth: '70%', height: 'auto', margin: '0 auto 12px', display: 'block' }} />
          <h1 style={{ fontFamily: 'var(--font-display, serif)', fontSize: 24, fontWeight: 800, color: '#1a3a5c', marginBottom: 4 }}>Admin Panel</h1>
          <p style={{ fontSize: 14, color: '#64748b' }}>The Assignment Hub — Anil Kumawat</p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: '#1e293b', marginBottom: 8 }}>Admin Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Enter your password"
            style={{
              width: '100%', padding: '13px 16px', border: '1.5px solid #e2e8f0',
              borderRadius: 10, fontSize: 15, outline: 'none',
              transition: 'border-color 0.2s',
            }}
          />
        </div>

        {error && (
          <div style={{ marginBottom: 16, padding: '10px 14px', background: '#fee2e2', borderRadius: 8, color: '#dc2626', fontSize: 13 }}>
            ❌ {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%', padding: '14px', borderRadius: 10, fontSize: 15, fontWeight: 700,
            background: loading ? '#94a3b8' : 'linear-gradient(135deg, #1a3a5c 0%, #2563a8 100%)',
            color: 'white', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 16px rgba(26,58,92,0.3)',
          }}
        >
          {loading ? '⏳ Logging in...' : '🔐 Login to Dashboard'}
        </button>

        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: '#94a3b8' }}>
          🔒 Secure admin access only
        </p>
      </div>
    </div>
  );
}
