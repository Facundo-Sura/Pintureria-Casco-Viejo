'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminTabs from './_components/AdminTabs';
import ProductsTab from './_components/ProductsTab';
import SalesTab from './_components/SalesTab';
import UsersTab from './_components/UsersTab';
import { TabKey } from './_components/types';

export default function AdminDashboard() {
  const [active, setActive] = useState<TabKey>('productos');

  return (
    <div className="min-h-screen p-6 sm:p-8 font-(family-name:--font-geist-sans) bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Admin</h1>
          <Link href="/" className="text-sm text-red-600 hover:underline">
            Volver al sitio
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <AdminTabs active={active} onChange={setActive} />

          {active === 'productos' && <ProductsTab />}
          {active === 'ventas' && <SalesTab />}
          {active === 'usuarios' && <UsersTab />}
        </div>
      </div>
    </div>
  );
}
