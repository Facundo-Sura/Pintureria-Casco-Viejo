"use client";

import { ArrowLeft, Minus, Plus, ShoppingBag, Star, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useCart, Product } from "../../../context/CartContext";

interface Comment {
  id: string;
  user: string;
  date: string;
  rating: number;
  content: string;
}

// Helper to fetch single product
async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`http://localhost:8080/products/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [comments, setComments] = useState<Comment[]>([]);
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });

  useEffect(() => {
    if (id) {
      getProduct(id as string).then((data) => {
        setProduct(data);
        setComments([]);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Producto no encontrado
      </div>
    );
  }

  const handleAddToCart = () => {
    // Add multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-red-600 transition-colors"
        >
          <ArrowLeft size={20} />
          Volver
        </Link>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3 h-96 flex items-center justify-center">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-center object-cover"
                />
              ) : (
                <span className="text-gray-400 text-lg">
                  Imagen del Producto
                </span>
              )}
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {product.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-red-600">${product.price}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">
                <p>{product.description || "Sin descripción disponible."}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-700 font-medium">Cantidad:</span>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    className="p-2 hover:bg-gray-100"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    className="p-2 hover:bg-gray-100"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 bg-red-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <ShoppingBag className="mr-2" size={20} />
                  Agregar al Carrito
                </button>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-500">
                Categoría:{" "}
                <span className="font-medium text-gray-900">
                  {product.category}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-16 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Comentarios de Usuarios
          </h2>
          <div className="space-y-8">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-full">
                      <User className="text-red-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {comment.user}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {comment.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${i < comment.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Products Section intentionally removed to evitar datos hardcodeados */}
      </div>
    </div>
  );
}
