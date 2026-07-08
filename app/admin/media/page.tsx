'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '@/components/AdminNav';

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0',
  borderRadius: 8, fontSize: 14, outline: 'none', background: '#fafbfc', fontFamily: 'inherit',
};
const lbl: React.CSSProperties = {
  display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b',
  marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em',
};
const numStyle: React.CSSProperties = { ...inputStyle, width: 110, textAlign: 'center' };
const card: React.CSSProperties = {
  background: 'white', borderRadius: 14, padding: 22,
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)', marginBottom: 18,
};

type GifSection = {
  _id: string;
  enabled: boolean;
  tag: string; heading: string; subheading: string;
  maxWidth: number; mediaHeight: number;
  mediaUrl: string; mediaPublicId: string;
};

const MAX_GIF_MB = 20; // client-side sanity cap (Cloudinary free tier allows 10 MB images; adjust to plan)

export default function AdminMediaPage() {
  const [sec, setSec] = useState<GifSection | null>(null);
  const [cloudReady, setCloudReady] = useState(true);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/media');
    if (res.status === 401) { router.push('/admin/login'); return; }
    const data = await res.json();
    setSec(data.section || null);
    setCloudReady(!!data.cloudinaryConfigured);
    setLoading(false);
  }, [router]);

  useEffect(() => { load(); }, [load]);

  const upd = (k: keyof GifSection, v: string | number | boolean) =>
    setSec((prev) => (prev ? { ...prev, [k]: v } : prev));

  /** Upload straight to Cloudinary with a server-issued signature. */
  const handleUpload = async (file: File) => {
    setMsg('');
    if (!file.type.startsWith('image/')) { setMsg('❌ Please choose an image/GIF file.'); return; }
    if (file.size > MAX_GIF_MB * 1024 * 1024) { setMsg(`❌ File is larger than ${MAX_GIF_MB} MB. Compress the GIF and try again.`); return; }

    setUploading(true); setProgress(0);
    try {
      // 1. Get one-time signature from our server (secret never leaves the server).
      const signRes = await fetch('/api/admin/media', { method: 'POST' });
      if (signRes.status === 401) { router.push('/admin/login'); return; }
      const sign = await signRes.json();
      if (!signRes.ok) { setMsg(`❌ ${sign.error || 'Could not prepare upload.'}`); setUploading(false); return; }

      // 2. Upload DIRECTLY to Cloudinary (XHR for progress events).
      const form = new FormData();
      form.append('file', file);
      form.append('api_key', sign.apiKey);
      form.append('timestamp', String(sign.timestamp));
      form.append('folder', sign.folder);
      form.append('signature', sign.signature);

      const result: { secure_url: string; public_id: string } = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', sign.uploadUrl);
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
        };
        xhr.onload = () => {
          try {
            const json = JSON.parse(xhr.responseText);
            if (xhr.status >= 200 && xhr.status < 300 && json.secure_url) resolve(json);
            else reject(new Error(json?.error?.message || `Cloudinary upload failed (${xhr.status})`));
          } catch { reject(new Error('Cloudinary returned an unreadable response.')); }
        };
        xhr.onerror = () => reject(new Error('Network error while uploading to Cloudinary.'));
        xhr.send(form);
      });

      // 3. Save the resulting URL to the database.
      const saveRes = await fetch('/api/admin/media', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediaUrl: result.secure_url, mediaPublicId: result.public_id }),
      });
      if (saveRes.ok) { setMsg('✅ GIF uploaded and live on the website.'); load(); }
      else setMsg('⚠️ Uploaded to Cloudinary but saving to the site failed. Try Save again.');
    } catch (err) {
      setMsg(`❌ ${err instanceof Error ? err.message : 'Upload failed.'}`);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const saveSettings = async () => {
    if (!sec) return;
    setSaving(true); setMsg('');
    const res = await fetch('/api/admin/media', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        enabled: sec.enabled, tag: sec.tag, heading: sec.heading, subheading: sec.subheading,
        mediaHeight: Number(sec.mediaHeight) || 380, maxWidth: Number(sec.maxWidth) || 1100,
      }),
    });
    if (res.status === 401) { router.push('/admin/login'); return; }
    setSaving(false);
    setMsg(res.ok ? '✅ Settings saved.' : '❌ Save failed. Please try again.');
  };

  const removeGif = async () => {
    if (!confirm('Remove the GIF from the website? The section will hide until you upload a new one.')) return;
    const res = await fetch('/api/admin/media', { method: 'DELETE' });
    if (res.status === 401) { router.push('/admin/login'); return; }
    setMsg(res.ok ? '🗑️ GIF removed.' : '❌ Remove failed.');
    load();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      <AdminNav active="media" />
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '24px 18px 100px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>🎞️ GIF Banner</h1>
        <p style={{ fontSize: 13, color: '#64748b', marginBottom: 18 }}>
          Upload an animated GIF that plays in its own section on the homepage. You control the section&apos;s
          height, width, position (order it from the Sections tab) and visibility.
        </p>

        {msg && (
          <div style={{ padding: '10px 14px', borderRadius: 10, background: 'white', border: '1px solid #e2e8f0', fontSize: 13.5, marginBottom: 14 }}>{msg}</div>
        )}

        {!cloudReady && !loading && (
          <div style={{ ...card, borderLeft: '4px solid #f59e0b', background: '#fffbeb' }}>
            <strong style={{ fontSize: 14 }}>⚠️ Cloudinary not configured.</strong>
            <p style={{ fontSize: 13, color: '#78350f', marginTop: 6 }}>
              Add these environment variables (Vercel → Settings → Environment Variables), then redeploy:
              <code style={{ display: 'block', marginTop: 8, background: '#fef3c7', padding: 10, borderRadius: 8, fontSize: 12.5 }}>
                CLOUDINARY_CLOUD_NAME=…<br />CLOUDINARY_API_KEY=…<br />CLOUDINARY_API_SECRET=…
              </code>
            </p>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>Loading…</div>
        ) : sec && (
          <>
            {/* ── Upload / preview ── */}
            <div style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
                <strong style={{ fontSize: 15 }}>Current GIF</strong>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading || !cloudReady}
                    style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: uploading ? '#94a3b8' : '#2563a8', color: 'white', fontWeight: 700, fontSize: 13, cursor: uploading ? 'default' : 'pointer' }}
                  >
                    {uploading ? `Uploading… ${progress}%` : sec.mediaUrl ? '🔁 Replace GIF' : '⬆️ Upload GIF'}
                  </button>
                  {sec.mediaUrl && (
                    <button onClick={removeGif} disabled={uploading}
                      style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #fecaca', background: '#fef2f2', color: '#b91c1c', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                      🗑️ Remove
                    </button>
                  )}
                </div>
              </div>

              <input ref={fileRef} type="file" accept="image/gif,image/webp,image/png,image/jpeg" hidden
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} />

              {uploading && (
                <div style={{ height: 8, background: '#e2e8f0', borderRadius: 4, overflow: 'hidden', marginBottom: 14 }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: '#2563a8', transition: 'width 0.15s' }} />
                </div>
              )}

              {sec.mediaUrl ? (
                <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #e2e8f0', maxWidth: '100%', background: 'linear-gradient(150deg, #0f2137 0%, #1a3a5c 55%, #1e4a7a 100%)', padding: 24 }}>
                  <div style={{ borderRadius: 14, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={sec.mediaUrl} alt="GIF banner preview"
                      style={{ display: 'block', width: '100%', height: Math.min(sec.mediaHeight, 420), objectFit: 'cover' }} />
                  </div>
                  <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.55)', fontSize: 11.5, marginTop: 12 }}>
                    Preview on the site&apos;s dark theme (matches the hero section)
                  </p>
                </div>
              ) : (
                <div style={{ border: '2px dashed #cbd5e1', borderRadius: 12, padding: '48px 20px', textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
                  No GIF uploaded yet. Click <strong>Upload GIF</strong> (max {MAX_GIF_MB} MB — smaller loads faster for visitors).
                </div>
              )}
            </div>

            {/* ── Display settings ── */}
            <div style={card}>
              <strong style={{ fontSize: 15, display: 'block', marginBottom: 14 }}>Display Settings</strong>

              <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginBottom: 16 }}>
                <div>
                  <label style={lbl}>Height (px)</label>
                  <input type="number" min={100} max={1200} value={sec.mediaHeight} style={numStyle}
                    onChange={(e) => upd('mediaHeight', Number(e.target.value))} />
                </div>
                <div>
                  <label style={lbl}>Max Width (px)</label>
                  <input type="number" min={300} max={1920} value={sec.maxWidth} style={numStyle}
                    onChange={(e) => upd('maxWidth', Number(e.target.value))} />
                </div>
                <div>
                  <label style={lbl}>Visible on site</label>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, cursor: 'pointer', paddingTop: 8 }}>
                    <input type="checkbox" checked={sec.enabled} onChange={(e) => upd('enabled', e.target.checked)} />
                    {sec.enabled ? 'Shown' : 'Hidden'}
                  </label>
                </div>
              </div>

              <div style={{ display: 'grid', gap: 12 }}>
                <div>
                  <label style={lbl}>Tag (small pill above heading — optional)</label>
                  <input value={sec.tag} style={inputStyle} placeholder="e.g. Watch"
                    onChange={(e) => upd('tag', e.target.value)} />
                </div>
                <div>
                  <label style={lbl}>Heading (optional)</label>
                  <input value={sec.heading} style={inputStyle} placeholder="e.g. See Us In Action"
                    onChange={(e) => upd('heading', e.target.value)} />
                </div>
                <div>
                  <label style={lbl}>Subheading (optional)</label>
                  <input value={sec.subheading} style={inputStyle} placeholder="Short supporting line"
                    onChange={(e) => upd('subheading', e.target.value)} />
                </div>
              </div>

              <button onClick={saveSettings} disabled={saving}
                style={{ marginTop: 18, padding: '10px 26px', borderRadius: 9, border: 'none', background: saving ? '#94a3b8' : '#16a34a', color: 'white', fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>
                {saving ? 'Saving…' : '💾 Save Settings'}
              </button>
              <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 10 }}>
                Tip: change where this section appears on the homepage from the <strong>Sections</strong> tab (drag order / margins).
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
