import { NextRequest, NextResponse } from 'next/server';
import { revalidatePublic } from '@/lib/revalidate';
import connectDB from '@/lib/mongodb';
import Settings from '@/models/Settings';
import { isAuthed } from '@/lib/auth';

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    let doc = await Settings.findOne({ key: 'global' });
    if (!doc) doc = await Settings.create({ key: 'global' });
    return NextResponse.json({ settings: doc });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const body = await req.json();
    delete body.key;
    delete body._id;
    const doc = await Settings.findOneAndUpdate(
      { key: 'global' },
      { $set: body },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    revalidatePublic();
    return NextResponse.json({ success: true, settings: doc });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
