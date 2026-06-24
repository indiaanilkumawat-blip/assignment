'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '@/components/AdminNav';

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  serviceType: string;
  message: string;
  deadline?: string;
  status: 'new' | 'read' | 'replied';
  attachmentId?: string;
  attachmentName?: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  new: '#f59e0b',
  read: '#3b82f6',
  replied: '#10b981',
};

const statusBg: Record<string, string> = {
  new: '#fef3c7',
  read: '#dbeafe',
  replied: '#d1fae5',
};

export default function Dashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');
  const [search, setSearch] = useState('');
  const router = useRouter();

  const fetchInquiries = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/inquiries');
    if (res.status === 401) { router.push('/admin/login'); return; }
    const data = await res.json();
    setInquiries(data.inquiries || []);
    setLoading(false);
  };

  useEffect(() => { fetchInquiries(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/admin/inquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    setInquiries(prev => prev.map(i => i._id === id ? { ...i, status: status as 'new' | 'read' | 'replied' } : i));
    if (selected?._id === id) setSelected(prev => prev ? { ...prev, status: status as 'new' | 'read' | 'replied' } : null);
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    await fetch('/api/admin/inquiries', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setInquiries(prev => prev.filter(i => i._id !== id));
    if (selected?._id === id) setSelected(null);
  };

  const filtered = inquiries.filter(i => {
    if (filter !== 'all' && i.status !== filter) return false;
    if (search && !i.name.toLowerCase().includes(search.toLowerCase()) && !i.email.toLowerCase().includes(search.toLowerCase()) && !i.subject.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    all: inquiries.length,
    new: inquiries.filter(i => i.status === 'new').length,
    read: inquiries.filter(i => i.status === 'read').length,
    replied: inquiries.filter(i => i.status === 'replied').length,
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', display: 'flex', flexDirection: 'column' }}>
      <AdminNav active="inquiries" />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{ width: 300, background: 'white', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 60px)', overflow: 'hidden' }}>
          {/* Stats */}
          <div style={{ padding: 16, borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { label: 'Total', count: counts.all, color: '#1a3a5c', bg: '#dbeafe' },
                { label: 'New', count: counts.new, color: '#b45309', bg: '#fef3c7' },
                { label: 'Read', count: counts.read, color: '#1d4ed8', bg: '#dbeafe' },
                { label: 'Replied', count: counts.replied, color: '#047857', bg: '#d1fae5' },
              ].map(s => (
                <div key={s.label} style={{ padding: '10px 12px', background: s.bg, borderRadius: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.count}</div>
                  <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Search */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: 8 }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="🔍 Search inquiries..."
              style={{ flex: 1, padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, outline: 'none' }}
            />
            <button onClick={fetchInquiries} title="Refresh" style={{ padding: '0 12px', background: '#f1f5f9', border: '1.5px solid #e2e8f0', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>
              🔄
            </button>
          </div>

          {/* Filter tabs */}
          <div style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: 6 }}>
            {(['all', 'new', 'read', 'replied'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '5px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                border: 'none', cursor: 'pointer',
                background: filter === f ? '#1a3a5c' : '#f1f5f9',
                color: filter === f ? 'white' : '#64748b',
              }}>
                {f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f]})
              </button>
            ))}
          </div>

          {/* List */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: 32, color: '#94a3b8' }}>Loading inquiries...</div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 32 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📭</div>
                <div style={{ color: '#94a3b8', fontSize: 14 }}>No inquiries found</div>
              </div>
            ) : (
              filtered.map(inq => (
                <div key={inq._id} onClick={() => { setSelected(inq); if (inq.status === 'new') updateStatus(inq._id, 'read'); }}
                  style={{
                    padding: '14px 16px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer',
                    background: selected?._id === inq._id ? '#eff6ff' : 'white',
                    borderLeft: `3px solid ${selected?._id === inq._id ? '#2563a8' : 'transparent'}`,
                    transition: 'background 0.15s',
                  }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#1e293b' }}>{inq.name}</div>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100,
                      background: statusBg[inq.status], color: statusColors[inq.status],
                      textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>{inq.status}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 3 }}>{inq.serviceType}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inq.subject}</div>
                  <div style={{ fontSize: 11, color: '#cbd5e1', marginTop: 4 }}>
                    {new Date(inq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Detail */}
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          {!selected ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8' }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>📋</div>
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Select an inquiry to view details</div>
              <div style={{ fontSize: 14 }}>Click any item in the list on the left</div>
            </div>
          ) : (
            <div style={{ maxWidth: 700, margin: '0 auto' }}>
              {/* Action bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
                <h2 style={{ flex: 1, fontSize: 18, fontWeight: 700, color: '#1e293b' }}>Inquiry Details</h2>
                <select value={selected.status} onChange={e => updateStatus(selected._id, e.target.value)}
                  style={{ padding: '8px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 13, background: 'white', cursor: 'pointer', fontWeight: 600 }}>
                  <option value="new">🟡 New</option>
                  <option value="read">🔵 Read</option>
                  <option value="replied">🟢 Replied</option>
                </select>
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} style={{
                  padding: '8px 16px', background: '#1a3a5c', color: 'white', borderRadius: 8,
                  textDecoration: 'none', fontSize: 13, fontWeight: 600,
                }}>✉️ Reply</a>
                <a href={`https://api.whatsapp.com/send/?phone=${selected.phone.replace(/\D/g, '')}&text=Hello ${selected.name}, regarding your assignment inquiry...`} target="_blank" rel="noopener noreferrer"
                  style={{ padding: '8px 16px', background: '#25d366', color: 'white', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
                  💬 WhatsApp
                </a>
                <button onClick={() => deleteInquiry(selected._id)}
                  style={{ padding: '8px 16px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                  🗑️ Delete
                </button>
              </div>

              {/* Info cards */}
              <div style={{ background: 'white', borderRadius: 16, padding: 24, border: '1.5px solid #e2e8f0', marginBottom: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[
                    { label: 'Full Name', value: selected.name },
                    { label: 'Email', value: selected.email },
                    { label: 'Phone / WhatsApp', value: selected.phone },
                    { label: 'Service Type', value: selected.serviceType },
                    { label: 'Subject / Topic', value: selected.subject },
                    { label: 'Deadline', value: selected.deadline || 'Not specified' },
                    { label: 'Status', value: selected.status.toUpperCase() },
                    { label: 'Received', value: new Date(selected.createdAt).toLocaleString('en-IN') },
                  ].map(f => (
                    <div key={f.label} style={{ padding: '12px 14px', background: '#f8faff', borderRadius: 10 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{f.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{f.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: 16, padding: 24, border: '1.5px solid #e2e8f0' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Message / Requirements</div>
                <p style={{ fontSize: 15, color: '#1e293b', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{selected.message}</p>
              </div>

              {selected.attachmentId && (
                <div style={{ background: 'white', borderRadius: 16, padding: 24, border: '1.5px solid #e2e8f0', marginTop: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Attached File</div>
                  <a
                    href={`/api/attachments/${selected.attachmentId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 12,
                      padding: '12px 18px', background: '#f8faff', borderRadius: 12,
                      border: '1.5px solid #dbeafe', textDecoration: 'none', color: '#1a3a5c',
                      fontWeight: 600, fontSize: 14, wordBreak: 'break-all',
                    }}
                  >
                    <span style={{ fontSize: 22 }}>📎</span>
                    {selected.attachmentName || 'Download attachment'}
                    <span style={{ fontSize: 12, color: '#2563a8', fontWeight: 700 }}>↓ Download</span>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
