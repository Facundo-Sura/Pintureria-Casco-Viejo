'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart, Product } from '../context/CartContext';

interface ProductListProps {
  category: string;
}

export function ProductList({ category }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('http://localhost:8080/api/products');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        
        // Filter by category (case insensitive partial match to be safe, or exact match)
        // Adjust logic based on actual backend data
        const filtered = data.filter((p: any) => 
            p.category && p.category.toLowerCase().includes(category.toLowerCase())
        );
        
        // If no products found from API (or API fails), use mock data for demonstration if needed
        // For now, let's stick to API. If empty, show empty state.
        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  if (loading) {
    return (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
    );
  }

  if (products.length === 0) {
    return <div className="text-center py-20 text-gray-500">No se encontraron productos en esta categoría.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
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
  );
}
