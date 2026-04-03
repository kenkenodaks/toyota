import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Inquiry from '@/models/Inquiry';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const { name, email, message, carId } = body;
    if (!name || !email || !message || !carId) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const inquiry = await Inquiry.create({ name, email, message, carId });
    return NextResponse.json(inquiry, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to submit inquiry', detail: String(err) }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get('Authorization');
  if (auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(inquiries);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}
