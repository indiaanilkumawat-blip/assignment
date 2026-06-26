'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '@/components/AdminNav';
import { DEFAULT_HERO_STATS, type SettingsData } from '@/lib/defaults';

type Settings = SettingsData & { _id?: string; key?: string };

const card: React.CSSProperties = {
  background: 'white', borderRadius: 16, padding: 24,
  border: '1.5px solid #e2e8f0', marginBottom: 20,
};
const sectionTitle: React.CSSProperties = { fontSize: 16, fontWeight: 800, color: '#1a3a5c', marginBottom: 4 };
const sectionHint: React.CSSProperties = { fontSize: 12.5, color: '#94a3b8', marginBottom: 18 };
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 13px', border: '1.5px solid #e2e8f0',
  borderRadius: 9, fontSize: 14, outline: 'none', background: '#fafbfc', fontFamily: 'inherit',
};
const lbl: React.CSSProperties = {
  display: 'block', fontSize: 12, fontWeight: 700, color: '#475569',
  marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em',
};
const grid: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 };

// Module-level so it never remounts on parent re-render (preserves input focus)
function Field({ label, value, onChange, placeholder, textarea }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; textarea?: boolean;
}) {
  return (
    <div>
      <label style={lbl}>{label}</label>
      {textarea ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={inputStyle} />
      )}
    </div>
  );
}

