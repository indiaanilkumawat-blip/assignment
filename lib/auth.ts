import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function isAuthed(req: NextRequest): boolean {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return false;
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    return true;
  } catch {
    return false;
  }
}
