import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Car from '@/models/Car';

type Params = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const car = await Car.findById(params.id).lean();
    if (!car) return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    return NextResponse.json(car);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch car' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  const auth = req.headers.get('Authorization');
  if (auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const body = await req.json();
    const car = await Car.findByIdAndUpdate(params.id, body, { new: true, runValidators: true }).lean();
    if (!car) return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    return NextResponse.json(car);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update car', detail: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const auth = req.headers.get('Authorization');
  if (auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const car = await Car.findByIdAndDelete(params.id);
    if (!car) return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete car' }, { status: 500 });
  }
}
