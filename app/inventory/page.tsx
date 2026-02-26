import AdminLayout from '@/components/AdminLayout';
import inventory from '@/data/inventory.json';

export default function InventoryPage() {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-semibold mb-2">Envanter</h1>
        <p className="text-sm text-gray-600 mb-4">Her uygulamanın altyapı durumu.</p>
        <div className="rounded border bg-white overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">App</th>
                <th className="p-2">GitHub</th>
                <th className="p-2">Repo Path</th>
                <th className="p-2">Run</th>
                <th className="p-2">Backend</th>
                <th className="p-2">Firebase</th>
                <th className="p-2">App ID</th>
                <th className="p-2">Domains</th>
                <th className="p-2">Server</th>
                <th className="p-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {(inventory as any[]).map((row) => (
                <tr key={row.app_id} className="border-t">
                  <td className="p-2 font-medium">{row.app_id}</td>
                  <td className="p-2">{row.github}</td>
                  <td className="p-2">{row.repo_path || '-'}</td>
                  <td className="p-2">{row.run_cmd || '-'}</td>
                  <td className="p-2">{row.backend ? 'yes' : 'no'}</td>
                  <td className="p-2">
                    {row.firebase_project || '-'}
                    {row.firebase_config
                      ? ` (android: ${row.firebase_config.android ? 'yes' : 'no'}, ios: ${
                          row.firebase_config.ios ? 'yes' : 'no'
                        })`
                      : ''}
                  </td>
                  <td className="p-2">
                    {row.app_ids
                      ? `android: ${row.app_ids.android || '-'}, ios: ${row.app_ids.ios || '-'}`
                      : '-'}
                  </td>
                  <td className="p-2">{(row.domains || []).join(', ') || '-'}</td>
                  <td className="p-2">{row.server || '-'}</td>
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
