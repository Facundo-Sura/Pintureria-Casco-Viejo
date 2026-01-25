'use client';

import { useState } from 'react';
import { Product } from '../../../context/CartContext';
import { Category } from './types';

interface ProductFormProps {
  initialData: Product;
  categories: Category[];
  onSave: (fd: FormData) => Promise<void>;
  onCancel: () => void;
}

export default function ProductForm({ initialData, categories, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<Product>(initialData);
  const [stockInput, setStockInput] = useState<number>(initialData.stock ?? 0);
  const [brandInput, setBrandInput] = useState<string>(initialData.brand ?? '');
  const [filesInput, setFilesInput] = useState<File[]>([]);
  const [removedPublicIds, setRemovedPublicIds] = useState<string[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    categories.find(c => c.name === initialData.category)?.id || null
  );

  const handleSubmit = async () => {
    const fd = new FormData();
    fd.append('name', formData.name);
    fd.append('price', String(formData.price));
    if (formData.description) fd.append('description', formData.description);
    if (selectedCategoryId) fd.append('categoryId', selectedCategoryId);
    fd.append('category', formData.category || '');
    fd.append('stock', String(stockInput));
    if (brandInput) fd.append('brand', brandInput);
    
    // Solo agregar removed_public_ids si es edición
    if (removedPublicIds.length > 0) {
      fd.append('removed_public_ids', JSON.stringify(removedPublicIds));
    }
    
    for (const f of filesInput) fd.append('archivos', f);
    
    await onSave(fd);
  };

  return (
    <div className="border rounded-lg p-4 mb-6 bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          value={formData.name ?? ''}
          onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
          placeholder="Nombre"
          className="border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-red-600"
        />
        <input
          type="number"
          value={formData.price ?? 0}
          onChange={e => setFormData(p => ({ ...p, price: Number(e.target.value) }))}
          placeholder="Precio"
          className="border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-red-600"
        />
        <select
          value={selectedCategoryId ?? ''}
          onChange={e => {
            const id = e.target.value || null;
            setSelectedCategoryId(id);
            const cat = categories.find(c => c.id === id);
            setFormData(p => ({ ...p, category: cat?.name ?? '' }));
          }}
          className="border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-red-600 bg-white"
        >
          <option value="" disabled>
            Seleccionar Categoría
          </option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={stockInput}
          onChange={e => setStockInput(Number(e.target.value))}
          placeholder="Stock"
          className="border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-red-600"
        />
        <input
          value={brandInput}
          onChange={e => setBrandInput(e.target.value)}
          placeholder="Marca"
          className="border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-red-600"
        />
        <input
          type="file"
          multiple
          onChange={e => setFilesInput(Array.from(e.target.files ?? []))}
          className="border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-red-600 sm:col-span-2"
        />
        {filesInput.length > 0 && (
          <div className="sm:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3">
            {filesInput.map((f, i) => {
              const url = URL.createObjectURL(f);
              return (
                <div key={i} className="border rounded p-2 flex flex-col gap-2">
                  <img src={url} alt={f.name} className="w-full h-24 object-cover rounded" />
                  <button
                    onClick={() => setFilesInput(prev => prev.filter((_, idx) => idx !== i))}
                    className="text-sm text-red-600"
                  >
                    Quitar
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <textarea
          value={formData.description ?? ''}
          onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
          placeholder="Descripción"
          className="border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-red-600 sm:col-span-2"
        />
      </div>

      {formData.images &&
        Array.isArray(formData.images) &&
        formData.public_images_ids &&
        Array.isArray(formData.public_images_ids) && (
          <div className="mt-4">
            <p className="text-sm text-gray-700 mb-2">Imágenes actuales</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {formData.images.map((img: string, idx: number) => {
                const pid = formData.public_images_ids ? formData.public_images_ids[idx] : null;
                if (!pid) return null;
                const isRemoved = removedPublicIds.includes(pid);
                return (
                  <div key={pid} className={`border rounded p-2 ${isRemoved ? 'opacity-50' : ''}`}>
                    <img src={img} alt={pid} className="w-full h-24 object-cover rounded" />
                    <button
                      onClick={() => {
                        setRemovedPublicIds(prev =>
                          prev.includes(pid) ? prev.filter(x => x !== pid) : [...prev, pid]
                        );
                      }}
                      className={`mt-2 text-sm ${isRemoved ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {isRemoved ? 'Restaurar' : 'Eliminar'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={handleSubmit}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Guardar
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
