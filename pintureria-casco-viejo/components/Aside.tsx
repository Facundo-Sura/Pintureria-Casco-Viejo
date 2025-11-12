"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";

const links = [
  {
    href: "/admin/products",
    name: "Productos",
  },
  {
    href: "/admin/orders",
    name: "Pedidos",
  },
  {
    href: "/admin/users",
    name: "Usuarios",
  },
];

export default function Aside() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-200 p-2">
        <button
          onClick={toggleMobileMenu}
          className="flex items-center gap-2 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md w-full justify-center"
          aria-label="Menú de administración"
          aria-expanded={isMobileMenuOpen}
        >
          <span>Menú Administración</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            className={`transition-transform ${isMobileMenuOpen ? "rotate-180" : ""}`}
          >
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={toggleMobileMenu}
          />
          
          {/* Mobile Menu Panel */}
          <div className="absolute top-28 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
            <nav className="p-4">
              <div className="space-y-2">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={clsx(
                      "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600",
                      {
                        "bg-sky-100 text-blue-600": pathname === link.href,
                      }
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Aside */}
      <aside className="hidden md:block fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 overflow-y-auto z-10">
        <div className="pt-24 pb-8 px-4">
          <nav className="space-y-2">
            {links.map((link) => {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    "flex h-[48px] grow items-center justify-start gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors duration-200",
                    {
                      "bg-sky-100 text-blue-600": pathname === link.href,
                    }
                  )}
                >
                  <p>{link.name}</p>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Spacers para el contenido principal */}
      <div className="h-16 md:h-16" /> {/* Espacio para el botón móvil */}
      <div className="md:ml-64 min-h-[calc(100vh-8rem)]"> 
        {/* El contenido de la página va aquí */}
      </div>
    </>
  );
}