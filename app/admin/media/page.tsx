'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '@/components/AdminNav';

const card: React.CSSProperties = {
  background: 'white', borderRadius: 14, padding: 22,
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)', marginBottom: 18,
};
const lbl: React.CSSProperties = {
  display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b',
  marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em',
};

type GifSection = {
  _id: string;
  enabled: boolean;
  mediaOverlay: number;
  mediaPosition: string;
  mediaUrl: string;
  mediaPublicId: string;
};

const MAX_GIF_MB = 20;

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

  const handleUpload = async (file: File) => {
    setMsg('');
    if (!file.type.startsWith('image/')) { setMsg('Please choose an image/GIF file.'); return; }
    if (file.size > MAX_GIF_MB * 1024 * 1024) { setMsg(`File is larger than ${MAX_GIF_MB} MB. Compress the GIF and try again.`); return; }

    setUploading(true); setProgress(0);
    try {
      const signRes = await fetch('/api/admin/media', { method: 'POST' });
      if (signRes.status === 401) { router.push('/admin/login'); return; }
      const sign = await signRes.json();
      if (!signRes.ok) { setMsg(sign.error || 'Could not prepare upload.'); setUploading(false); return; }

      const form = new FormData();
      form.append('file', file);
      form.append('api_key', sign.apiKey);
      form.append('timestamp', String(sign.timestamp));
      form.append('folder', sign.folder);
      form.append('signature', sign.signature);

      const result: { secure_url: string; public_id: string } = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', sign.uploadUrl);
        xhr.upload.onprogress = (e) => { if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100)); };
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

      const saveRes = await fetch('/api/admin/media', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediaUrl: result.secure_url, mediaPublicId: result.public_id }),
      });
      if (saveRes.ok) { setMsg('GIF uploaded — it is now the hero background.'); load(); }
      else setMsg('Uploaded to Cloudinary but saving to the site failed. Try Save again.');
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Upload failed.');
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
      body: JSON.stringify({ enabled: sec.enabled, mediaOverlay: Number(sec.mediaOverlay), mediaPosition: sec.mediaPosition || 'center' }),
    });
    if (res.status === 401) { router.push('/admin/login'); return; }
    setSaving(false);
    setMsg(res.ok ? 'Settings saved.' : 'Save failed. Please try again.');
  };

  const removeGif = async () => {
    if (!confirm('Remove the GIF? The hero will go back to the plain navy gradient background.')) return;
    const res = await fetch('/api/admin/media', { method: 'DELETE' });
    if (res.status === 401) { router.push('/admin/login'); return; }
    setMsg(res.ok ? 'GIF removed. Hero is back to the gradient background.' : 'Remove failed.');
    load();
  };

  const ov = sec ? Math.max(0, Math.min(90, sec.mediaOverlay)) / 100 : 0.55;

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      <AdminNav active="media" />
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '24px 18px 100px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>Hero Background GIF</h1>
        <p style={{ fontSize: 13, color: '#64748b', marginBottom: 18 }}>
          Upload an animated GIF to play as the <strong>background of the hero section</strong> (behind the headline,
          buttons and stats). A dark overlay keeps the text readable — adjust its strength below.
        </p>

        {msg && (
          <div style={{ padding: '10px 14px', borderRadius: 10, background: 'white', border: '1px solid #e2e8f0', fontSize: 13.5, marginBottom: 14 }}>{msg}</div>
        )}

        {!cloudReady && !loading && (
          <div style={{ ...card, borderLeft: '4px solid #f59e0b', background: '#fffbeb' }}>
            <strong style={{ fontSize: 14 }}>Cloudinary not configured.</strong>
            <p style={{ fontSize: 13, color: '#78350f', marginTop: 6 }}>
              Add these environment variables (Vercel &rarr; Settings &rarr; Environment Variables), then redeploy:
              <code style={{ display: 'block', marginTop: 8, background: '#fef3c7', padding: 10, borderRadius: 8, fontSize: 12.5 }}>
                CLOUDINARY_CLOUD_NAME=&hellip;<br />CLOUDINARY_API_KEY=&hellip;<br />CLOUDINARY_API_SECRET=&hellip;
              </code>
            </p>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>Loading&hellip;</div>
        ) : sec && (
          <>
            <div style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
                <strong style={{ fontSize: 15 }}>Hero preview</strong>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => fileRef.current?.click()} disabled={uploading || !cloudReady}
                    style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: uploading ? '#94a3b8' : '#2563a8', color: 'white', fontWeight: 700, fontSize: 13, cursor: uploading ? 'default' : 'pointer' }}>
                    {uploading ? `Uploading… ${progress}%` : sec.mediaUrl ? 'Replace GIF' : 'Upload GIF'}
                  </button>
                  {sec.mediaUrl && (
                    <button onClick={removeGif} disabled={uploading}
                      style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #fecaca', background: '#fef2f2', color: '#b91c1c', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                      Remove
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

              <div style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', height: 260, border: '1px solid #e2e8f0',
                background: 'linear-gradient(150deg, #0f2137 0%, #1a3a5c 55%, #1e4a7a 100%)' }}>
                {sec.mediaUrl && (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={sec.mediaUrl} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: sec.mediaPosition || 'center' }} />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(150deg, rgba(15,33,55,${ov + 0.15}), rgba(30,74,122,${ov}))` }} />
                  </>
                )}
                <div style={{ position: 'relative', padding: '30px 26px', zIndex: 2 }}>
                  <div style={{ display: 'inline-block', padding: '5px 12px', borderRadius: 999, background: 'rgba(232,160,32,0.15)', border: '1px solid rgba(232,160,32,0.35)', color: '#fbbf24', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
                    Most Trusted Academic Assistance
                  </div>
                  <div style={{ fontSize: 30, fontWeight: 800, color: 'white', lineHeight: 1.1, fontFamily: 'serif' }}>
                    100% AI-Free &amp;<br />Plagiarism-Free
                  </div>
                  <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
                    <span style={{ padding: '7px 14px', borderRadius: 8, background: '#e8a020', color: '#0f2137', fontWeight: 700, fontSize: 12 }}>Get Help Now</span>
                    <span style={{ padding: '7px 14px', borderRadius: 8, background: '#25d366', color: 'white', fontWeight: 700, fontSize: 12 }}>WhatsApp Us</span>
                  </div>
                </div>
              </div>

              {!sec.mediaUrl && (
                <p style={{ fontSize: 12.5, color: '#94a3b8', marginTop: 12, textAlign: 'center' }}>
                  No GIF yet — hero uses the plain gradient. Click <strong>Upload GIF</strong> (max {MAX_GIF_MB} MB;
                  smaller = faster for visitors).
                </p>
              )}
            </div>

            {sec.mediaUrl && (
              <div style={card}>
                <label style={lbl}>Overlay darkness — {sec.mediaOverlay}%</label>
                <input type="range" min={0} max={90} step={5} value={sec.mediaOverlay}
                  onChange={(e) => upd('mediaOverlay', Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#2563a8' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
                  <span>GIF more visible</span><span>Text more readable</span>
                </div>

                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, cursor: 'pointer', marginTop: 18 }}>
                  <input type="checkbox" checked={sec.enabled} onChange={(e) => upd('enabled', e.target.checked)} />
                  Use GIF as hero background {sec.enabled ? '(on)' : '(off — shows gradient)'}
                </label>

                <div style={{ marginTop: 20 }}>
                  <label style={lbl}>Focal point (which part stays visible on phones/tablets)</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {['top', 'center', 'bottom', 'left', 'right'].map((pos) => (
                      <button key={pos} onClick={() => upd('mediaPosition', pos)}
                        style={{
                          padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                          textTransform: 'capitalize',
                          border: (sec.mediaPosition || 'center') === pos ? '2px solid #2563a8' : '1.5px solid #e2e8f0',
                          background: (sec.mediaPosition || 'center') === pos ? '#eff6ff' : 'white',
                          color: (sec.mediaPosition || 'center') === pos ? '#1a3a5c' : '#475569',
                        }}>
                        {pos}
                      </button>
                    ))}
                  </div>
                  <p style={{ fontSize: 11.5, color: '#94a3b8', marginTop: 6 }}>
                    On narrow phone screens a wide GIF gets cropped. This picks which edge/center to keep in view.
                  </p>
                </div>

                <div>
                  <button onClick={saveSettings} disabled={saving}
                    style={{ marginTop: 18, padding: '10px 26px', borderRadius: 9, border: 'none', background: saving ? '#94a3b8' : '#16a34a', color: 'white', fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>
                    {saving ? 'Saving…' : 'Save Settings'}
                  </button>
                </div>
                <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 10 }}>
                  Tip: use a dark or low-contrast GIF so the white headline stays legible. 40–65% overlay usually works well.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
