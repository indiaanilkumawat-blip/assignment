import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Attachment from '@/models/Attachment';

const MAX_BYTES = 4 * 1024 * 1024; // 4 MB (Vercel serverless body limit is ~4.5 MB)
const ALLOWED = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'application/zip',
  'application/x-zip-compressed',
  'image/png',
  'image/jpeg',
  'image/webp',
];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'File exceeds the 4 MB limit' }, { status: 413 });
    }
    if (file.type && !ALLOWED.includes(file.type)) {
      return NextResponse.json(
        { error: 'Unsupported file type. Allowed: PDF, Word, Excel, TXT, ZIP, images.' },
        { status: 415 }
      );
    }

    await connectDB();
    const buffer = Buffer.from(await file.arrayBuffer());
    const doc = await Attachment.create({
      filename: file.name || 'upload',
      contentType: file.type || 'application/octet-stream',
      size: file.size,
      data: buffer,
    });

    return NextResponse.json({ success: true, id: String(doc._id), filename: doc.filename });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 });
  }
}
