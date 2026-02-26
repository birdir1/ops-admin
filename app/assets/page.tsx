'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';

type UploadFile = { name: string; size: number; updated_at: string };

export default function AssetsPage() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const refresh = () => {
    fetch('/api/uploads')
      .then((res) => res.json())
      .then((data) => setFiles(data.files || []))
      .catch(() => null);
  };

  useEffect(() => {
    refresh();
  }, []);

  const onUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/uploads', { method: 'POST', body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Yükleme başarısız');
        return;
      }
      refresh();
    } catch (err) {
      setError((err as Error).message || 'Yükleme hatası');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-semibold mb-2">Görseller</h1>
        <p className="text-sm text-gray-600 mb-4">Store görselleri ve referans dosyaları.</p>
        <div className="flex items-center gap-3 mb-4">
          <input type="file" onChange={onUpload} disabled={uploading} />
          {uploading && <span className="text-sm text-gray-500">Yükleniyor...</span>}
          {error && <span className="text-sm text-red-600">{error}</span>}
        </div>

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
