'use client';

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const slides = [
  { 
    id: 1, 
    title: 'Pintura de Casa', 
    subtitle: 'Renueva tu hogar con los mejores colores', 
    image: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?q=80&w=2000&auto=format&fit=crop',
    link: '/casa',
    color: 'from-red-600/80 to-red-900/80'
  },
  { 
    id: 2, 
    title: 'Pintura de Oficina', 
    subtitle: 'Espacios profesionales que inspiran', 
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop',
    link: '/oficina',
    color: 'from-gray-600/80 to-gray-900/80'
  },
  { 
    id: 3, 
    title: 'Automotor', 
    subtitle: 'El mejor acabado para tu vehículo', 
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2000&auto=format&fit=crop',
    link: '/automotor',
    color: 'from-red-700/80 to-red-950/80'
  },
  { 
    id: 4, 
    title: 'Ferretería & Herramientas', 
    subtitle: 'Todo lo que necesitas para tu proyecto', 
    image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=2000&auto=format&fit=crop',
    link: '/ferreteria',
    color: 'from-gray-700/80 to-gray-950/80'
  },
  { 
    id: 5, 
    title: 'Temporada de Piletas', 
    subtitle: 'Prepara tu pileta para el verano', 
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2000&auto=format&fit=crop',
    link: '/pileta',
    color: 'from-gray-500/80 to-gray-800/80'
  },
];

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative h-[80vh] w-full overflow-hidden group">
      <div className="h-full w-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide) => (
            <div className="relative flex-[0_0_100%] min-w-0 h-full" key={slide.id}>
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-cover"
                />
                {/* Overlay Gradient */}
                <div className={`absolute inset-0 bg-linear-to-r ${slide.color} mix-blend-multiply`} />
                <div className="absolute inset-0 bg-black/30" />
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-white">
                  <h2 className="text-xl sm:text-2xl font-medium mb-4 tracking-wider uppercase opacity-90 animate-fade-in-up">
                    Pinturería Casco Viejo
                  </h2>
                  <h1 className="text-5xl sm:text-7xl font-bold mb-6 tracking-tight leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl sm:text-2xl mb-10 text-gray-100 max-w-2xl mx-auto font-light">
                    {slide.subtitle}
                  </p>
                  <Link 
                    href={slide.link}
                    className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Ver Productos <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
        aria-label="Anterior"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
        aria-label="Siguiente"
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
}
