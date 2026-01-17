import { HeroCarousel } from "../components/HeroCarousel";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { TutorialSection } from "../components/TutorialSection";
import { Testimonials } from "../components/Testimonials";
import Link from "next/link";
import { Paintbrush, ShieldCheck, Truck, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen font-(family-name:--font-geist-sans)">
      {/* 1. Hero Carousel (Full Screen Images) */}
      <HeroCarousel />

      {/* 2. Featured Products Section */}
      <FeaturedProducts />

      {/* 3. Tutorial Videos Section */}
      <TutorialSection />

      {/* 4. Testimonials Section */}
      <Testimonials />

      {/* 5. Why Choose PCV Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Por qué elegir Pinturería Casco Viejo?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Más de 20 años brindando color y calidad a tus proyectos.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center group">
              <div className="bg-red-50 w-24 h-24 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors duration-300">
                <Paintbrush size={40} className="text-red-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Asesoramiento Técnico</h3>
              <p className="text-gray-600 leading-relaxed">
                No solo vendemos pintura, te enseñamos a aplicarla. Nuestro equipo de expertos te guía en cada paso de tu proyecto.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center group">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors duration-300">
                <Truck size={40} className="text-gray-700" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Logística Propia</h3>
              <p className="text-gray-600 leading-relaxed">
                Olvídate de las demoras. Contamos con flota propia para asegurar que tus materiales lleguen cuando los necesitas.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center group">
              <div className="bg-red-50 w-24 h-24 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors duration-300">
                <ShieldCheck size={40} className="text-red-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Garantía de Satisfacción</h3>
              <p className="text-gray-600 leading-relaxed">
                Trabajamos exclusivamente con primeras marcas y garantizamos la calidad de cada litro que vendemos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="bg-red-900 py-24 px-4 relative overflow-hidden">
        {/* Abstract shapes/decoration */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            ¿Listo para transformar tu espacio?
          </h2>
          <p className="text-xl md:text-2xl text-red-100 mb-10 font-light">
            Da el primer paso hoy mismo. Explora nuestro catálogo y encuentra la inspiración que buscas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/casa" 
              className="bg-white text-red-900 font-bold py-4 px-10 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              Ver Catálogo Completo <ArrowRight size={20} />
            </Link>
            <Link 
              href="/register" 
              className="bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-full hover:bg-white/10 transition-all flex items-center justify-center"
            >
              Crear Cuenta
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
