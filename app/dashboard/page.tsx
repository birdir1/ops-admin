'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';

type Summary = {
  total: number;
  done: number;
  pending: number;
  in_progress: number;
};

type ChecklistItem = {
  id: number;
  status: 'done' | 'pending' | 'in_progress';
  text: string;
};

type PortfolioApp = {
  app_id: string;
  status: string;
  build_health: string;
  store_health: string;
  domain_health: string;
  runtime_health?: string;
  ci_health?: string;
};

export default function DashboardPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [pending, setPending] = useState<ChecklistItem[]>([]);
  const [apps, setApps] = useState<PortfolioApp[]>([]);

  useEffect(() => {
    fetch('/api/checklist')
      .then((res) => res.json())
      .then((data) => {
        setSummary(data.summary || null);
        setPending((data.items || []).filter((i: ChecklistItem) => i.status !== 'done').slice(0, 10));
      })
      .catch(() => null);

    fetch('/api/portfolio-status')
      .then((res) => res.json())
      .then((data) => setApps(data.apps || []))
      .catch(() => null);
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">birdir1 Ops Özet</h1>
          <p className="text-sm text-gray-600">Portföy, checklist ve rapor kontrol merkezi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="rounded border bg-white p-4">
            <div className="text-xs text-gray-500">Toplam Adım</div>
            <div className="text-2xl font-semibold">{summary?.total ?? '-'}</div>
          </div>
          <div className="rounded border bg-white p-4">
            <div className="text-xs text-gray-500">Tamamlanan</div>
            <div className="text-2xl font-semibold text-green-700">{summary?.done ?? '-'}</div>
          </div>
          <div className="rounded border bg-white p-4">
            <div className="text-xs text-gray-500">Bekleyen</div>
            <div className="text-2xl font-semibold text-yellow-700">{summary?.pending ?? '-'}</div>
          </div>
          <div className="rounded border bg-white p-4">
            <div className="text-xs text-gray-500">In Progress</div>
            <div className="text-2xl font-semibold text-blue-700">{summary?.in_progress ?? '-'}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded border bg-white p-4">
            <div className="text-sm font-semibold mb-3">Açık Adımlar (Top 10)</div>
            {pending.length === 0 ? (
              <div className="text-sm text-gray-500">Açık adım yok</div>
            ) : (
              <ul className="text-sm space-y-2">
                {pending.map((item) => (
                  <li key={item.id} className="flex items-start gap-2">
                    <span className="text-xs text-gray-400">#{item.id}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded border bg-white p-4">
            <div className="text-sm font-semibold mb-3">Uygulama Durumu</div>
            <div className="space-y-2 text-sm">
              {apps.map((app) => (
                <div key={app.app_id} className="flex items-center justify-between border rounded p-2">
                  <span>{app.app_id}</span>
                  <div className="flex gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded border">build: {app.build_health}</span>
                    <span className="px-2 py-0.5 rounded border">store: {app.store_health}</span>
                    <span className="px-2 py-0.5 rounded border">runtime: {app.runtime_health ?? 'unknown'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
