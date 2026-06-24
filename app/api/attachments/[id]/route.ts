import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Attachment from '@/models/Attachment';
import { isAuthed } from '@/lib/auth';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Ctx) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const { id } = await params;
    const doc = await Attachment.findById(id).lean<{
      filename: string; contentType: string; data: Buffer;
    }>();
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const body = new Uint8Array(doc.data);
    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': doc.contentType || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(doc.filename)}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
