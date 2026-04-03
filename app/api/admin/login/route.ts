import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password || password !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    return NextResponse.json({ success: true, token: process.env.ADMIN_SECRET });
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
