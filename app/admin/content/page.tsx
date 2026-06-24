'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '@/components/AdminNav';

type ContentType = 'service' | 'faq' | 'testimonial' | 'step' | 'reason' | 'domain';

interface Item {
  _id: string;
  type: ContentType;
  order: number;
  title: string;
  subtitle: string;
  body: string;
  icon: string;
  rating: number;
  published: boolean;
}

const TYPES: { key: ContentType; label: string; hint: string }[] = [
  { key: 'service', label: 'Services', hint: 'Service cards (icon + title + description).' },
  { key: 'domain', label: 'Domains', hint: 'Subject areas / domains covered (icon + title).' },
  { key: 'step', label: 'How It Works', hint: 'Process steps (icon + title + description).' },
  { key: 'reason', label: 'Why Choose Us', hint: 'Reasons / USPs (icon + title + description).' },
  { key: 'testimonial', label: 'Testimonials', hint: 'Student reviews (name=title, role=subtitle, review=body, rating).' },
  { key: 'faq', label: 'FAQs', hint: 'Questions (title) and answers (body).' },
];

const blank = (type: ContentType): Omit<Item, '_id'> => ({
  type, order: 0, title: '', subtitle: '', body: '', icon: '', rating: 5, published: true,
});

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 13px', border: '1.5px solid #e2e8f0',
  borderRadius: 9, fontSize: 14, outline: 'none', background: '#fafbfc', fontFamily: 'inherit',
};
const lbl: React.CSSProperties = {
  display: 'block', fontSize: 12, fontWeight: 700, color: '#475569',
  marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em',
};

