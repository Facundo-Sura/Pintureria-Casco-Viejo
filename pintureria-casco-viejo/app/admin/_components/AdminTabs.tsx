import { BarChart3, Package, Users } from 'lucide-react';
import { TabKey } from './types';

interface AdminTabsProps {
  active: TabKey;
  onChange: (key: TabKey) => void;
}

export default function AdminTabs({ active, onChange }: AdminTabsProps) {
  return (
    <div className="border-b flex overflow-x-auto">
      <button
        onClick={() => onChange('productos')}
        className={`px-4 py-3 flex items-center gap-2 ${
          active === 'productos' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'
        }`}
      >
        <Package size={18} /> Productos
      </button>
      <button
        onClick={() => onChange('ventas')}
        className={`px-4 py-3 flex items-center gap-2 ${
          active === 'ventas' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'
        }`}
      >
        <BarChart3 size={18} /> Ventas
      </button>
      <button
        onClick={() => onChange('usuarios')}
        className={`px-4 py-3 flex items-center gap-2 ${
          active === 'usuarios' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'
        }`}
      >
        <Users size={18} /> Usuarios
      </button>
    </div>
  );
}
