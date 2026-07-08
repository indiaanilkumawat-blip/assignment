import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Section from '@/models/Section';
import { isAuthed } from '@/lib/auth';
import { revalidatePublic } from '@/lib/revalidate';
import { cloudinaryEnv, signParams, destroyAsset } from '@/lib/cloudinary';
import { DEFAULT_SECTIONS } from '@/lib/defaults';

const FOLDER = 'assignment-hub/gif-banner';

/** Get (and lazily create) the singleton 'gif' section row. */
async function getGifSection() {
  await connectDB();
  let doc = await Section.findOne({ key: 'gif' });
  if (!doc) {
    const def = DEFAULT_SECTIONS.find((s) => s.key === 'gif')!;
    doc = await Section.create(def);
  }
  return doc;
}

/** GET — current GIF banner config for the admin UI. */
export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const doc = await getGifSection();
    const { configured } = cloudinaryEnv();
    return NextResponse.json({
      section: {
        _id: String(doc._id),
        enabled: doc.enabled,
        mediaOverlay: typeof doc.mediaOverlay === 'number' ? doc.mediaOverlay : 55,
        mediaPosition: doc.mediaPosition || 'center',
        mediaUrl: doc.mediaUrl || '', mediaPublicId: doc.mediaPublicId || '',
      },
      cloudinaryConfigured: configured,
    });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/**
 * POST — return a signed payload so the browser can upload the GIF DIRECTLY
 * to Cloudinary (bypasses Vercel's ~4.5 MB body limit). The API secret stays
 * on the server; only the one-time signature is exposed.
 */
export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { cloudName, apiKey, apiSecret, configured } = cloudinaryEnv();
  if (!configured) {
    return NextResponse.json(
      { error: 'Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to your environment variables.' },
      { status: 500 }
    );
  }
  const timestamp = Math.floor(Date.now() / 1000);
  const params: Record<string, string | number> = { folder: FOLDER, timestamp };
  const signature = signParams(params, apiSecret);
  return NextResponse.json({
    cloudName, apiKey, timestamp, folder: FOLDER, signature,
    uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
  });
}

/**
 * PUT — save the uploaded GIF's URL/public_id and display settings onto the
 * 'gif' section. Deletes the previously stored Cloudinary asset (best-effort).
 */
export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const doc = await getGifSection();

    // Replace media? Clean up the old asset first (best-effort).
    if (typeof body.mediaUrl === 'string' && body.mediaUrl !== doc.mediaUrl && doc.mediaPublicId) {
      await destroyAsset(doc.mediaPublicId);
    }

    if (typeof body.mediaUrl === 'string') doc.mediaUrl = body.mediaUrl;
    if (typeof body.mediaPublicId === 'string') doc.mediaPublicId = body.mediaPublicId;
    if (typeof body.mediaOverlay === 'number' && body.mediaOverlay >= 0 && body.mediaOverlay <= 90) doc.mediaOverlay = body.mediaOverlay;
    if (typeof body.mediaPosition === 'string' && ['center', 'top', 'bottom', 'left', 'right'].includes(body.mediaPosition)) doc.mediaPosition = body.mediaPosition;
    if (typeof body.enabled === 'boolean') doc.enabled = body.enabled;

    await doc.save();
    revalidatePublic();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/** DELETE — remove the GIF (Cloudinary asset + DB reference). */
export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const doc = await getGifSection();
    if (doc.mediaPublicId) await destroyAsset(doc.mediaPublicId);
    doc.mediaUrl = '';
    doc.mediaPublicId = '';
    await doc.save();
    revalidatePublic();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
