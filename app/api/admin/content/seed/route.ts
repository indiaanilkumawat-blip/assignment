import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ContentItem from '@/models/ContentItem';
import { isAuthed } from '@/lib/auth';
import { DEFAULT_CONTENT, ContentType } from '@/lib/defaults';

/**
 * Optional helper: load the built-in sample cards for any content type that is
 * currently empty. This is OPT-IN (a button in the Content tab) so the live
 * site stays blank by default and only shows what the admin actually enters.
 *
 * POST body: { type?: ContentType }  — omit `type` to seed every empty type.
 */
export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const { type } = await req.json().catch(() => ({ type: undefined }));
    const types: ContentType[] = type ? [type] : (Object.keys(DEFAULT_CONTENT) as ContentType[]);

    const seeded: string[] = [];
    for (const t of types) {
      const count = await ContentItem.countDocuments({ type: t });
      if (count === 0) {
        await ContentItem.insertMany(DEFAULT_CONTENT[t]);
        seeded.push(t);
      }
    }

    return NextResponse.json({
      success: true,
      seeded,
      message: seeded.length ? `Loaded sample ${seeded.join(', ')}.` : 'Nothing to load — those sections already have content.',
    });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
