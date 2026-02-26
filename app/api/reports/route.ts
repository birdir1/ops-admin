import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

const reportsDir = path.join(process.cwd(), 'data', 'reports');

export async function GET() {
  try {
    const entries = await fs.readdir(reportsDir, { withFileTypes: true });
    const files = await Promise.all(
      entries
        .filter((e) => e.isFile())
        .map(async (e) => {
          const full = path.join(reportsDir, e.name);
          const stat = await fs.stat(full);
          return { name: e.name, size: stat.size, updated_at: stat.mtime.toISOString() };
        })
    );

    return NextResponse.json({ success: true, files });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
