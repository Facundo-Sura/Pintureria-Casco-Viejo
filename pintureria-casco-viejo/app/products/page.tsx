'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart, Product } from '../../context/CartContext';
import { ArrowLeft } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchAll() {
      try {
        const res = await fetch('http://localhost:8080/products');
        if (!res.ok) throw new Error('failed');
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen p-8 font-(family-name:--font-geist-sans) flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 font-(family-name:--font-geist-sans) bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2 mb-8 hover:underline text-red-600">
          <ArrowLeft size={20} />
          Volver al inicio
        </Link>

        <div className="w-full mb-6">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">Todos los Productos</h1>
          <p className="text-xl text-gray-600">Explora todo nuestro catálogo.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
              <Link href={`/products/${product.id}`} className="block">
                <div className="bg-gray-200 h-48 w-full rounded-md mb-4 flex items-center justify-center text-gray-400 overflow-hidden">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  ) : (
                    <span>Sin Imagen</span>
                  )}
                </div>
                <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
                <p className="text-gray-600 font-medium mt-1">${product.price}</p>
              </Link>
              <div className="mt-auto pt-4">
                <button
                  onClick={() => addToCart(product)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full transition-colors cursor-pointer"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
