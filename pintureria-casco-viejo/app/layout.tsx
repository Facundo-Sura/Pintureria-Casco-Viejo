import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { CartSidebar } from "../components/CartSidebar";
import { LoginModal } from "../components/LoginModal";

export const metadata: Metadata = {
  title: "Pintureria Casco Viejo",
  description: "La mejor pintureria del pais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <CartProvider>
            <Header />
            <CartSidebar />
            <LoginModal />
            <main className="pt-32 p-4 min-h-screen bg-gray-50">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
