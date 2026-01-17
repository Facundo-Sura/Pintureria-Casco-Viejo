'use client';

import React from 'react';
import { PlayCircle } from 'lucide-react';
import Link from 'next/link';

const tutorials = [
  {
    id: 1,
    title: 'Cómo preparar paredes antes de pintar',
    duration: '5:20',
    thumbnail: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop',
    views: '1.2k'
  },
  {
    id: 2,
    title: 'Técnicas de pintura para interiores',
    duration: '8:45',
    thumbnail: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop',
    views: '3.5k'
  },
  {
    id: 3,
    title: 'Elegir el color perfecto para tu sala',
    duration: '4:10',
    thumbnail: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?q=80&w=800&auto=format&fit=crop',
    views: '950'
  }
];

export function TutorialSection() {
  return (
    <div className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Aprende con Nosotros</h2>
                <p className="text-gray-400">Tutoriales expertos para que tus proyectos queden perfectos.</p>
            </div>
            <Link href="/tutoriales" className="hidden sm:block text-red-400 hover:text-red-300 font-medium transition-colors">
                Ver todos los tutoriales &rarr;
            </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tutorials.map((video) => (
            <div key={video.id} className="group cursor-pointer">
              <div className="relative rounded-xl overflow-hidden aspect-video mb-4">
                <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <PlayCircle size={48} className="text-white opacity-80 group-hover:opacity-100 transform group-hover:scale-110 transition-all" />
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors">{video.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{video.views} vistas</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
            <Link href="/tutoriales" className="text-red-400 hover:text-red-300 font-medium transition-colors">
                Ver todos los tutoriales &rarr;
            </Link>
        </div>
      </div>
    </div>
  );
}
