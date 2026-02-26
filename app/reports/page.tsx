'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';

type ReportFile = { name: string; size: number; updated_at: string };

export default function ReportsPage() {
  const [files, setFiles] = useState<ReportFile[]>([]);

  useEffect(() => {
    fetch('/api/reports')
      .then((res) => res.json())
      .then((data) => setFiles(data.files || []))
      .catch(() => null);
  }, []);

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-semibold mb-2">Raporlar</h1>
        <p className="text-sm text-gray-600 mb-4">Otomatik ve manuel raporlar listesi.</p>
        <div className="rounded border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Dosya</th>
                <th className="p-2">Boyut</th>
                <th className="p-2">Güncellendi</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.name} className="border-t">
                  <td className="p-2">{file.name}</td>
                  <td className="p-2">{Math.round(file.size / 1024)} KB</td>
                  <td className="p-2">{new Date(file.updated_at).toLocaleString('tr-TR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
