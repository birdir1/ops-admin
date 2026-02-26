import AdminLayout from '@/components/AdminLayout';

export default function ErrorsPage() {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-semibold mb-2">Hatalar</h1>
        <p className="text-sm text-gray-600 mb-4">Hata izleme ve log bağlantıları.</p>
        <div className="space-y-3">
          <div className="rounded border bg-white p-4">
            <div className="text-sm font-medium">Sentry</div>
            <div className="text-sm text-gray-600">Sentry panel bağlantılarını buraya ekleyeceğiz.</div>
          </div>
          <div className="rounded border bg-white p-4">
            <div className="text-sm font-medium">PM2 Logları</div>
            <div className="text-sm text-gray-600">Sunucu loglarına erişim için ops scriptleri eklenecek.</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
