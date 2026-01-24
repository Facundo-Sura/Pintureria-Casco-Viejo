'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart, Product } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('http://localhost:8080/products');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        
        // Take first 4 products as featured, or random ones
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="py-12 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div></div>;
  }

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Productos Destacados</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <Link href={`/products/${product.id}`} className="block flex-1">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 h-64 flex items-center justify-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                    />
                  ) : (
                    <span className="text-gray-400">Sin Imagen</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="mt-4 text-lg font-bold text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                  <p className="mt-2 text-xl font-medium text-red-600">${product.price}</p>
                </div>
              </Link>
              <div className="p-4 pt-0 mt-auto">
                <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                    <ShoppingBag size={18} /> Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
