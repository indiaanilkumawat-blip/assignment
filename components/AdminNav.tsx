'use client';

import { useRouter } from 'next/navigation';

const TABS = [
  { key: 'inquiries', label: '📥 Inquiries', href: '/admin/dashboard' },
  { key: 'sections', label: '🧱 Sections', href: '/admin/sections' },
  { key: 'content', label: '🧩 Content', href: '/admin/content' },
  { key: 'media', label: '🎞️ GIF', href: '/admin/media' },
  { key: 'pages', label: '📄 Pages', href: '/admin/pages' },
  { key: 'settings', label: '⚙️ Settings', href: '/admin/settings' },
  { key: 'password', label: '🔒 Password', href: '/admin/password' },
];

export default function AdminNav({ active }: { active: string }) {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'admin_token=; Max-Age=0; path=/';
    router.push('/admin/login');
  };

  return (
    <header style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #2563a8 100%)', padding: '12px 20px', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.png" alt="Assignment Hub" width={26} height={26} style={{ width: 26, height: 26, objectFit: 'contain', display: 'block' }} />
          </div>
          <div style={{ fontFamily: 'serif', fontSize: 15, fontWeight: 800, color: 'white', whiteSpace: 'nowrap' }}>Assignment Hub — Admin</div>
        </div>

        <nav style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1, justifyContent: 'center' }}>
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => router.push(t.href)}
              style={{
                padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.25)', cursor: 'pointer',
                background: active === t.key ? 'white' : 'rgba(255,255,255,0.12)',
                color: active === t.key ? '#1a3a5c' : 'white',
                transition: 'background 0.15s',
              }}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <button onClick={handleLogout} style={{ padding: '7px 14px', background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8, cursor: 'pointer', fontSize: 13, whiteSpace: 'nowrap' }}>
          🚪 Logout
        </button>
      </div>
    </header>
  );
}
