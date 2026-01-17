'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export function CartSidebar() {
  const { cart, isSidebarOpen, toggleSidebar, removeFromCart, cartTotal } = useCart();

  if (!isSidebarOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" 
        onClick={toggleSidebar}
      />
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="w-full bg-white shadow-xl flex flex-col h-full">
          {/* Header */}
          <div className="px-4 py-6 bg-gray-50 border-b flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <ShoppingBag size={20} />
              Tu Carrito ({cart.reduce((acc, item) => acc + item.quantity, 0)})
            </h2>
            <button 
              onClick={toggleSidebar}
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag size={48} className="mb-4 opacity-30" />
                <p>Tu carrito está vacío.</p>
                <button 
                    onClick={toggleSidebar} 
                    className="mt-4 text-red-600 font-medium hover:underline"
                >
                    Continuar comprando
                </button>
              </div>
            ) : (
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li key={item.id} className="flex py-2 border-b last:border-0">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                          Sin img
                        </div>
                      )}
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p className="ml-4">${item.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Cant: {item.quantity}</p>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                        >
                          <Trash2 size={16} /> Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 px-4 py-6 bg-gray-50">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>${cartTotal}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500 mb-6">
                Envío e impuestos calculados al finalizar.
              </p>
              <div className="space-y-3">
                  <Link
                    href="/cart"
                    onClick={toggleSidebar}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700"
                  >
                    Ver Carrito Completo
                  </Link>
                  <button
                    className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    onClick={toggleSidebar}
                  >
                    Continuar Comprando
                  </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
