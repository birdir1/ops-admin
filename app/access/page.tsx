import AdminLayout from '@/components/AdminLayout';
import access from '@/data/access.json';

export default function AccessPage() {
  const items = access as any[];
  const total = items.length;
  const sshCount = items.filter((i) => i.type === 'ssh_key' || i.type === 'github_ssh_key').length;
  const tokenCount = items.filter((i) => i.type === 'github_token').length;
  const firebaseCount = items.filter((i) => i.type === 'firebase_service_account').length;

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Erişim ve Anahtarlar</h1>
          <p className="text-sm text-gray-600">
            SSH anahtarları, tokenlar ve kritik erişim noktaları. Gizli değerler burada tutulmaz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="rounded border bg-white p-3">
            <div className="text-xs text-gray-500">Toplam</div>
            <div className="text-xl font-semibold">{total}</div>
          </div>
          <div className="rounded border bg-white p-3">
            <div className="text-xs text-gray-500">SSH Anahtar</div>
            <div className="text-xl font-semibold">{sshCount}</div>
          </div>
          <div className="rounded border bg-white p-3">
            <div className="text-xs text-gray-500">GitHub Token</div>
            <div className="text-xl font-semibold">{tokenCount}</div>
          </div>
          <div className="rounded border bg-white p-3">
            <div className="text-xs text-gray-500">Firebase SA</div>
            <div className="text-xl font-semibold">{firebaseCount}</div>
          </div>
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
              {(items as any[]).map((row) => (
                <tr key={`${row.type}-${row.name}`} className="border-t">
                  <td className="p-2">{row.type}</td>
                  <td className="p-2 font-medium">{row.name}</td>
                  <td className="p-2">{row.location}</td>
                  <td className="p-2">{row.usage}</td>
                  <td className="p-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${
                        row.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : row.status === 'revoke_required' || row.status === 'expired'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
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