export default function AdminContentPage() {
  const [type, setType] = useState<ContentType>('service');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<(Omit<Item, '_id'> & { _id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const meta = TYPES.find(t => t.key === type)!;

  const load = useCallback(async (t: ContentType) => {
    setLoading(true);
    const res = await fetch(`/api/admin/content?type=${t}`);
    if (res.status === 401) { router.push('/admin/login'); return; }
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }, [router]);

  useEffect(() => { load(type); setEditing(null); }, [type, load]);

  const upd = (k: keyof Item, v: string | number | boolean) =>
    setEditing(prev => prev ? { ...prev, [k]: v } : prev);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const isNew = !editing._id;
    const res = isNew
      ? await fetch('/api/admin/content', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing),
        })
      : await fetch('/api/admin/content', {
          method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing._id, ...editing }),
        });
    if (res.status === 401) { router.push('/admin/login'); return; }
    setSaving(false);
    if (res.ok) { setEditing(null); load(type); }
  };

  const remove = async (it: Item) => {
    if (!confirm(`Delete "${it.title || 'this item'}"?`)) return;
    const res = await fetch('/api/admin/content', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: it._id }),
    });
    if (res.status === 401) { router.push('/admin/login'); return; }
    load(type);
  };

  const showRating = type === 'testimonial';
  const showSubtitle = type === 'testimonial' || type === 'step';
  const showBody = type !== 'domain';
  const bodyLabel = type === 'faq' ? 'Answer' : type === 'testimonial' ? 'Review Text' : 'Description';
  const titleLabel = type === 'faq' ? 'Question' : type === 'testimonial' ? 'Student Name' : 'Title';
  const subtitleLabel = type === 'testimonial' ? 'Role / Course' : 'Accent Label';

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      <AdminNav active="content" />
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 18px 80px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1a3a5c', marginBottom: 4 }}>Site Content</h1>
        <p style={{ fontSize: 13, color: '#64748b', marginBottom: 18 }}>Manage the content blocks shown on the homepage. Empty sections fall back to built-in defaults.</p>

        {/* Type tabs */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 22 }}>
          {TYPES.map(t => (
            <button key={t.key} onClick={() => setType(t.key)} style={{
              padding: '8px 16px', borderRadius: 9, fontSize: 13.5, fontWeight: 700, cursor: 'pointer',
              border: '1.5px solid', borderColor: type === t.key ? '#1a3a5c' : '#e2e8f0',
              background: type === t.key ? '#1a3a5c' : 'white', color: type === t.key ? 'white' : '#475569',
            }}>{t.label}</button>
          ))}
        </div>

        {editing ? (
          <div style={{ background: 'white', borderRadius: 16, padding: 24, border: '1.5px solid #e2e8f0' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#1a3a5c', marginBottom: 18 }}>
              {editing._id ? 'Edit' : 'Add'} {meta.label.replace(/s$/, '')}
            </div>
            <div style={{ display: 'grid', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
                <div>
                  <label style={lbl}>Icon (emoji)</label>
                  <input value={editing.icon} onChange={e => upd('icon', e.target.value)} placeholder="📝" style={inputStyle} />
                </div>
                <div>
                  <label style={lbl}>Order</label>
                  <input type="number" value={editing.order} onChange={e => upd('order', Number(e.target.value))} style={inputStyle} />
                </div>
                {showRating && (
                  <div>
                    <label style={lbl}>Rating (1–5)</label>
                    <input type="number" min={1} max={5} value={editing.rating} onChange={e => upd('rating', Number(e.target.value))} style={inputStyle} />
                  </div>
                )}
              </div>
              <div>
                <label style={lbl}>{titleLabel}</label>
                <input value={editing.title} onChange={e => upd('title', e.target.value)} style={inputStyle} />
              </div>
              {showSubtitle && (
                <div>
                  <label style={lbl}>{subtitleLabel}</label>
                  <input value={editing.subtitle} onChange={e => upd('subtitle', e.target.value)} style={inputStyle} />
                </div>
              )}
              {showBody && (
                <div>
                  <label style={lbl}>{bodyLabel}</label>
                  <textarea value={editing.body} onChange={e => upd('body', e.target.value)} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
              )}
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                <input type="checkbox" checked={editing.published} onChange={e => upd('published', e.target.checked)} style={{ width: 16, height: 16 }} />
                Published
              </label>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button onClick={() => setEditing(null)} style={{ padding: '10px 18px', borderRadius: 10, fontSize: 14, fontWeight: 600, background: '#e2e8f0', color: '#475569', border: 'none', cursor: 'pointer' }}>Cancel</button>
              <button onClick={save} disabled={saving} style={{ padding: '10px 20px', borderRadius: 10, fontSize: 14, fontWeight: 700, background: saving ? '#94a3b8' : '#1a3a5c', color: 'white', border: 'none', cursor: saving ? 'not-allowed' : 'pointer' }}>
                {saving ? '⏳ Saving…' : '💾 Save'}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, gap: 12, flexWrap: 'wrap' }}>
              <p style={{ fontSize: 13, color: '#94a3b8' }}>{meta.hint}</p>
              <button onClick={() => setEditing(blank(type))} style={{ padding: '9px 18px', borderRadius: 10, fontSize: 14, fontWeight: 700, background: '#1a3a5c', color: 'white', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                ＋ Add {meta.label.replace(/s$/, '')}
              </button>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: 48, color: '#94a3b8' }}>Loading…</div>
            ) : items.length === 0 ? (
              <div style={{ background: 'white', borderRadius: 16, padding: 40, textAlign: 'center', border: '1.5px solid #e2e8f0' }}>
                <div style={{ color: '#64748b', fontSize: 14, fontWeight: 600 }}>No custom {meta.label.toLowerCase()} yet</div>
                <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>The site is showing built-in defaults. Add items here to override them.</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: 10 }}>
                {items.map(it => (
                  <div key={it._id} style={{ background: 'white', borderRadius: 14, padding: '14px 18px', border: '1.5px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{ fontSize: 24, width: 32, textAlign: 'center', flexShrink: 0 }}>{it.icon || '•'}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, fontSize: 14.5, color: '#1e293b' }}>{it.title || '(untitled)'}</span>
                        {showRating && <span style={{ fontSize: 12, color: '#e8a020' }}>{'★'.repeat(it.rating)}</span>}
                        {!it.published && <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: '#fee2e2', color: '#dc2626', textTransform: 'uppercase' }}>Draft</span>}
                      </div>
                      {(it.subtitle || it.body) && (
                        <div style={{ fontSize: 12.5, color: '#94a3b8', marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {it.subtitle ? `${it.subtitle} — ` : ''}{it.body}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                      <button onClick={() => setEditing(it)} style={{ padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: '#1a3a5c', color: 'white', border: 'none', cursor: 'pointer' }}>✏️ Edit</button>
                      <button onClick={() => remove(it)} style={{ padding: '7px 12px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: '#fee2e2', color: '#dc2626', border: 'none', cursor: 'pointer' }}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
