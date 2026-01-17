import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProductList } from '../../components/ProductList';

export default function Page() {
  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <Link href="/" className="flex items-center gap-2 mb-8 hover:underline text-red-600">
        <ArrowLeft size={20} />
        Volver al inicio
      </Link>
      <main className="flex flex-col gap-8 items-center sm:items-start max-w-6xl mx-auto">
        <div className="w-full">
            <h1 className="text-4xl font-bold mb-2">Pintura de Oficina</h1>
            <p className="text-xl text-gray-600">Soluciones profesionales para espacios de trabajo.</p>
        </div>
        
        <ProductList category="oficina" />
      </main>
    </div>
  );
}
