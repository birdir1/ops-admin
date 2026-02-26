import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

const dataPath = path.join(process.cwd(), 'data', 'checklist.md');

type ChecklistItem = {
  id: number;
  status: 'done' | 'pending' | 'in_progress';
  text: string;
};

export async function GET() {
  const content = await fs.readFile(dataPath, 'utf8');
  const items: ChecklistItem[] = [];

  for (const line of content.split('\n')) {
    const match = line.match(/^(\d+)\. \[([ x~])\] (.*)$/);
    if (!match) continue;
    const id = Number(match[1]);
    const raw = match[2];
    const text = match[3];
    const status = raw === 'x' ? 'done' : raw === '~' ? 'in_progress' : 'pending';
    items.push({ id, status, text });
  }

  const summary = {
    total: items.length,
    done: items.filter((i) => i.status === 'done').length,
    pending: items.filter((i) => i.status === 'pending').length,
    in_progress: items.filter((i) => i.status === 'in_progress').length,
  };

  return NextResponse.json({ success: true, summary, items });
}
