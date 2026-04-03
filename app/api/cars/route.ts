import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Car from '@/models/Car';

export async function GET() {
  try {
    await dbConnect();
    const cars = await Car.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(cars);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get('Authorization');
  if (auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const body = await req.json();
    const car = await Car.create(body);
    return NextResponse.json(car, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create car', detail: String(err) }, { status: 500 });
  }
}
