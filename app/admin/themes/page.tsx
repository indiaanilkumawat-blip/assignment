'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '@/components/AdminNav';
import { THEMES, Theme } from '@/lib/themes';

/** A small hero-like preview card rendered in each theme's own colours. */
function ThemePreview({ t, selected, onPick, saving }: {
  t: Theme; selected: boolean; onPick: () => void; saving: boolean;
}) {
  const heroGrad = `linear-gradient(150deg, ${t.heroA} 0%, ${t.heroB} 55%, ${t.heroC} 100%)`;
  return (
    <button
      onClick={onPick}
      disabled={saving}
      style={{
        textAlign: 'left', padding: 0, cursor: saving ? 'default' : 'pointer',
        border: selected ? `3px solid ${t.primaryLight}` : '2px solid #e2e8f0',
        borderRadius: 16, overflow: 'hidden', background: 'white',
        boxShadow: selected ? `0 10px 30px rgba(0,0,0,0.15)` : '0 1px 3px rgba(0,0,0,0.06)',
        transition: 'transform 0.12s, box-shadow 0.12s', position: 'relative',
      }}
    >
      {/* mini hero */}
      <div style={{ background: heroGrad, padding: '20px 18px 22px', position: 'relative' }}>
        <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 999, fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accent, background: `rgba(0,0,0,0.18)`, marginBottom: 10 }}>
          Most Trusted
        </span>
        <div style={{ color: 'white', fontWeight: 800, fontSize: 18, lineHeight: 1.15, fontFamily: 'serif' }}>
          AI-Free &amp;<br />Plagiarism-Free
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 6 }}>
          <span style={{ padding: '5px 12px', borderRadius: 7, background: t.accent, color: t.accentInk, fontSize: 10, fontWeight: 700 }}>Get Help</span>
          <span style={{ padding: '5px 12px', borderRadius: 7, background: '#25d366', color: 'white', fontSize: 10, fontWeight: 700 }}>WhatsApp</span>
        </div>
      </div>
      {/* swatch strip + name */}
      <div style={{ padding: '12px 14px', background: t.bg }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <strong style={{ fontSize: 13.5, color: t.text }}>{t.name}</strong>
          <div style={{ display: 'flex', gap: 5 }}>
            {[t.primary, t.primaryLight, t.accent, t.accentLight].map((c, i) => (
              <span key={i} style={{ width: 16, height: 16, borderRadius: '50%', background: c, border: '1px solid rgba(0,0,0,0.08)' }} />
            ))}
          </div>
        </div>
      </div>
      {selected && (
        <div style={{ position: 'absolute', top: 10, right: 10, width: 26, height: 26, borderRadius: '50%', background: t.accent, color: t.accentInk, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 15, boxShadow: '0 2px 8px rgba(0,0,0,0.25)' }}>
          ✓
        </div>
      )}
    </button>
  );
}

export default function AdminThemesPage() {
  const [active, setActive] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const router = useRouter();

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/theme');
    if (res.status === 401) { router.push('/admin/login'); return; }
    const data = await res.json();
    setActive(data.theme || THEMES[0].key);
    setLoading(false);
  }, [router]);

  useEffect(() => { load(); }, [load]);

  const pick = async (key: string) => {
    if (saving || key === active) return;
    const prev = active;
    setActive(key); // optimistic
    setSaving(true); setMsg('');
    const res = await fetch('/api/admin/theme', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme: key }),
    });
    if (res.status === 401) { router.push('/admin/login'); return; }
    setSaving(false);
    if (res.ok) {
      const t = THEMES.find((x) => x.key === key);
      setMsg(`✅ "${t?.name}" applied. Your live website now uses this theme.`);
    } else {
      setActive(prev);
      setMsg('❌ Could not apply theme. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      <AdminNav active="themes" />
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 18px 100px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>🎨 Website Theme</h1>
        <p style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>
          Pick a colour theme for the whole site. Click any card to apply it instantly to the live website —
          colours, gradients, buttons and highlights all update. {THEMES.length} themes available.
        </p>

        {msg && (
          <div style={{ padding: '10px 14px', borderRadius: 10, background: 'white', border: '1px solid #e2e8f0', fontSize: 13.5, marginBottom: 16 }}>{msg}</div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>Loading themes…</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 16 }}>
            {THEMES.map((t) => (
              <ThemePreview key={t.key} t={t} selected={t.key === active} saving={saving} onPick={() => pick(t.key)} />
            ))}
          </div>
        )}

        <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 22 }}>
          Note: changes appear on the live site within a few seconds (cache refresh). If you use a GIF hero
          background, the overlay automatically re-tints to match the chosen theme.
        </p>
      </div>
    </div>
  );
}
