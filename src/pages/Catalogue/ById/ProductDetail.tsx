"use client";
import { productService } from "@/services/products/productService";
import { SingleProductResponse } from "@/types/apiResponse";
import { Product } from "@/types/productType";
import { notFound } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Image from 'next/image';

interface ProductDetailProps {
  params: { id: string };
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!params?.id) {
      setError('ID de producto no válido');
      setIsLoading(false);
      return;
    }

    try {
      const response: SingleProductResponse =
        await productService.getProductById(params.id);
      if (!response.success || !response.data) {
        setError('Producto no encontrado');
        return;
      }
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError('Error al cargar el producto');
    } finally {
      setIsLoading(false);
    }
  }, [params?.id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nightBlue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zentro-dark to-zentro-darker py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return notFound();

  // Calcular precio base y precio con incremento
  const basePrice = product.price ?? 0;
  const incrementPercentage = 10; // 10% de incremento
  const price = basePrice * (1 + incrementPercentage / 100);
  const oldPrice = basePrice;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= (product?.stock ?? 0)) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zentro-dark to-zentro-darker py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-zentro-card/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-zentro-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image
                src={product.images[0] || '/placeholder.png'}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
                <p className="text-gray-400">{product.description}</p>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-2xl font-bold text-white">${price.toFixed(2)}</span>
                <span className="text-lg text-gray-400 line-through">${oldPrice.toFixed(2)}</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-10 h-10 rounded-lg bg-zentro-card/20 text-white hover:bg-zentro-card/30 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-white">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-zentro-card/20 text-white hover:bg-zentro-card/30 transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  className="w-full py-3 bg-zentro-primary text-white rounded-lg hover:bg-zentro-primary/90 transition-colors"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
