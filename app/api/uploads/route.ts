import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

const uploadsDir = path.join(process.cwd(), 'data', 'uploads');

export async function GET() {
  const entries = await fs.readdir(uploadsDir, { withFileTypes: true });
  const files = await Promise.all(
    entries
      .filter((e) => e.isFile())
      .map(async (e) => {
        const full = path.join(uploadsDir, e.name);
        const stat = await fs.stat(full);
        return { name: e.name, size: stat.size, updated_at: stat.mtime.toISOString() };
      })
  );
  return NextResponse.json({ success: true, files });
}

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get('file');

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ success: false, error: 'file is required' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const outName = `${Date.now()}_${safeName}`;
  const outPath = path.join(uploadsDir, outName);

  await fs.writeFile(outPath, buffer);
  return NextResponse.json({ success: true, name: outName });
}