export default function AdminSettingsPage() {
  const [s, setS] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const router = useRouter();

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/settings');
    if (res.status === 401) { router.push('/admin/login'); return; }
    const data = await res.json();
    setS(data.settings);
    setLoading(false);
  }, [router]);

  useEffect(() => { load(); }, [load]);

  const set = (path: string) => (value: string) => {
    setS(prev => {
      if (!prev) return prev;
      const next = structuredClone(prev) as Record<string, unknown>;
      const parts = path.split('.');
      let cur = next;
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]] as Record<string, unknown>;
      cur[parts[parts.length - 1]] = value;
      return next as Settings;
    });
  };

  const get = (path: string): string => {
    let v: unknown = s;
    for (const p of path.split('.')) v = (v as Record<string, unknown>)?.[p];
    return (v as string) ?? '';
  };

  // ── Hero stat cards (fully admin-managed: icon, number, label) ──
  const heroStats = s?.heroStats ?? [];
  const mutStats = (fn: (arr: SettingsData['heroStats']) => SettingsData['heroStats']) =>
    setS(prev => (prev ? { ...prev, heroStats: fn([...(prev.heroStats ?? [])]) } : prev));
  const updStat = (i: number, k: 'icon' | 'number' | 'label', v: string) =>
    mutStats(arr => { arr[i] = { ...arr[i], [k]: v }; return arr; });
  const addStat = () => mutStats(arr => [...arr, { icon: '', number: '', label: '' }]);
  const removeStat = (i: number) => mutStats(arr => arr.filter((_, j) => j !== i));
  const moveStat = (i: number, dir: -1 | 1) => mutStats(arr => {
    const j = i + dir;
    if (j < 0 || j >= arr.length) return arr;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    return arr;
  });
  const loadDefaultStats = () => mutStats(() => DEFAULT_HERO_STATS.map(x => ({ ...x })));

  const save = async () => {
    if (!s) return;
    setSaving(true); setMsg('');
    const res = await fetch('/api/admin/settings', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s),
    });
    if (res.status === 401) { router.push('/admin/login'); return; }
    setMsg(res.ok ? '✅ Settings saved successfully.' : '❌ Failed to save. Try again.');
    setSaving(false);
    setTimeout(() => setMsg(''), 4000);
  };

  if (loading || !s) {
    return (
      <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
        <AdminNav active="settings" />
        <div style={{ textAlign: 'center', padding: 64, color: '#94a3b8' }}>Loading settings…</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      <AdminNav active="settings" />

      <div style={{ maxWidth: 880, margin: '0 auto', padding: '24px 18px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1a3a5c' }}>Site Settings</h1>
            <p style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>Edit business info, contact details, social links, stats and SEO. Changes reflect on the live site instantly.</p>
          </div>
          <button onClick={save} disabled={saving} style={{ padding: '11px 22px', borderRadius: 10, fontSize: 14, fontWeight: 700, background: saving ? '#94a3b8' : '#1a3a5c', color: 'white', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap' }}>
            {saving ? '⏳ Saving…' : '💾 Save Changes'}
          </button>
        </div>

        {msg && (
          <div style={{ marginBottom: 18, padding: '12px 16px', borderRadius: 10, fontSize: 14, fontWeight: 600, background: msg.startsWith('✅') ? '#d1fae5' : '#fee2e2', color: msg.startsWith('✅') ? '#047857' : '#dc2626' }}>
            {msg}
          </div>
        )}

        <div style={card}>
          <div style={sectionTitle}>Brand & Contact</div>
          <div style={sectionHint}>Shown in the navbar, footer and contact page.</div>
          <div style={grid}>
            <Field label="Site Name" value={get('siteName')} onChange={set('siteName')} />
            <Field label="Tagline" value={get('tagline')} onChange={set('tagline')} />
            <Field label="Phone" value={get('phone')} onChange={set('phone')} placeholder="+91-XXXXXXXXXX" />
            <Field label="WhatsApp (digits only)" value={get('whatsapp')} onChange={set('whatsapp')} placeholder="91XXXXXXXXXX" />
            <Field label="Email" value={get('email')} onChange={set('email')} />
            <Field label="Manager Name" value={get('managerName')} onChange={set('managerName')} />
            <Field label="Support Hours" value={get('supportHours')} onChange={set('supportHours')} />
            <Field label="Top Strip Text" value={get('topStripText')} onChange={set('topStripText')} />
          </div>
        </div>

        <div style={card}>
          <div style={sectionTitle}>Business Information</div>
          <div style={sectionHint}>Legal/company details shown in the footer and About section.</div>
          <div style={grid}>
            <Field label="Legal / Company Name" value={get('business.legalName')} onChange={set('business.legalName')} />
            <Field label="Founded Year" value={get('business.foundedYear')} onChange={set('business.foundedYear')} placeholder="2015" />
            <Field label="GSTIN" value={get('business.gstin')} onChange={set('business.gstin')} />
          </div>
          <div style={{ marginTop: 16 }}>
            <Field label="About / Company Description" value={get('business.about')} onChange={set('business.about')} textarea placeholder="Short description of your business…" />
          </div>
        </div>

        <div style={card}>
          <div style={sectionTitle}>Address</div>
          <div style={sectionHint}>Displayed on the homepage info section and footer.</div>
          <div style={grid}>
            <Field label="Address Line 1" value={get('address.line1')} onChange={set('address.line1')} />
            <Field label="Address Line 2" value={get('address.line2')} onChange={set('address.line2')} />
            <Field label="City" value={get('address.city')} onChange={set('address.city')} />
            <Field label="State" value={get('address.state')} onChange={set('address.state')} />
            <Field label="Country" value={get('address.country')} onChange={set('address.country')} />
            <Field label="Pincode" value={get('address.pincode')} onChange={set('address.pincode')} />
          </div>
          <div style={{ marginTop: 16 }}>
            <Field label="Google Maps Embed URL (optional)" value={get('address.mapUrl')} onChange={set('address.mapUrl')} placeholder="https://www.google.com/maps/embed?…" />
          </div>
        </div>

        <div style={card}>
          <div style={sectionTitle}>Social Media Links</div>
          <div style={sectionHint}>Leave blank to hide an icon. Use full profile URLs.</div>
          <div style={grid}>
            <Field label="Instagram URL" value={get('social.instagram')} onChange={set('social.instagram')} placeholder="https://instagram.com/…" />
            <Field label="Facebook URL" value={get('social.facebook')} onChange={set('social.facebook')} placeholder="https://facebook.com/…" />
            <Field label="LinkedIn URL" value={get('social.linkedin')} onChange={set('social.linkedin')} placeholder="https://linkedin.com/company/…" />
          </div>
        </div>

        <div style={card}>
          <div style={sectionTitle}>Hero Stat Cards</div>
          <div style={sectionHint}>The counter cards in the hero. Add as many as you want — each needs at least a number to show. Leave this empty to hide the cards entirely.</div>

          {heroStats.length === 0 && (
            <div style={{ padding: 18, border: '1.5px dashed #cbd5e1', borderRadius: 11, textAlign: 'center', color: '#94a3b8', fontSize: 13.5, marginBottom: 14 }}>
              No stat cards yet — the hero shows no counters. Add your own, or load the classic set to start from.
            </div>
          )}

          {heroStats.map((st, i) => (
            <div key={i} className="admin-stat-row" style={{ display: 'grid', gridTemplateColumns: '70px 1fr 2fr auto', gap: 10, alignItems: 'end', marginBottom: 12, padding: 12, background: '#fafbfc', border: '1.5px solid #e2e8f0', borderRadius: 11 }}>
              <div>
                <label style={lbl}>Icon</label>
                <input value={st.icon} onChange={e => updStat(i, 'icon', e.target.value)} placeholder="📚" style={{ ...inputStyle, textAlign: 'center' }} />
              </div>
              <div>
                <label style={lbl}>Number</label>
                <input value={st.number} onChange={e => updStat(i, 'number', e.target.value)} placeholder="50K+" style={inputStyle} />
              </div>
              <div>
                <label style={lbl}>Label</label>
                <input value={st.label} onChange={e => updStat(i, 'label', e.target.value)} placeholder="Assignments Delivered" style={inputStyle} />
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <button type="button" onClick={() => moveStat(i, -1)} disabled={i === 0} title="Move up" style={{ padding: '9px 11px', borderRadius: 8, border: '1.5px solid #e2e8f0', background: 'white', cursor: i === 0 ? 'not-allowed' : 'pointer', opacity: i === 0 ? 0.4 : 1 }}>▲</button>
                <button type="button" onClick={() => moveStat(i, 1)} disabled={i === heroStats.length - 1} title="Move down" style={{ padding: '9px 11px', borderRadius: 8, border: '1.5px solid #e2e8f0', background: 'white', cursor: i === heroStats.length - 1 ? 'not-allowed' : 'pointer', opacity: i === heroStats.length - 1 ? 0.4 : 1 }}>▼</button>
                <button type="button" onClick={() => removeStat(i)} title="Remove" style={{ padding: '9px 11px', borderRadius: 8, border: '1.5px solid #fecaca', background: 'white', color: '#dc2626', cursor: 'pointer' }}>✕</button>
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', gap: 10, marginTop: 6, flexWrap: 'wrap' }}>
            <button type="button" onClick={addStat} style={{ padding: '9px 16px', borderRadius: 9, fontSize: 13, fontWeight: 700, background: '#1a3a5c', color: 'white', border: 'none', cursor: 'pointer' }}>➕ Add stat card</button>
            {heroStats.length === 0 && (
              <button type="button" onClick={loadDefaultStats} style={{ padding: '9px 16px', borderRadius: 9, fontSize: 13, fontWeight: 700, background: 'white', color: '#1a3a5c', border: '1.5px solid #cbd5e1', cursor: 'pointer' }}>⬇️ Load classic 4 cards</button>
            )}
          </div>
        </div>

        <div style={card}>
          <div style={sectionTitle}>SEO & Social (SMO)</div>
          <div style={sectionHint}>Controls page titles, meta description, Open Graph and Twitter cards. These power the sitemap and robots files too.</div>
          <div style={{ display: 'grid', gap: 16 }}>
            <Field label="Meta Title" value={get('seo.metaTitle')} onChange={set('seo.metaTitle')} />
            <Field label="Meta Description" value={get('seo.metaDescription')} onChange={set('seo.metaDescription')} textarea />
            <Field label="Keywords (comma separated)" value={get('seo.keywords')} onChange={set('seo.keywords')} />
            <div style={grid}>
              <Field label="Site URL (canonical / sitemap)" value={get('seo.siteUrl')} onChange={set('seo.siteUrl')} placeholder="https://theassignmenthub.com" />
              <Field label="OG / Share Image URL" value={get('seo.ogImage')} onChange={set('seo.ogImage')} placeholder="https://…/og.png" />
              <Field label="Twitter Handle" value={get('seo.twitterHandle')} onChange={set('seo.twitterHandle')} placeholder="@yourhandle" />
            </div>
          </div>
        </div>

        <button onClick={save} disabled={saving} style={{ padding: '13px 26px', borderRadius: 10, fontSize: 15, fontWeight: 700, background: saving ? '#94a3b8' : '#1a3a5c', color: 'white', border: 'none', cursor: saving ? 'not-allowed' : 'pointer' }}>
          {saving ? '⏳ Saving…' : '💾 Save All Changes'}
        </button>
      </div>
    </div>
  );
}
