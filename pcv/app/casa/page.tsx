import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProductList } from '../../components/ProductList';

export default function Page() {
  return (
    <div className="min-h-screen p-8 font-(family-name:--font-geist-sans)">
      <Link href="/" className="flex items-center gap-2 mb-8 hover:underline text-red-600">
        <ArrowLeft size={20} />
        Volver al inicio
      </Link>
      <main className="flex flex-col gap-8 items-center sm:items-start max-w-6xl mx-auto">
        <div className="w-full">
            <h1 className="text-4xl font-bold mb-2">Pintura de Casa</h1>
            <p className="text-xl text-gray-600">Renueva tus ambientes con nuestra selección de pinturas para el hogar.</p>
        </div>
        
        <ProductList category="casa" />
      </main>
    </div>
  );
}
