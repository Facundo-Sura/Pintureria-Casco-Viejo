'use client';

import { useEffect, useMemo, useState } from 'react';
import { Product } from '../../context/CartContext';
import { BarChart3, Package, Users, Plus, Trash2, Pencil, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

type TabKey = 'productos' | 'ventas' | 'usuarios';

interface Category {
  id: string;
  name: string;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

interface SaleRecord {
  id: string;
  date: string;
  amount: number;
}

export default function AdminDashboard() {
  const [active, setActive] = useState<TabKey>('productos');
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [stockInput, setStockInput] = useState<number>(0);
  const [brandInput, setBrandInput] = useState<string>('');
  const [filesInput, setFilesInput] = useState<File[]>([]);
  const [removedPublicIds, setRemovedPublicIds] = useState<string[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([
    { id: 'u1', name: 'Admin', email: 'admin@casco-viejo.com', role: 'admin' },
    { id: 'u2', name: 'Operador', email: 'ops@casco-viejo.com', role: 'editor' },
    { id: 'u3', name: 'Invitado', email: 'guest@casco-viejo.com', role: 'viewer' },
  ]);
  const [newUser, setNewUser] = useState<AdminUser>({ id: '', name: '', email: '', role: 'viewer' });
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [salesView, setSalesView] = useState<'dia' | 'mes' | 'anio'>('mes');

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('http://localhost:8080/products');
        if (!res.ok) throw new Error('failed');
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch {
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch('http://localhost:8080/categories');
        if (!res.ok) throw new Error('failed');
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch {
        setCategories([]);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    setSales([]);
  }, []);

  const totals = useMemo(() => {
    const today = new Date();
    const day = sales.filter(s => new Date(s.date).toDateString() === today.toDateString()).reduce((a, b) => a + b.amount, 0);
    const month = sales.filter(s => {
      const d = new Date(s.date);
      return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
    }).reduce((a, b) => a + b.amount, 0);
    const year = sales.filter(s => new Date(s.date).getFullYear() === today.getFullYear()).reduce((a, b) => a + b.amount, 0);
    return { day, month, year };
  }, [sales]);

  const chartData = useMemo(() => {
    if (salesView === 'dia') {
      const today = new Date();
      const hourly = Array.from({ length: 24 }).map((_, h) => {
        const sum = sales
          .filter(s => {
            const d = new Date(s.date);
            return d.toDateString() === today.toDateString() && d.getHours() === h;
          })
          .reduce((a, b) => a + b.amount, 0);
        return { label: `${h}`, value: sum };
      });
      return hourly;
    }
    if (salesView === 'mes') {
      const days = Array.from({ length: 30 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        const sum = sales
          .filter(s => {
            const sd = new Date(s.date);
            return sd.getMonth() === d.getMonth() && sd.getDate() === d.getDate() && sd.getFullYear() === d.getFullYear();
          })
          .reduce((a, b) => a + b.amount, 0);
        return { label: `${d.getDate()}`, value: sum };
      });
      return days;
    }
    const months = Array.from({ length: 12 }).map((_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - (11 - i));
      const sum = sales
        .filter(s => {
          const sd = new Date(s.date);
          return sd.getMonth() === d.getMonth() && sd.getFullYear() === d.getFullYear();
        })
        .reduce((a, b) => a + b.amount, 0);
      return { label: `${d.toLocaleString('es-AR', { month: 'short' })}`, value: sum };
    });
    return months;
  }, [sales, salesView]);

  const maxValue = Math.max(1, ...chartData.map(d => d.value));

  async function saveProduct(p: Product) {
    try {
      const fd = new FormData();
      fd.append('name', p.name);
      fd.append('price', String(p.price));
      if (p.description) fd.append('description', p.description);
      if (selectedCategoryId) fd.append('categoryId', selectedCategoryId);
      fd.append('category', p.category || '');
      fd.append('stock', String(stockInput));
      if (brandInput) fd.append('brand', brandInput);
      for (const f of filesInput) fd.append('archivos', f);
      const res = await fetch(`http://localhost:8080/products/${p.id}`, {
        method: 'PUT',
        body: fd,
      });
      if (!res.ok) throw new Error('failed');
      const data = await res.json();
      const updated = (data && data.product) ? data.product : data;
      setProducts(prev => prev.map(x => (x.id === p.id ? updated : x)));
      setEditingProduct(null);
      setFilesInput([]);
    } catch {
      setEditingProduct(null);
    }
  }

  async function createProduct(p: Omit<Product, 'id'>) {
    try {
      const fd = new FormData();
      fd.append('name', p.name);
      fd.append('price', String(p.price));
      if (p.description) fd.append('description', p.description);
      if (selectedCategoryId) fd.append('categoryId', selectedCategoryId);
      fd.append('category', p.category || '');
      fd.append('stock', String(stockInput));
      if (brandInput) fd.append('brand', brandInput);
      for (const f of filesInput) fd.append('archivos', f);
      const res = await fetch('http://localhost:8080/products', {
        method: 'POST',
        body: fd,
      });
      if (!res.ok) throw new Error('failed');
      const data = await res.json();
      const created = (data && data.product) ? data.product : data;
      setProducts(prev => [created, ...prev]);
      setEditingProduct(null);
      setFilesInput([]);
    } catch {
      setEditingProduct(null);
    }
  }

  async function deleteProduct(id: string) {
    try {
      await fetch(`http://localhost:8080/products/${id}`, { method: 'DELETE' });
    } finally {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  }

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
    <div className="min-h-screen p-6 sm:p-8 font-(family-name:--font-geist-sans) bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Admin</h1>
          <Link href="/" className="text-sm text-red-600 hover:underline">Volver al sitio</Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b flex overflow-x-auto">
            <button onClick={() => setActive('productos')} className={`px-4 py-3 flex items-center gap-2 ${active === 'productos' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'}`}>
              <Package size={18} /> Productos
            </button>
            <button onClick={() => setActive('ventas')} className={`px-4 py-3 flex items-center gap-2 ${active === 'ventas' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'}`}>
              <BarChart3 size={18} /> Ventas
            </button>
            <button onClick={() => setActive('usuarios')} className={`px-4 py-3 flex items-center gap-2 ${active === 'usuarios' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'}`}>
              <Users size={18} /> Usuarios
            </button>
          </div>

          {active === 'productos' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Gestión de Productos</h2>
                <button onClick={() => { setEditingProduct({ id: 'new', name: '', price: 0, image: '', category: '', description: '' }); setSelectedCategoryId(null); setStockInput(0); setBrandInput(''); setFilesInput([]); setRemovedPublicIds([]); }} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                  <Plus size={16} /> Nuevo Producto
                </button>
              </div>

              {editingProduct && (
                <div className="border rounded-lg p-4 mb-6 bg-gray-50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input value={editingProduct.name ?? ''} onChange={e => setEditingProduct(p => p ? { ...p, name: e.target.value } : p)} placeholder="Nombre" className="border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-red-600" />
                    <input type="number" value={editingProduct.price ?? 0} onChange={e => setEditingProduct(p => p ? { ...p, price: Number(e.target.value) } : p)} placeholder="Precio" className="border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-red-600" />
                    <select
                      value={selectedCategoryId ?? ''}
                      onChange={e => {
                        const id = e.target.value || null;
                        setSelectedCategoryId(id);
                        const cat = categories.find(c => c.id === id);
                        setEditingProduct(p => p ? { ...p, category: cat?.name ?? '' } : p);
                      }}
                      className="border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-red-600 bg-white"
                    >
                      <option value="" disabled>Seleccionar Categoría</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    <input type="number" value={stockInput} onChange={e => setStockInput(Number(e.target.value))} placeholder="Stock" className="border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-red-600" />
                    <input value={brandInput} onChange={e => setBrandInput(e.target.value)} placeholder="Marca" className="border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-red-600" />
                    <input type="file" multiple onChange={e => setFilesInput(Array.from(e.target.files ?? []))} className="border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-red-600 sm:col-span-2" />
                    {filesInput.length > 0 && (
                      <div className="sm:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3">
                        {filesInput.map((f, i) => {
                          const url = URL.createObjectURL(f);
                          return (
                            <div key={i} className="border rounded p-2 flex flex-col gap-2">
                              <img src={url} alt={f.name} className="w-full h-24 object-cover rounded" />
                              <button onClick={() => setFilesInput(prev => prev.filter((_, idx) => idx !== i))} className="text-sm text-red-600">Quitar</button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <textarea value={editingProduct.description ?? ''} onChange={e => setEditingProduct(p => p ? { ...p, description: e.target.value } : p)} placeholder="Descripción" className="border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-red-600 sm:col-span-2" />
                  </div>
                  {(editingProduct as any).images && Array.isArray((editingProduct as any).images) && Array.isArray((editingProduct as any).images_public_ids) && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-700 mb-2">Imágenes actuales</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {((editingProduct as any).images as string[]).map((img: string, idx: number) => {
                          const pid = (editingProduct as any).images_public_ids[idx];
                          const isRemoved = removedPublicIds.includes(pid);
                          return (
                            <div key={pid} className={`border rounded p-2 ${isRemoved ? 'opacity-50' : ''}`}>
                              <img src={img} alt={pid} className="w-full h-24 object-cover rounded" />
                              <button
                                onClick={() => {
                                  setRemovedPublicIds(prev => prev.includes(pid) ? prev.filter(x => x !== pid) : [...prev, pid]);
                                }}
                                className={`mt-2 text-sm ${isRemoved ? 'text-green-600' : 'text-red-600'}`}
                              >
                                {isRemoved ? 'Restaurar' : 'Eliminar'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end gap-2 mt-4">
                    {editingProduct.id === 'new' ? (
                      <button onClick={() => createProduct({ name: editingProduct.name, price: editingProduct.price, image: editingProduct.image, category: editingProduct.category, description: editingProduct.description })} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                        Guardar
                      </button>
                    ) : (
                      <button onClick={() => {
                        const fd = new FormData();
                        fd.append('name', editingProduct.name);
                        fd.append('price', String(editingProduct.price));
                        if (editingProduct.description) fd.append('description', editingProduct.description);
                        if (selectedCategoryId) fd.append('categoryId', selectedCategoryId);
                        fd.append('category', editingProduct.category || '');
                        fd.append('stock', String(stockInput));
                        if (brandInput) fd.append('brand', brandInput);
                        if (removedPublicIds.length > 0) fd.append('removed_public_ids', JSON.stringify(removedPublicIds));
                        for (const f of filesInput) fd.append('archivos', f);
                        fetch(`http://localhost:8080/products/${editingProduct.id}`, { method: 'PUT', body: fd })
                          .then(async res => {
                            if (!res.ok) throw new Error('failed');
                            const data = await res.json();
                            const updated = (data && data.product) ? data.product : data;
                            setProducts(prev => prev.map(x => (x.id === editingProduct.id ? updated : x)));
                            setEditingProduct(null);
                            setFilesInput([]);
                            setRemovedPublicIds([]);
                          })
                          .catch(() => setEditingProduct(null));
                      }} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                        Guardar
                      </button>
                    )}
                    <button onClick={() => setEditingProduct(null)} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200">Cancelar</button>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="min-w-full border rounded-lg overflow-hidden">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="text-left px-4 py-2">Nombre</th>
                      <th className="text-left px-4 py-2">Categoría</th>
                      <th className="text-left px-4 py-2">Precio</th>
                      <th className="text-left px-4 py-2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {loadingProducts ? (
                      <tr><td className="px-4 py-6" colSpan={4}>Cargando...</td></tr>
                    ) : products.length === 0 ? (
                      <tr><td className="px-4 py-6" colSpan={4}>Sin productos</td></tr>
                    ) : products.map(p => (
                      <tr key={p.id} className="border-t">
                        <td className="px-4 py-2 font-medium text-gray-900">{p.name}</td>
                        <td className="px-4 py-2 text-gray-600">{p.category}</td>
                        <td className="px-4 py-2 text-gray-900">${p.price}</td>
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-2">
                            <button onClick={() => { setEditingProduct(p); const m = categories.find(c => c.name === p.category); setSelectedCategoryId(m ? m.id : null); setStockInput((p as any).stock ?? 0); setBrandInput((p as any).brand ?? ''); setFilesInput([]); setRemovedPublicIds([]); }} className="text-gray-700 hover:text-red-600 flex items-center gap-1"><Pencil size={16} /> Editar</button>
                            <button onClick={() => deleteProduct(p.id)} className="text-red-600 hover:text-red-800 flex items-center gap-1"><Trash2 size={16} /> Eliminar</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {active === 'ventas' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Ventas</h2>
                <button onClick={() => setSales([...sales])} className="flex items-center gap-2 text-gray-700 hover:text-red-600"><RefreshCcw size={16} /> Actualizar</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white border rounded-lg p-4">
                  <p className="text-sm text-gray-600">Hoy</p>
                  <p className="text-2xl font-bold text-gray-900">${totals.day}</p>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <p className="text-sm text-gray-600">Mes</p>
                  <p className="text-2xl font-bold text-gray-900">${totals.month}</p>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <p className="text-sm text-gray-600">Año</p>
                  <p className="text-2xl font-bold text-gray-900">${totals.year}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-700">Visualización</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setSalesView('dia')} className={`px-3 py-1 rounded-full text-sm ${salesView === 'dia' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-800'}`}>Día</button>
                  <button onClick={() => setSalesView('mes')} className={`px-3 py-1 rounded-full text-sm ${salesView === 'mes' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-800'}`}>Mes</button>
                  <button onClick={() => setSalesView('anio')} className={`px-3 py-1 rounded-full text-sm ${salesView === 'anio' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-800'}`}>Año</button>
                </div>
              </div>
              <div className="bg-white border rounded-lg p-4">
                <div className="h-48 flex items-end gap-2">
                  {chartData.map((d, i) => {
                    const h = Math.round((d.value / maxValue) * 160);
                    return (
                      <div key={i} className="flex flex-col items-center justify-end" title={`${d.label}: $${d.value}`}>
                        <div className="w-3 sm:w-4 bg-red-600 rounded-t" style={{ height: `${h}px` }} />
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 flex justify-between text-xs text-gray-500">
                  <span>{chartData[0]?.label}</span>
                  <span>{chartData[Math.max(0, chartData.length - 1)]?.label}</span>
                </div>
              </div>
            </div>
          )}

          {active === 'usuarios' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Gestión de Usuarios</h2>
              </div>
              <div className="border rounded-lg p-4 mb-6 bg-gray-50">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input value={newUser.name} onChange={e => setNewUser(u => ({ ...u, name: e.target.value }))} placeholder="Nombre" className="border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-red-600" />
                  <input value={newUser.email} onChange={e => setNewUser(u => ({ ...u, email: e.target.value }))} placeholder="Email" className="border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-red-600" />
                  <select value={newUser.role} onChange={e => setNewUser(u => ({ ...u, role: e.target.value as AdminUser['role'] }))} className="border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-red-600">
                    <option value="viewer">viewer</option>
                    <option value="editor">editor</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
                <div className="flex justify-end mt-4">
                  <button onClick={addUser} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Agregar Usuario</button>
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
                      <tr><td className="px-4 py-6" colSpan={4}>Sin usuarios</td></tr>
                    ) : users.map(u => (
                      <tr key={u.id} className="border-t">
                        <td className="px-4 py-2 font-medium text-gray-900">{u.name}</td>
                        <td className="px-4 py-2 text-gray-600">{u.email}</td>
                        <td className="px-4 py-2 text-gray-600">{u.role}</td>
                        <td className="px-4 py-2">
                          <button onClick={() => deleteUser(u.id)} className="text-red-600 hover:text-red-800 flex items-center gap-1"><Trash2 size={16} /> Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

