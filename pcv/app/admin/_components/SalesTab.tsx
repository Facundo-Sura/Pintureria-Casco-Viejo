'use client';

import { useEffect, useMemo, useState } from 'react';
import { RefreshCcw } from 'lucide-react';
import { SaleRecord } from './types';

export default function SalesTab() {
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [salesView, setSalesView] = useState<'dia' | 'mes' | 'anio'>('mes');

  // Simulación de carga de ventas (vacío por ahora según original)
  useEffect(() => {
    setSales([]);
  }, []);

  const totals = useMemo(() => {
    const today = new Date();
    const day = sales
      .filter(s => new Date(s.date).toDateString() === today.toDateString())
      .reduce((a, b) => a + b.amount, 0);
    const month = sales
      .filter(s => {
        const d = new Date(s.date);
        return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
      })
      .reduce((a, b) => a + b.amount, 0);
    const year = sales
      .filter(s => new Date(s.date).getFullYear() === today.getFullYear())
      .reduce((a, b) => a + b.amount, 0);
    return { day, month, year };
  }, [sales]);

  const chartData = useMemo(() => {
    if (salesView === 'dia') {
      const today = new Date();
      const hourly = Array.from({ length: 24 }).map((_, h) => {
        const sum = sales
          .filter(s => {
            const d = new Date(s.date);
            return d.toDateString() === today.toDateString() && d.getHours() === h;
          })
          .reduce((a, b) => a + b.amount, 0);
        return { label: `${h}`, value: sum };
      });
      return hourly;
    }
    if (salesView === 'mes') {
      const days = Array.from({ length: 30 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        const sum = sales
          .filter(s => {
            const sd = new Date(s.date);
            return (
              sd.getMonth() === d.getMonth() &&
              sd.getDate() === d.getDate() &&
              sd.getFullYear() === d.getFullYear()
            );
          })
          .reduce((a, b) => a + b.amount, 0);
        return { label: `${d.getDate()}`, value: sum };
      });
      return days;
    }
    const months = Array.from({ length: 12 }).map((_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - (11 - i));
      const sum = sales
        .filter(s => {
          const sd = new Date(s.date);
          return sd.getMonth() === d.getMonth() && sd.getFullYear() === d.getFullYear();
        })
        .reduce((a, b) => a + b.amount, 0);
      return { label: `${d.toLocaleString('es-AR', { month: 'short' })}`, value: sum };
    });
    return months;
  }, [sales, salesView]);

  const maxValue = Math.max(1, ...chartData.map(d => d.value));

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Ventas</h2>
        <button
          onClick={() => setSales([...sales])}
          className="flex items-center gap-2 text-gray-700 hover:text-red-600"
        >
          <RefreshCcw size={16} /> Actualizar
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-600">Hoy</p>
          <p className="text-2xl font-bold text-gray-900">${totals.day}</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-600">Mes</p>
          <p className="text-2xl font-bold text-gray-900">${totals.month}</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-600">Año</p>
          <p className="text-2xl font-bold text-gray-900">${totals.year}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-700">Visualización</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSalesView('dia')}
            className={`px-3 py-1 rounded-full text-sm ${
              salesView === 'dia' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-800'
            }`}
          >
            Día
          </button>
          <button
            onClick={() => setSalesView('mes')}
            className={`px-3 py-1 rounded-full text-sm ${
              salesView === 'mes' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-800'
            }`}
          >
            Mes
          </button>
          <button
            onClick={() => setSalesView('anio')}
            className={`px-3 py-1 rounded-full text-sm ${
              salesView === 'anio' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-800'
            }`}
          >
            Año
          </button>
        </div>
      </div>
      <div className="bg-white border rounded-lg p-4">
        <div className="h-48 flex items-end gap-2">
          {chartData.map((d, i) => {
            const h = Math.round((d.value / maxValue) * 160);
            return (
              <div key={i} className="flex flex-col items-center justify-end" title={`${d.label}: $${d.value}`}>
                <div className="w-3 sm:w-4 bg-red-600 rounded-t" style={{ height: `${h}px` }} />
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex justify-between text-xs text-gray-500">
          <span>{chartData[0]?.label}</span>
          <span>{chartData[Math.max(0, chartData.length - 1)]?.label}</span>
        </div>
      </div>
    </div>
  );
}
