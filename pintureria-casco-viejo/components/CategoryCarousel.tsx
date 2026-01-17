'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useCallback } from 'react';

const categories = [
  { name: 'Pintura de Casa', href: '/casa', description: 'Renueva tu hogar', color: 'bg-red-500' },
  { name: 'Pintura de Oficina', href: '/oficina', description: 'Espacios profesionales', color: 'bg-gray-600' },
  { name: 'Pintura Automotor', href: '/automotor', description: 'Calidad vehicular', color: 'bg-red-600' },
  { name: 'Ferretería', href: '/ferreteria', description: 'Herramientas y más', color: 'bg-gray-700' },
  { name: 'Pintura para Pileta', href: '/pileta', description: 'Verano todo el año', color: 'bg-gray-500' },
  { name: 'Tutoriales', href: '/tutoriales', description: 'Aprende con nosotros', color: 'bg-red-700' },
];

export function CategoryCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Nuestras Categorías</h2>
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {categories.map((category, index) => (
            <div className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4 min-w-0" key={index}>
              <div className="h-full border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className={`${category.color} h-48 w-full flex items-center justify-center text-white`}>
                    <span className="text-5xl opacity-50 font-bold">{category.name.charAt(0)}</span>
                </div>
                <div className="p-6 bg-white h-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-6">{category.description}</p>
                  <Link
                    href={category.href}
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all"
                  >
                    Ver Productos <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
