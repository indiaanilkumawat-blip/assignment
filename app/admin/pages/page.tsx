'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '@/components/AdminNav';

interface PageDoc {
  _id: string;
  slug: string;
  title: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  published: boolean;
  showInFooter: boolean;
  order: number;
  updatedAt?: string;
}

const blank = {
  _id: '', slug: '', title: '', content: '', metaTitle: '', metaDescription: '',
  ogImage: '', published: true, showInFooter: true, order: 0,
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 13px', border: '1.5px solid #e2e8f0',
  borderRadius: 9, fontSize: 14, outline: 'none', background: '#fafbfc', fontFamily: 'inherit',
};
const lbl: React.CSSProperties = {
  display: 'block', fontSize: 12, fontWeight: 700, color: '#475569',
  marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em',
};

export default function AdminPagesPage() {
  const [pages, setPages] = useState<PageDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<typeof blank | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const router = useRouter();

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/pages');
    if (res.status === 401) { router.push('/admin/login'); return; }
    const data = await res.json();
    setPages(data.pages || []);
    setLoading(false);
  }, [router]);

  useEffect(() => { load(); }, [load]);

  const startNew = () => { setEditing({ ...blank }); setIsNew(true); setErr(''); };
  const startEdit = (p: PageDoc) => { setEditing({ ...p }); setIsNew(false); setErr(''); };
  const cancel = () => { setEditing(null); setErr(''); };

  const upd = (k: keyof typeof blank, v: string | number | boolean) =>
    setEditing(prev => prev ? { ...prev, [k]: v } : prev);

  const save = async () => {
    if (!editing) return;
    if (!editing.title.trim()) { setErr('Title is required.'); return; }
    setSaving(true); setErr('');

    const res = isNew
      ? await fetch('/api/admin/pages', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing),
        })
      : await fetch(`/api/admin/pages/${editing._id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing),
        });

    if (res.status === 401) { router.push('/admin/login'); return; }
    const data = await res.json();
    setSaving(false);
    if (!res.ok) { setErr(data.error || 'Failed to save.'); return; }
    setEditing(null);
    load();
  };

  const remove = async (p: PageDoc) => {
    if (!confirm(`Delete page "${p.title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/pages/${p._id}`, { method: 'DELETE' });
    if (res.status === 401) { router.push('/admin/login'); return; }
    load();
  };

  const seedDefaults = async () => {
    if (!confirm('Create the default Terms & Conditions and Privacy Policy pages? Existing pages with the same URL will be left untouched.')) return;
    const res = await fetch('/api/admin/seed', { method: 'POST' });
    if (res.status === 401) { router.push('/admin/login'); return; }
    const data = await res.json();
    alert(res.ok ? (data.message || 'Done.') : (data.error || 'Failed.'));
    load();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      <AdminNav active="pages" />
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 18px 80px' }}>

        {!editing ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1a3a5c' }}>Pages</h1>
                <p style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>Create and edit content pages like Terms &amp; Conditions, Privacy Policy, About, etc.</p>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={seedDefaults} style={{ padding: '11px 18px', borderRadius: 10, fontSize: 14, fontWeight: 700, background: 'white', color: '#1a3a5c', border: '1.5px solid #1a3a5c', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  ⚡ Seed Terms &amp; Privacy
                </button>
                <button onClick={startNew} style={{ padding: '11px 20px', borderRadius: 10, fontSize: 14, fontWeight: 700, background: '#1a3a5c', color: 'white', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  ＋ New Page
                </button>
              </div>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: 48, color: '#94a3b8' }}>Loading pages…</div>
            ) : pages.length === 0 ? (
              <div style={{ background: 'white', borderRadius: 16, padding: 48, textAlign: 'center', border: '1.5px solid #e2e8f0' }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>📄</div>
                <div style={{ color: '#64748b', fontSize: 15, fontWeight: 600 }}>No pages yet</div>
                <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>Click “New Page” to create your first one.</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: 12 }}>
                {pages.map(p => (
                  <div key={p._id} style={{ background: 'white', borderRadius: 14, padding: '16px 20px', border: '1.5px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, fontSize: 15, color: '#1e293b' }}>{p.title}</span>
                        {!p.published && <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: '#fee2e2', color: '#dc2626', textTransform: 'uppercase' }}>Draft</span>}
                        {p.showInFooter && p.published && <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: '#dbeafe', color: '#1d4ed8', textTransform: 'uppercase' }}>In Footer</span>}
                      </div>
                      <div style={{ fontSize: 12.5, color: '#94a3b8', marginTop: 3 }}>/{p.slug}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <a href={`/${p.slug}`} target="_blank" rel="noopener noreferrer" style={{ padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: '#f1f5f9', color: '#475569', textDecoration: 'none' }}>↗ View</a>
                      <button onClick={() => startEdit(p)} style={{ padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: '#1a3a5c', color: 'white', border: 'none', cursor: 'pointer' }}>✏️ Edit</button>
                      <button onClick={() => remove(p)} style={{ padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: '#fee2e2', color: '#dc2626', border: 'none', cursor: 'pointer' }}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1a3a5c' }}>{isNew ? 'New Page' : `Edit: ${editing.title}`}</h1>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={cancel} style={{ padding: '10px 18px', borderRadius: 10, fontSize: 14, fontWeight: 600, background: '#e2e8f0', color: '#475569', border: 'none', cursor: 'pointer' }}>Cancel</button>
                <button onClick={save} disabled={saving} style={{ padding: '10px 20px', borderRadius: 10, fontSize: 14, fontWeight: 700, background: saving ? '#94a3b8' : '#1a3a5c', color: 'white', border: 'none', cursor: saving ? 'not-allowed' : 'pointer' }}>
                  {saving ? '⏳ Saving…' : '💾 Save Page'}
                </button>
              </div>
            </div>

            {err && <div style={{ marginBottom: 16, padding: '12px 16px', borderRadius: 10, fontSize: 14, fontWeight: 600, background: '#fee2e2', color: '#dc2626' }}>❌ {err}</div>}

            <div style={{ background: 'white', borderRadius: 16, padding: 24, border: '1.5px solid #e2e8f0', marginBottom: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={lbl}>Title *</label>
                  <input value={editing.title} onChange={e => upd('title', e.target.value)} placeholder="e.g. Terms & Conditions" style={inputStyle} />
                </div>
                <div>
                  <label style={lbl}>Slug (URL) {isNew ? '' : '— locked'}</label>
                  <input value={editing.slug} onChange={e => upd('slug', e.target.value)} disabled={!isNew} placeholder="auto from title" style={{ ...inputStyle, opacity: isNew ? 1 : 0.6 }} />
                </div>
              </div>

              <label style={lbl}>Content (HTML)</label>
              <textarea
                value={editing.content}
                onChange={e => upd('content', e.target.value)}
                rows={16}
                placeholder="<h2>Section heading</h2>&#10;<p>Paragraph text…</p>&#10;<ul><li>List item</li></ul>"
                style={{ ...inputStyle, resize: 'vertical', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 13, lineHeight: 1.6 }}
              />
              <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 8 }}>
                Supports HTML: &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;/&lt;li&gt;, &lt;a&gt;, &lt;strong&gt;, &lt;table&gt;. Styling is applied automatically.
              </p>

              <div style={{ display: 'flex', gap: 24, marginTop: 18, flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  <input type="checkbox" checked={editing.published} onChange={e => upd('published', e.target.checked)} style={{ width: 16, height: 16 }} />
                  Published (visible on site)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  <input type="checkbox" checked={editing.showInFooter} onChange={e => upd('showInFooter', e.target.checked)} style={{ width: 16, height: 16 }} />
                  Show link in footer
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <label style={{ fontSize: 14, fontWeight: 600, color: '#475569' }}>Order</label>
                  <input type="number" value={editing.order} onChange={e => upd('order', Number(e.target.value))} style={{ ...inputStyle, width: 80, padding: '7px 10px' }} />
                </div>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: 16, padding: 24, border: '1.5px solid #e2e8f0' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#1a3a5c', marginBottom: 4 }}>Page SEO (optional)</div>
              <div style={{ fontSize: 12.5, color: '#94a3b8', marginBottom: 18 }}>Overrides the site defaults for this page only. Leave blank to inherit.</div>
              <div style={{ display: 'grid', gap: 16 }}>
                <div>
                  <label style={lbl}>Meta Title</label>
                  <input value={editing.metaTitle} onChange={e => upd('metaTitle', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={lbl}>Meta Description</label>
                  <textarea value={editing.metaDescription} onChange={e => upd('metaDescription', e.target.value)} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
                <div>
                  <label style={lbl}>OG / Share Image URL</label>
                  <input value={editing.ogImage} onChange={e => upd('ogImage', e.target.value)} placeholder="https://…/image.png" style={inputStyle} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
