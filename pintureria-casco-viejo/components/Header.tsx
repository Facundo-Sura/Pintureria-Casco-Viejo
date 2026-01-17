"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { User, ShoppingCart, Menu, X } from "lucide-react";

const categories = [
  { name: "Casa", href: "/casa" },
  { name: "Oficina", href: "/oficina" },
  { name: "Automotor", href: "/automotor" },
  { name: "Ferretería", href: "/ferreteria" },
  { name: "Pileta", href: "/pileta" },
  { name: "Tutoriales", href: "/tutoriales" },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openLoginModal, user, logout } = useAuth();
  const { toggleSidebar, cart } = useCart();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
        <div className="px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="logo" 
              width={60} 
              height={60} 
              className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
            />
          </Link>

          {/* Desktop Search - Centered */}
          <div className="hidden md:block flex-1 max-w-2xl mx-auto px-8">
            <Searchbar />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center justify-center gap-6">
            {user ? (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Hola, {user.email.split('@')[0]}</span>
                    <button onClick={logout} className="text-sm text-red-600 hover:underline">Salir</button>
                </div>
            ) : (
              <button 
                  onClick={openLoginModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors flex flex-col items-center text-gray-600"
                  aria-label="Iniciar sesión"
              >
                  <User size={24} />
              </button>
            )}

            <button 
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative text-gray-600"
              aria-label="Carrito de compras"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                  </span>
              )}
            </button>
          </nav>

          {/* Mobile actions */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative text-gray-600 mr-2"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                  </span>
              )}
            </button>

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
              aria-label="Menú"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Sub Menu Categories - Slim */}
        <div className="hidden md:block border-t border-gray-100 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center gap-8 py-2 text-sm font-medium text-gray-600">
                    {categories.map((category) => (
                    <Link
                        key={category.href}
                        href={category.href}
                        className="hover:text-red-600 transition-colors"
                    >
                        {category.name}
                    </Link>
                    ))}
                </div>
            </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-30 md:hidden mt-16">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={toggleMenu}
          />
          
          {/* Menu Panel */}
          <div className="absolute inset-x-0 top-0 bg-white p-4 shadow-lg">
             <div className="mb-4">
                 <Searchbar />
             </div>
             <div className="flex flex-col gap-4">
                {user ? (
                    <div className="flex flex-col gap-2 border-b pb-4">
                        <span className="font-medium">Usuario: {user.email}</span>
                        <button onClick={logout} className="text-left text-red-600">Cerrar Sesión</button>
                    </div>
                ) : (
                    <button 
                        onClick={() => {
                            openLoginModal();
                            toggleMenu();
                        }}
                        className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded"
                    >
                        <User size={20} /> Iniciar Sesión
                    </button>
                )}
                
                <div className="border-t pt-4">
                    <p className="font-bold text-gray-500 mb-2">Categorías</p>
                    {categories.map((category) => (
                      <Link
                        key={category.href}
                        href={category.href}
                        className="block p-2 hover:bg-gray-50"
                        onClick={toggleMenu}
                      >
                        {category.name}
                      </Link>
                    ))}
                </div>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
