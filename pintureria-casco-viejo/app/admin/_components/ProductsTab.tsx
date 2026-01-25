'use client';

import { useEffect, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Product } from '../../../context/CartContext';
import { Category } from './types';
import ProductForm from './ProductForm';

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('http://localhost:8080/api/products');
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
        const res = await fetch('http://localhost:8080/api/categories');
        if (!res.ok) throw new Error('failed');
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch {
        setCategories([]);
      }
    }
    loadCategories();
  }, []);

  async function handleSave(fd: FormData) {
    if (!editingProduct) return;

    try {
      const isNew = editingProduct.id === 'new';
      const url = isNew
        ? 'http://localhost:8080/api/products'
        : `http://localhost:8080/api/products/${editingProduct.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        body: fd,
      });

      if (!res.ok) throw new Error('failed');
      const data = await res.json();
      const savedProduct = data && data.product ? data.product : data;

      if (isNew) {
        setProducts(prev => [savedProduct, ...prev]);
      } else {
        setProducts(prev => prev.map(x => (x.id === editingProduct.id ? savedProduct : x)));
      }
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
      // Opcional: mostrar error al usuario
    }
  }

  async function deleteProduct(id: string) {
    try {
      await fetch(`http://localhost:8080/api/products/${id}`, { method: 'DELETE' });
    } finally {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  }

  const handleNewProduct = () => {
    setEditingProduct({
      id: 'new',
      name: '',
      price: 0,
      image: '',
      category: '',
      description: '',
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Gestión de Productos</h2>
        <button
          onClick={handleNewProduct}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          <Plus size={16} /> Nuevo Producto
        </button>
      </div>

      {editingProduct && (
        <ProductForm
          initialData={editingProduct}
          categories={categories}
          onSave={handleSave}
          onCancel={() => setEditingProduct(null)}
        />
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
              <tr>
                <td className="px-4 py-6" colSpan={4}>
                  Cargando...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td className="px-4 py-6" colSpan={4}>
                  Sin productos
                </td>
              </tr>
            ) : (
              products.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-2 font-medium text-gray-900">{p.name}</td>
                  <td className="px-4 py-2 text-gray-600">{p.category}</td>
                  <td className="px-4 py-2 text-gray-900">${p.price}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingProduct(p)}
                        className="text-gray-700 hover:text-red-600 flex items-center gap-1"
                      >
                        <Pencil size={16} /> Editar
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1"
                      >
                        <Trash2 size={16} /> Eliminar
                      </button>
                    </div>
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
