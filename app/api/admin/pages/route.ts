import { NextRequest, NextResponse } from 'next/server';
import { revalidatePublic } from '@/lib/revalidate';
import connectDB from '@/lib/mongodb';
import Page from '@/models/Page';
import { isAuthed } from '@/lib/auth';

const RESERVED = ['admin', 'api', 'contact', 'sitemap.xml', 'robots.txt'];

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const pages = await Page.find().sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json({ pages });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const body = await req.json();
    if (!body.title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

    const slug = slugify(body.slug || body.title);
    if (RESERVED.includes(slug)) {
      return NextResponse.json({ error: `"${slug}" is a reserved path` }, { status: 400 });
    }
    const exists = await Page.findOne({ slug });
    if (exists) return NextResponse.json({ error: 'A page with this slug already exists' }, { status: 409 });

    const page = await Page.create({
      slug,
      title: body.title,
      content: body.content || '',
      metaTitle: body.metaTitle || '',
      metaDescription: body.metaDescription || '',
      ogImage: body.ogImage || '',
      published: body.published ?? true,
      showInFooter: body.showInFooter ?? true,
      order: body.order ?? 0,
    });
    revalidatePublic();
    return NextResponse.json({ success: true, page }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
