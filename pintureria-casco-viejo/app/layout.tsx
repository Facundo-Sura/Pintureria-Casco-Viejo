import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Aside from "@/components/Aside";

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
        <div className="min-h-screen flex flex-col">
      <Header />
      <Aside />
      <main className="flex-1 md:ml-64 pt-4 pb-24"> {/* Ajusta el padding para el footer */}
        {children}
      </main>
      <Footer />
    </div>
      </body>
    </html>
  );
}
