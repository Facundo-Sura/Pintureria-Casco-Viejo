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
      <Header />
      <main className="md:ml-64 p-4"> {/* Ajusta el padding para el footer */}
        {children}
      </main>
      <Aside />
      <Footer />
      </body>
    </html>
  );
}
