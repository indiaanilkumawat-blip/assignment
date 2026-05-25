import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, phone, subject, serviceType, message, deadline } = body;

    if (!name || !email || !phone || !subject || !serviceType || !message) {
      return NextResponse.json({ error: 'All required fields must be filled.' }, { status: 400 });
    }

    const inquiry = await Inquiry.create({ name, email, phone, subject, serviceType, message, deadline });
    return NextResponse.json({ success: true, id: inquiry._id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
