import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Settings from '@/models/Settings';
import { isAuthed } from '@/lib/auth';
import { revalidatePublic } from '@/lib/revalidate';
import { THEMES, DEFAULT_THEME_KEY } from '@/lib/themes';

/** GET — the currently selected theme key. */
export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    let doc = await Settings.findOne({ key: 'global' });
    if (!doc) doc = await Settings.create({ key: 'global' });
    return NextResponse.json({ theme: doc.theme || DEFAULT_THEME_KEY });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/** PUT { theme } — switch the active theme (validated against the catalog). */
export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { theme } = await req.json();
    if (typeof theme !== 'string' || !THEMES.some((t) => t.key === theme)) {
      return NextResponse.json({ error: 'Unknown theme' }, { status: 400 });
    }
    await connectDB();
    await Settings.findOneAndUpdate(
      { key: 'global' },
      { $set: { theme } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    revalidatePublic();
    return NextResponse.json({ success: true, theme });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
