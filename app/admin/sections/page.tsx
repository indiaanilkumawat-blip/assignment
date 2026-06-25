'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '@/components/AdminNav';
import Link from 'next/link';
import { SectionData, CONTENT_DRIVEN } from '@/lib/defaults';

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0',
  borderRadius: 8, fontSize: 14, outline: 'none', background: '#fafbfc', fontFamily: 'inherit',
};
const lbl: React.CSSProperties = {
  display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b',
  marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em',
};
const numStyle: React.CSSProperties = { ...inputStyle, width: 90, textAlign: 'center' };

const CONTENT_LABEL: Record<string, string> = {
  service: 'Services', domain: 'Domains', step: 'How It Works steps',
  reason: 'Why-Choose-Us reasons', testimonial: 'Reviews', faq: 'FAQs',
};

export default function AdminSectionsPage() {
  const [sections, setSections] = useState<SectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const router = useRouter();

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/sections');
    if (res.status === 401) { router.push('/admin/login'); return; }
    const data = await res.json();
    setSections((data.sections || []).map((s: SectionData & { _id: string }) => ({ ...s })));
    setLoading(false);
  }, [router]);

  useEffect(() => { load(); }, [load]);

  const upd = (id: string, k: keyof SectionData, v: string | number | boolean) =>
    setSections((prev) => prev.map((s) => (s._id === id ? { ...s, [k]: v } : s)));

  const move = (index: number, dir: -1 | 1) => {
    setSections((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next.map((s, i) => ({ ...s, order: i + 1 }));
    });
  };

  const saveAll = async () => {
    setSaving(true); setMsg('');
    const payload = sections.map((s, i) => ({ ...s, order: i + 1 }));
    const res = await fetch('/api/admin/sections', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sections: payload }),
    });
    if (res.status === 401) { router.push('/admin/login'); return; }
    setSaving(false);
    if (res.ok) { setMsg('✅ Saved. Your homepage now reflects these settings.'); load(); }
    else setMsg('❌ Save failed. Please try again.');
  };

  const resetDefaults = async () => {
    if (!confirm('Reset every section back to the built-in defaults? Your custom headings, order and margins will be lost.')) return;
    const res = await fetch('/api/admin/sections', { method: 'POST' });
    if (res.status === 401) { router.push('/admin/login'); return; }
    setMsg('↩️ Sections reset to defaults.');
    load();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      <AdminNav active="sections" />
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '24px 18px 100px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1a3a5c' }}>Homepage Sections</h1>
            <p style={{ fontSize: 13, color: '#64748b', marginTop: 4, maxWidth: 560 }}>
              Control every block on your homepage: turn it on/off, reorder it with the arrows, rename its heading,
              and set the left/right margin in pixels. The actual cards (services, reviews, FAQs…) are managed in the{' '}
              <Link href="/admin/content" style={{ color: '#2563a8', fontWeight: 700 }}>Content</Link> tab.
            </p>
          </div>
          <button onClick={resetDefaults} style={{ padding: '9px 16px', borderRadius: 9, fontSize: 13, fontWeight: 700, background: 'white', color: '#dc2626', border: '1.5px solid #fecaca', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            ↩️ Reset to defaults
          </button>
        </div>

        {msg && <div style={{ margin: '14px 0', padding: '11px 15px', borderRadius: 10, fontSize: 13.5, fontWeight: 600, background: msg.startsWith('❌') ? '#fee2e2' : '#dcfce7', color: msg.startsWith('❌') ? '#dc2626' : '#15803d' }}>{msg}</div>}

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>Loading sections…</div>
        ) : (
          <>
            <div style={{ display: 'grid', gap: 14, marginTop: 18 }}>
              {sections.map((s, i) => {
                const contentType = CONTENT_DRIVEN[s.key];
                const dimmed = !s.enabled;
                return (
                  <div key={s._id} style={{
                    background: 'white', borderRadius: 16, border: '1.5px solid #e2e8f0',
                    overflow: 'hidden', opacity: dimmed ? 0.62 : 1, transition: 'opacity 0.15s',
                  }}>
                    {/* Header row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', background: '#f8fafc', borderBottom: '1px solid #eef2f7' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <button onClick={() => move(i, -1)} disabled={i === 0} title="Move up"
                          style={{ width: 26, height: 22, borderRadius: 6, border: '1px solid #e2e8f0', background: i === 0 ? '#f1f5f9' : 'white', cursor: i === 0 ? 'not-allowed' : 'pointer', fontSize: 11, color: '#475569', lineHeight: 1 }}>▲</button>
                        <button onClick={() => move(i, 1)} disabled={i === sections.length - 1} title="Move down"
                          style={{ width: 26, height: 22, borderRadius: 6, border: '1px solid #e2e8f0', background: i === sections.length - 1 ? '#f1f5f9' : 'white', cursor: i === sections.length - 1 ? 'not-allowed' : 'pointer', fontSize: 11, color: '#475569', lineHeight: 1 }}>▼</button>
                      </div>
                      <div style={{ width: 26, height: 26, borderRadius: 7, background: '#1a3a5c', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 800, fontSize: 15, color: '#1e293b' }}>{s.label || s.key}</div>
                        <div style={{ fontSize: 11.5, color: '#94a3b8', marginTop: 1 }}>
                          {contentType ? `Cards come from Content → ${CONTENT_LABEL[contentType]}` : 'Driven by Settings + the text below'}
                        </div>
                      </div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12.5, fontWeight: 700, color: s.enabled ? '#15803d' : '#94a3b8', cursor: 'pointer', flexShrink: 0 }}>
                        <input type="checkbox" checked={s.enabled} onChange={(e) => upd(s._id!, 'enabled', e.target.checked)} style={{ width: 17, height: 17 }} />
                        {s.enabled ? 'Visible' : 'Hidden'}
                      </label>
                    </div>

                    {/* Body */}
                    <div style={{ padding: '16px', display: 'grid', gap: 14 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                        {s.key !== 'business-info' && (
                          <div>
                            <label style={lbl}>{s.key === 'domains' ? 'Prefix Label' : 'Tag (small pill)'}</label>
                            <input value={s.tag} onChange={(e) => upd(s._id!, 'tag', e.target.value)} placeholder="e.g. Our Services" style={inputStyle} />
                          </div>
                        )}
                        {s.key !== 'domains' && (
                          <div>
                            <label style={lbl}>Heading {s.key === 'hero' ? '(use | for gold text)' : ''}</label>
                            <input value={s.heading} onChange={(e) => upd(s._id!, 'heading', e.target.value)} placeholder="Section title" style={inputStyle} />
                          </div>
                        )}
                      </div>

                      {s.key !== 'domains' && (
                        <div>
                          <label style={lbl}>Subheading / Intro paragraph</label>
                          <textarea value={s.subheading} onChange={(e) => upd(s._id!, 'subheading', e.target.value)} rows={2} placeholder="Optional supporting text" style={{ ...inputStyle, resize: 'vertical' }} />
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'flex-end', borderTop: '1px dashed #e2e8f0', paddingTop: 14 }}>
                        <div>
                          <label style={lbl}>Margin Left (px)</label>
                          <input type="number" min={0} value={s.marginLeft} onChange={(e) => upd(s._id!, 'marginLeft', Number(e.target.value))} style={numStyle} />
                        </div>
                        <div>
                          <label style={lbl}>Margin Right (px)</label>
                          <input type="number" min={0} value={s.marginRight} onChange={(e) => upd(s._id!, 'marginRight', Number(e.target.value))} style={numStyle} />
                        </div>
                        <div>
                          <label style={lbl}>Max Width (px)</label>
                          <input type="number" min={320} value={s.maxWidth} onChange={(e) => upd(s._id!, 'maxWidth', Number(e.target.value))} style={numStyle} />
                        </div>
                        {/* Mini visual margin preview */}
                        <div style={{ flex: 1, minWidth: 140 }}>
                          <label style={lbl}>Preview</label>
                          <div style={{ height: 30, borderRadius: 7, background: '#eef2f7', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'stretch', overflow: 'hidden' }}>
                            <div style={{ width: Math.min(s.marginLeft, 60), background: 'repeating-linear-gradient(45deg,#cbd5e1,#cbd5e1 4px,#e2e8f0 4px,#e2e8f0 8px)' }} />
                            <div style={{ flex: 1, background: '#1a3a5c', opacity: 0.85 }} />
                            <div style={{ width: Math.min(s.marginRight, 60), background: 'repeating-linear-gradient(45deg,#cbd5e1,#cbd5e1 4px,#e2e8f0 4px,#e2e8f0 8px)' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sticky save bar */}
            <div style={{ position: 'sticky', bottom: 0, marginTop: 22, padding: '14px 16px', background: 'white', borderRadius: 14, border: '1.5px solid #e2e8f0', boxShadow: '0 -4px 20px rgba(15,33,55,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>Changes apply to the live homepage immediately after saving.</span>
              <button onClick={saveAll} disabled={saving} style={{ padding: '11px 26px', borderRadius: 10, fontSize: 14.5, fontWeight: 800, background: saving ? '#94a3b8' : '#1a3a5c', color: 'white', border: 'none', cursor: saving ? 'not-allowed' : 'pointer' }}>
                {saving ? '⏳ Saving…' : '💾 Save Changes'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
