"use client";
import { productService } from "@/services/products/productService";
import { SingleProductResponse } from "@/types/apiResponse";
import { Product } from "@/types/productType";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductDetailProps {
  params: { id: string };
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const fetchProduct = async () => {
    try {
      const response: SingleProductResponse =
        await productService.getProductById(params.id);
      if (!response.success || !response.data) {
        return notFound();
      }
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      return notFound();
    } finally {
      setIsLoading(false);
      // Trigger fade-in animation after loading
      setTimeout(() => setIsVisible(true), 100);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nightBlue"></div>
      </div>
    );
  }

  if (!product) return notFound();

  // Calcular precio base y precio con incremento
  const basePrice = product.price ?? 0;
  const incrementPercentage = 10; // 10% de incremento
  const price = basePrice * (1 + incrementPercentage / 100);
  const oldPrice = basePrice;

  return (
    <main
      className={`flex flex-col md:flex-row gap-10 max-w-5xl mx-auto py-12 px-4 md:px-0 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Imagen */}
      <div className="flex-1 flex justify-center items-start">
        <div className="bg-[#f6f4f4] rounded-2xl p-8 flex items-center justify-center">
          <img
            src={product.images?.[0] ?? "/placeholder.png"}
            alt={product.name}
            width={340}
            height={340}
            className="object-contain rounded-lg bg-white"
          />
        </div>
      </div>
      {/* Info */}
      <div className="flex-1 flex flex-col gap-6">
        <h1 className="text-3xl md:text-4xl font-extrabold font-integral text-nightBlue">
          {product.name}
        </h1>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={
                  i < Math.round(product.rating ?? 0)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-700">
            {(product.rating ?? 0).toFixed(1)}/5
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-nightBlue">
            ${price.toLocaleString("es-CO")}
          </span>
          <span className="text-lg text-gray-700 line-through">
            ${oldPrice.toLocaleString("es-CO")}
          </span>
          <span className="bg-red-100 text-red-500 px-2 py-1 rounded-full text-sm font-bold">
            +{incrementPercentage}%
          </span>
        </div>
        <p className="text-gray-600 mb-4">{product.description}</p>

        <div className="border-t pt-4">
          <div className="mb-3">
            <span className="font-semibold text-gray-800">Color</span>
            <div className="mt-2">
              <span className="text-gray-600">{product.color}</span>
            </div>
          </div>

          <div className="mb-3">
            <span className="font-semibold text-gray-800">
              Especificaciones
            </span>
            <div className="mt-2 space-y-2">
              <p className="text-gray-600">Marca: {product.brand}</p>
              <p className="text-gray-600">Categoría: {product.category}</p>
              <p className="text-gray-600">Stock disponible: {product.stock}</p>
              <p className="text-gray-600">
                Dimensiones: {product.width} x {product.height} cm
              </p>
              <p className="text-gray-600">Peso: {product.weight} g</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6 mb-4">
            <button
              className="w-8 h-8 rounded-full border flex items-center justify-center text-2xl font-bold hover:bg-gray-100 transition-colors"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="text-lg font-semibold">1</span>
            <button
              className="w-8 h-8 rounded-full border flex items-center justify-center text-2xl font-bold hover:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            className="w-full bg-black text-white py-4 rounded-full text-lg font-bold hover:bg-nightBlue transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Sin stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </main>
  );
}
