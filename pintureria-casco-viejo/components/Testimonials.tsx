'use client';

import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'María González',
    role: 'Arquitecta',
    content: 'La calidad de las pinturas es excepcional. Siempre encuentro el tono exacto que mis clientes necesitan. El asesoramiento es un plus inigualable.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'Contratista',
    content: 'Llevo años trabajando con Casco Viejo y nunca me han fallado. Los pedidos llegan a tiempo y los precios son muy competitivos para el gremio.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Ana Laura Martínez',
    role: 'Cliente Particular',
    content: 'Renové mi casa completa y los tutoriales de la web me ayudaron muchísimo. Compré todo online y fue súper fácil.',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop'
  }
];

export function Testimonials() {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Lo que dicen nuestros clientes</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow relative">
                {/* Quote Icon */}
                <div className="absolute top-4 right-6 text-6xl text-red-100 font-serif leading-none">"</div>
                
                <div className="flex items-center gap-4 mb-6">
                    <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                </div>
                
                <div className="flex mb-4 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < testimonial.rating ? "currentColor" : "none"} className={i < testimonial.rating ? "" : "text-gray-300"} />
                    ))}
                </div>

                <p className="text-gray-600 relative z-10 italic">
                    {testimonial.content}
                </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
