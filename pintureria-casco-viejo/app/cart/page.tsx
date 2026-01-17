'use client';

import Link from 'next/link';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, cartTotal, clearCart } = useCart();

  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)] bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2 mb-8 hover:underline text-blue-600">
            <ArrowLeft size={20} />
            Volver al inicio
        </Link>
        
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Tu Carrito de Compras</h1>

        {cart.length === 0 ? (
            <div className="bg-white p-12 rounded-lg shadow text-center">
                <p className="text-xl text-gray-500 mb-6">No tienes productos en tu carrito.</p>
                <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                    Explorar Productos
                </Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                            <div className="h-24 w-24 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
                                {item.image ? (
                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-xs text-gray-500">Sin img</div>
                                )}
                            </div>
                            <div className="flex-1 w-full text-center sm:text-left">
                                <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                                <p className="text-gray-500 text-sm mb-2">{item.category}</p>
                                <div className="flex justify-center sm:justify-start items-center gap-4 text-sm text-gray-600">
                                    <span>Cantidad: {item.quantity}</span>
                                    <span>|</span>
                                    <span>Unitario: ${item.price}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center sm:items-end gap-2">
                                <span className="text-lg font-bold text-red-600">${item.price * item.quantity}</span>
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                                >
                                    <Trash2 size={16} /> Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-end mt-4">
                        <button 
                            onClick={clearCart}
                            className="text-red-600 hover:text-red-800 font-medium text-sm underline"
                        >
                            Vaciar Carrito
                        </button>
                    </div>
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
                        <h2 className="text-xl font-bold mb-4 text-gray-900">Resumen de Compra</h2>
                        <div className="space-y-3 mb-6 border-b pb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${cartTotal}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Envío</span>
                                <span>Gratis</span>
                            </div>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
                            <span>Total</span>
                            <span>${cartTotal}</span>
                        </div>
                        <button className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-colors font-bold mb-3">
                            Iniciar Compra
                        </button>
                        <Link href="/" className="block text-center w-full bg-gray-100 text-gray-700 py-3 rounded-md hover:bg-gray-200 transition-colors font-medium">
                            Seguir Comprando
                        </Link>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
