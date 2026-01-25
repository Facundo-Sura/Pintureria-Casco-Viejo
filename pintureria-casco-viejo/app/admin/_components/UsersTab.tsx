'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { AdminUser } from './types';

export default function UsersTab() {
  const [users, setUsers] = useState<AdminUser[]>([
    { id: 'u1', name: 'Admin', email: 'admin@casco-viejo.com', role: 'admin' },
    { id: 'u2', name: 'Operador', email: 'ops@casco-viejo.com', role: 'editor' },
    { id: 'u3', name: 'Invitado', email: 'guest@casco-viejo.com', role: 'viewer' },
  ]);
  const [newUser, setNewUser] = useState<AdminUser>({ id: '', name: '', email: '', role: 'viewer' });

  function addUser() {
    if (!newUser.name || !newUser.email) return;
    const id = `u-${Date.now()}`;
    setUsers(prev => [{ ...newUser, id }, ...prev]);
    setNewUser({ id: '', name: '', email: '', role: 'viewer' });
  }

  function deleteUser(id: string) {
    setUsers(prev => prev.filter(u => u.id !== id));
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Gestión de Usuarios</h2>
      </div>
      <div className="border rounded-lg p-4 mb-6 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            value={newUser.name}
            onChange={e => setNewUser(u => ({ ...u, name: e.target.value }))}
            placeholder="Nombre"
            className="border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-red-600"
          />
          <input
            value={newUser.email}
            onChange={e => setNewUser(u => ({ ...u, email: e.target.value }))}
            placeholder="Email"
            className="border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-red-600"
          />
          <select
            value={newUser.role}
            onChange={e => setNewUser(u => ({ ...u, role: e.target.value as AdminUser['role'] }))}
            className="border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-red-600"
          >
            <option value="viewer">viewer</option>
            <option value="editor">editor</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={addUser} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
            Agregar Usuario
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-4 py-2">Nombre</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Rol</th>
              <th className="text-left px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.length === 0 ? (
              <tr>
                <td className="px-4 py-6" colSpan={4}>
                  Sin usuarios
                </td>
              </tr>
            ) : (
              users.map(u => (
                <tr key={u.id} className="border-t">
                  <td className="px-4 py-2 font-medium text-gray-900">{u.name}</td>
                  <td className="px-4 py-2 text-gray-600">{u.email}</td>
                  <td className="px-4 py-2 text-gray-600">{u.role}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => deleteUser(u.id)}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
