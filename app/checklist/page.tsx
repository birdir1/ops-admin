'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';

type ChecklistItem = { id: number; status: 'done' | 'pending' | 'in_progress'; text: string };

type Summary = { total: number; done: number; pending: number; in_progress: number };

export default function ChecklistPage() {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    fetch('/api/checklist')
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items || []);
        setSummary(data.summary || null);
      })
      .catch(() => null);
  }, []);

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-semibold mb-2">Checklist</h1>
        <p className="text-sm text-gray-600 mb-4">
          Toplam: {summary?.total ?? '-'} | Done: {summary?.done ?? '-'} | Pending: {summary?.pending ?? '-'} | In Progress: {summary?.in_progress ?? '-'}
        </p>
        <div className="overflow-x-auto rounded border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">ID</th>
                <th className="p-2">Status</th>
                <th className="p-2">Text</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-2">#{item.id}</td>
                  <td className="p-2">{item.status}</td>
                  <td className="p-2">{item.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
