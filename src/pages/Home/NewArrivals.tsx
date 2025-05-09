"use client";

import dynamic from 'next/dynamic';
import ProductMaping from "@/components/UX-UI/ProductMaping";
import { productService } from "@/services/products/productService";
import { Product, SearchParams } from "@/types/productType";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import LoadingFade from "@/components/UX-UI/LoadingFade";

const NewArrivals: React.FC = () => {
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
        setProducts(response.data.items);
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
      <h2 className="text-4xl md:text-5xl font-integral text-gray-800 font-extrabold tracking-wide text-center">
        NUEVOS PRODUCTOS
      </h2>
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

export default dynamic(() => Promise.resolve(NewArrivals), {
  ssr: false
});
