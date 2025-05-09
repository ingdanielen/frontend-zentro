'use client'
import React, { useEffect, useState, useCallback } from 'react';
import { Product, SearchParams } from '@/types/productType';
import Link from 'next/link';
import ProductMaping from '@/components/UX-UI/ProductMaping';
import { productService } from '@/services/products/productService';
import LoadingFade from '@/components/UX-UI/LoadingFade';

const TopSellings: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 4;

  const fetchProducts = useCallback(async () => {
    try {
      const params: SearchParams = {
        limit: itemsPerPage,
        page: 1
      };
      const response = await productService.searchProducts(params);
      if (response?.data?.items) {
        // Ordenar productos por rating de mayor a menor
        const sortedProducts = [...response.data.items].sort((a, b) => b.rating - a.rating);
        // Tomar solo los primeros 4 productos después de ordenar
        setProducts(sortedProducts.slice(0, itemsPerPage));
      } else {
        console.error("Invalid response format:", response);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <section className="w-full flex flex-col gap-10 items-center">
      <h2 className="text-4xl md:text-5xl font-integral text-nightBlue font-extrabold tracking-wide text-center">LO MÁS VENDIDO</h2>
      <div className="w-full max-w-7xl">
        <LoadingFade isLoading={loading}>
          {products.length > 0 ? (
            <ProductMaping products={products} />
          ) : (
            <div className="text-center text-gray-500">
              No hay productos disponibles
            </div>
          )}
        </LoadingFade>
      </div>
      <Link
        href="/catalogo"
        className="flex justify-center items-center px-8 py-4 rounded-full border border-gray-200 bg-white text-base font-medium text-gray-900 hover:bg-[#f6f4f4] hover:shadow transition-all w-full max-w-xs"
      >
        Ver todos
      </Link>
      <hr className="w-full border-gray-200 max-w-5xl" />
    </section>
  );
};

export default TopSellings;
