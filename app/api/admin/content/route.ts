import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ContentItem from '@/models/ContentItem';
import { isAuthed } from '@/lib/auth';

const TYPES = ['service', 'faq', 'testimonial', 'step', 'reason', 'domain'];

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const type = req.nextUrl.searchParams.get('type');
    const query = type ? { type } : {};
    const items = await ContentItem.find(query).sort({ type: 1, order: 1 }).lean();
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const body = await req.json();
    if (!TYPES.includes(body.type)) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }
    const item = await ContentItem.create({
      type: body.type,
      order: body.order ?? 0,
      title: body.title || '',
      subtitle: body.subtitle || '',
      body: body.body || '',
      icon: body.icon || '',
      rating: body.rating ?? 5,
      published: body.published ?? true,
    });
    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const body = await req.json();
    const { id, ...update } = body;
    delete update._id;
    delete update.type;
    const item = await ContentItem.findByIdAndUpdate(id, { $set: update }, { new: true });
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, item });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const { id } = await req.json();
    await ContentItem.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
