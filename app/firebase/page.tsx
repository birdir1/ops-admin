import AdminLayout from '@/components/AdminLayout';
import firebaseProjects from '@/data/firebase-projects.json';

export default function FirebasePage() {
  return (
    <AdminLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Firebase Projeleri</h1>
          <p className="text-sm text-gray-600">Aktif ve bekleyen Firebase projeleri.</p>
        </div>

        <div className="rounded border bg-white overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Ad</th>
                <th className="p-2">Project ID</th>
                <th className="p-2">Uygulamalar</th>
                <th className="p-2">Durum</th>
                <th className="p-2">Not</th>
              </tr>
            </thead>
            <tbody>
              {(firebaseProjects as any[]).map((row) => (
                <tr key={row.project_id} className="border-t">
                  <td className="p-2 font-medium">{row.name}</td>
                  <td className="p-2">{row.project_id}</td>
                  <td className="p-2">{(row.apps || []).join(', ') || '-'}</td>
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
