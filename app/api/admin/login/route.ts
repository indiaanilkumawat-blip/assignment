import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { verifyAdminPassword } from '@/lib/adminAuth';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    // Password is verified against the DB hash (authoritative) and falls back to
    // the ADMIN_PASSWORD env var for first-time bootstrap. See lib/adminAuth.ts.
    const ok = await verifyAdminPassword(password || '');
    if (!ok) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = jwt.sign({ role: 'admin' }, jwtSecret, { expiresIn: '24h' });

    const response = NextResponse.json({ success: true, token });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400,
    });
    return response;
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
