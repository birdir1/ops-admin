'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth } from '@/lib/auth';
import Sidebar from './Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const a = getAuth();
    if (!a?.ok) {
      router.replace('/login');
      return;
    }
    setOk(true);
  }, [router]);
  if (!ok) return <div className="p-8">Yükleniyor...</div>;
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-6 overflow-auto lg:ml-0">
        {children}
      </main>
    </div>
  );
}
