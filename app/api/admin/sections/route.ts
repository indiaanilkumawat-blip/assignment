import { NextRequest, NextResponse } from 'next/server';
import { revalidatePublic } from '@/lib/revalidate';
import connectDB from '@/lib/mongodb';
import Section from '@/models/Section';
import { isAuthed } from '@/lib/auth';
import { DEFAULT_SECTIONS } from '@/lib/defaults';

// Editable fields only — `key` is immutable (it maps to a code render block).
const EDITABLE = ['label', 'enabled', 'order', 'tag', 'heading', 'subheading', 'marginLeft', 'marginRight', 'maxWidth', 'mediaUrl', 'mediaPublicId', 'mediaHeight'] as const;

function pick(src: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const k of EDITABLE) if (k in src) out[k] = src[k];
  return out;
}

/** Ensure every canonical section exists in the DB, returning them ordered. */
async function ensureSeeded() {
  const count = await Section.countDocuments();
  if (count === 0) {
    await Section.insertMany(DEFAULT_SECTIONS);
  } else {
    // Backfill any section keys missing from the DB (e.g. added in a later release).
    const existing = new Set((await Section.find({}, 'key').lean()).map((d) => d.key));
    const missing = DEFAULT_SECTIONS.filter((s) => !existing.has(s.key));
    if (missing.length) await Section.insertMany(missing);
  }
  return Section.find({}).sort({ order: 1 }).lean();
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const sections = await ensureSeeded();
    return NextResponse.json({ sections });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/** Update a single section by id. */
export async function PATCH(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const { id, ...rest } = await req.json();
    const update = pick(rest);
    const section = await Section.findByIdAndUpdate(id, { $set: update }, { new: true });
    if (!section) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    revalidatePublic();
    return NextResponse.json({ success: true, section });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/** Bulk save — used for reordering (array of { _id, order, enabled, ... }). */
export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const { sections } = await req.json();
    if (!Array.isArray(sections)) {
      return NextResponse.json({ error: 'sections array required' }, { status: 400 });
    }
    await Promise.all(
      sections.map((s: Record<string, unknown>) =>
        Section.findByIdAndUpdate(s._id, { $set: pick(s) })
      )
    );
    const fresh = await Section.find({}).sort({ order: 1 }).lean();
    revalidatePublic();
    return NextResponse.json({ success: true, sections: fresh });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/** Reset every section back to the shipped defaults. */
export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    await Section.deleteMany({});
    await Section.insertMany(DEFAULT_SECTIONS);
    const fresh = await Section.find({}).sort({ order: 1 }).lean();
    revalidatePublic();
    return NextResponse.json({ success: true, sections: fresh, message: 'Sections reset to defaults.' });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
