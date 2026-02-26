'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import portfolioApps from '@/data/portfolio-apps.json';

type Status = 'green' | 'yellow' | 'red' | 'unknown';

type PortfolioApp = {
  app_id: string;
  repo_url: string;
  platforms: Array<'ios' | 'android' | 'web' | 'backend'>;
  status: string;
  build_health: Status;
  store_health: Status;
  domain_health: Status;
  owner: string;
  last_release_at: string;
  health_url: string | null;
  public_url?: string | null;
  notes: string;
};

function pillClass(value: string): string {
  switch (value) {
    case 'green':
    case 'up':
    case 'live':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'yellow':
    case 'in_progress':
    case 'ready_for_store':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'red':
    case 'down':
    case 'blocked':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
}

export default function PortfolioPage() {
  const [runtimeMap, setRuntimeMap] = useState<Record<string, { runtime_health: string; build_health_runtime: string; domain_health_runtime: string; ci_health: string }>>({});
  const [checkedAt, setCheckedAt] = useState<string>('');

  useEffect(() => {
    fetch('/api/portfolio-status', { cache: 'no-store' })
      .then((res) => res.json())
      .then((json) => {
        const next: Record<string, { runtime_health: string; build_health_runtime: string; domain_health_runtime: string; ci_health: string }> = {};
        for (const app of json.apps ?? []) {
          next[app.app_id] = {
            runtime_health: app.runtime_health,
            build_health_runtime: app.build_health_runtime,
            domain_health_runtime: app.domain_health_runtime,
            ci_health: app.ci_health,
          };
        }
        setRuntimeMap(next);
        if (json.checked_at) setCheckedAt(json.checked_at);
      })
      .catch(() => null);
  }, []);

  return (
    <AdminLayout>
      <div className="p-1">
        <h1 className="text-2xl font-semibold mb-2">Portföy</h1>
        <p className="text-sm text-gray-600 mb-4">Son kontrol: {checkedAt ? new Date(checkedAt).toLocaleString('tr-TR') : 'yükleniyor'}</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {(portfolioApps as PortfolioApp[]).map((app) => {
            const runtime = runtimeMap[app.app_id];
            const buildHealth = runtime?.build_health_runtime ?? app.build_health;
            const domainHealth = runtime?.domain_health_runtime ?? app.domain_health;
            const runtimeHealth = runtime?.runtime_health ?? 'unknown';
            const ciHealth = runtime?.ci_health ?? 'unknown';

            return (
              <div key={app.app_id} className="rounded-lg border bg-white p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{app.app_id}</h2>
                    <a className="text-sm text-blue-700 hover:underline" href={app.repo_url} target="_blank" rel="noreferrer">
                      {app.repo_url}
                    </a>
                  </div>
                  <span className={`px-2 py-1 text-xs border rounded ${pillClass(app.status)}`}>
                    {app.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  {app.platforms.map((p) => (
                    <span key={`${app.app_id}-${p}`} className="px-2 py-1 rounded border bg-gray-50">
                      {p}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center justify-between border rounded p-2">
                    <span>Build</span>
                    <span className={`px-2 py-0.5 text-xs border rounded ${pillClass(buildHealth)}`}>
                      {buildHealth}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border rounded p-2">
                    <span>Store</span>
                    <span className={`px-2 py-0.5 text-xs border rounded ${pillClass(app.store_health)}`}>
                      {app.store_health}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border rounded p-2">
                    <span>Domain</span>
                    <span className={`px-2 py-0.5 text-xs border rounded ${pillClass(domainHealth)}`}>
                      {domainHealth}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border rounded p-2">
                    <span>Runtime</span>
                    <span className={`px-2 py-0.5 text-xs border rounded ${pillClass(runtimeHealth)}`}>
                      {runtimeHealth}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border rounded p-2 col-span-2">
                    <span>CI</span>
                    <span className={`px-2 py-0.5 text-xs border rounded ${pillClass(ciHealth)}`}>
                      {ciHealth}
                    </span>
                  </div>
                </div>

                <div className="text-sm text-gray-700">
                  <div><span className="font-medium">Owner:</span> {app.owner}</div>
                  <div><span className="font-medium">Last release:</span> {app.last_release_at}</div>
                  <div><span className="font-medium">Not:</span> {app.notes}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
