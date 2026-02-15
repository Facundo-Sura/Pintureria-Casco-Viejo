import Link from 'next/link';
import { ArrowLeft, PlayCircle } from 'lucide-react';

export default function Page() {
  return (
    <div className="min-h-screen p-8 font-(family-name:--font-geist-sans)">
      <Link href="/" className="flex items-center gap-2 mb-8 hover:underline text-blue-600">
        <ArrowLeft size={20} />
        Volver al inicio
      </Link>
      <main className="flex flex-col gap-8 items-center sm:items-start max-w-6xl mx-auto">
        <div className="w-full">
            <h1 className="text-4xl font-bold mb-2">Tutoriales</h1>
            <p className="text-xl text-gray-600">Aprende a aplicar nuestros productos como un experto.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
           {[1, 2, 3, 4].map((item) => (
             <div key={item} className="border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-gray-800 h-64 w-full flex items-center justify-center text-white relative group cursor-pointer">
                    <PlayCircle size={64} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute bottom-4 right-4 bg-black bg-opacity-70 px-2 py-1 text-sm rounded">10:00</span>
                </div>
                <div className="p-6">
                    <h3 className="font-bold text-2xl mb-2">Cómo pintar una pared interior {item}</h3>
                    <p className="text-gray-600">Descubre los secretos para lograr un acabado profesional en tus paredes.</p>
                    <button className="mt-4 text-red-600 font-medium hover:underline">Ver tutorial completo</button>
                </div>
             </div>
           ))}
        </div>
      </main>
    </div>
  );
}
