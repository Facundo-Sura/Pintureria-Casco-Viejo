"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Searchbar from "./Searchbar";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white px-4 sm:px-6 lg:px-8 shadow-md z-50 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <div className="flex items-center">
          <Image 
            src="/logo.png" 
            alt="logo" 
            width={60} 
            height={60} 
            className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
          />
        </div>

          <Searchbar />

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center justify-center gap-6">
          <Link 
            href="/login" 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Iniciar sesión"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
          </Link>
          <Link 
            href="/cart" 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            aria-label="Carrito de compras"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-cart-fill"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
          </Link>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Menú"
            aria-expanded={isOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              {isOpen ? (
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              ) : (
                <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/75 bg-opacity-50"
            onClick={toggleMenu}
          />
          
          {/* Menu Panel */}
          <div className="absolute top-16 right-0 w-full bg-white shadow-lg rounded-bl-2xl">
            <nav className="p-4">
              <div className="space-y-2">
                <Link
                  href="/login"
                  className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={toggleMenu}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-person-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg>
                  <span>Iniciar Sesión</span>
                </Link>
                
                <Link
                  href="/cart"
                  className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={toggleMenu}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-cart-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                  <span>Carrito</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Spacer para evitar que el contenido quede detrás del header fijo */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default Header;