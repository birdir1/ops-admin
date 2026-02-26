import AdminLayout from '@/components/AdminLayout';
import access from '@/data/access.json';

export default function AccessPage() {
  return (
    <AdminLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Erişim ve Anahtarlar</h1>
          <p className="text-sm text-gray-600">
            SSH anahtarları, tokenlar ve kritik erişim noktaları. Gizli değerler burada tutulmaz.
          </p>
        </div>

        <div className="rounded border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Tür</th>
                <th className="p-2">Ad</th>
                <th className="p-2">Konum</th>
                <th className="p-2">Kullanım</th>
                <th className="p-2">Durum</th>
                <th className="p-2">Not</th>
              </tr>
            </thead>
            <tbody>
              {(access as any[]).map((row) => (
                <tr key={`${row.type}-${row.name}`} className="border-t">
                  <td className="p-2">{row.type}</td>
                  <td className="p-2 font-medium">{row.name}</td>
                  <td className="p-2">{row.location}</td>
                  <td className="p-2">{row.usage}</td>
                  <td className="p-2">{row.status}</td>
                  <td className="p-2">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
