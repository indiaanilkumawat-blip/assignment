import { NextRequest, NextResponse } from 'next/server';
import { isAuthed } from '@/lib/auth';
import { verifyAdminPassword, setAdminPassword } from '@/lib/adminAuth';

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { currentPassword, newPassword, confirmPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Please fill in all fields.' }, { status: 400 });
    }
    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'New password must be at least 8 characters.' }, { status: 400 });
    }
    if (confirmPassword !== undefined && newPassword !== confirmPassword) {
      return NextResponse.json({ error: 'New password and confirmation do not match.' }, { status: 400 });
    }
    if (newPassword === currentPassword) {
      return NextResponse.json({ error: 'New password must be different from the current one.' }, { status: 400 });
    }

    const ok = await verifyAdminPassword(currentPassword);
    if (!ok) {
      return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 401 });
    }

    await setAdminPassword(newPassword);
    return NextResponse.json({ success: true, message: 'Password updated successfully.' });
  } catch {
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
