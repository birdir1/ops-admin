import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const password = String((body as { password?: string }).password || '').trim();
  const expected = process.env.OPS_ADMIN_PASSWORD || '';

  if (!expected) {
    return NextResponse.json(
      { success: false, error: 'OPS_ADMIN_PASSWORD is not set' },
      { status: 500 }
    );
  }

  if (!password || password !== expected) {
    return NextResponse.json(
      { success: false, error: 'Invalid password' },
      { status: 401 }
    );
  }

  return NextResponse.json({ success: true });
}
