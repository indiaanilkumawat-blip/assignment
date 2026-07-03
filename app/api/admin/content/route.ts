import { NextRequest, NextResponse } from 'next/server';
import { revalidatePublic } from '@/lib/revalidate';
import connectDB from '@/lib/mongodb';
import ContentItem from '@/models/ContentItem';
import { isAuthed } from '@/lib/auth';
import { slugify } from '@/lib/defaults';

const TYPES = ['service', 'faq', 'testimonial', 'step', 'reason', 'domain'];

/**
 * Build a unique service slug. Uses an explicit slug if the admin typed one,
 * otherwise derives it from the title, then appends -2, -3, … if another
 * service already owns that slug. `excludeId` skips the item being edited.
 */
async function uniqueServiceSlug(desired: string, title: string, excludeId?: string): Promise<string> {
  const base = slugify(desired || title);
  let candidate = base;
  let n = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const clash = await ContentItem.findOne({
      type: 'service', slug: candidate, ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    }).select('_id').lean();
    if (!clash) return candidate;
    n += 1;
    candidate = `${base}-${n}`;
  }
}

/** Normalise the benefits field — accepts an array or newline-separated text. */
function normBenefits(input: unknown): string[] {
  if (Array.isArray(input)) return input.map((x) => String(x).trim()).filter(Boolean);
  if (typeof input === 'string') return input.split('\n').map((x) => x.trim()).filter(Boolean);
  return [];
}

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
    const isService = body.type === 'service';
    const slug = isService ? await uniqueServiceSlug(body.slug || '', body.title || '') : '';
    const item = await ContentItem.create({
      type: body.type,
      order: body.order ?? 0,
      title: body.title || '',
      subtitle: body.subtitle || '',
      body: body.body || '',
      icon: body.icon || '',
      rating: body.rating ?? 5,
      published: body.published ?? true,
      slug,
      bodyHtml: isService ? (body.bodyHtml || '') : '',
      benefits: isService ? normBenefits(body.benefits) : [],
    });
    revalidatePublic();
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

    // Resolve the existing item so we know its type and can keep the slug unique.
    const existing = await ContentItem.findById(id).lean<{ type: string; title: string }>();
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    if (existing.type === 'service') {
      const title = update.title ?? existing.title;
      update.slug = await uniqueServiceSlug(update.slug || '', title, id);
      if ('benefits' in update) update.benefits = normBenefits(update.benefits);
    } else {
      // Non-service types never carry service-only fields.
      delete update.slug; delete update.bodyHtml; delete update.benefits;
    }

    const item = await ContentItem.findByIdAndUpdate(id, { $set: update }, { new: true });
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    revalidatePublic();
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
    revalidatePublic();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
