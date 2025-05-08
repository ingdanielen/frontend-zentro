"use client";
import ProductMaping from "@/components/UX-UI/ProductMaping";
import { productService } from "@/services/products/productService";
import { Product } from "@/types/productType";
import { useToast } from "@/context/ToastContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const NewArrivals: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const fetchProducts = async () => {
    try {
      const response = await productService.searchProducts();
      if (response?.data?.items) {
        setProducts(response.data.items);
      } else {
        console.error("Invalid response format:", {
          response,
          expectedFormat: {
            data: {
              items: "Array of products",
              total: "Total count",
              page: "Current page",
              limit: "Items per page",
              totalPages: "Total pages"
            }
          }
        });
        addToast("Error al cargar los productos: Formato de respuesta inválido", "error");
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      addToast(`Error al cargar los productos: ${error instanceof Error ? error.message : 'Error desconocido'}`, "error");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [addToast]);

  console.log(products);

  return (
    <section className="w-full flex flex-col gap-10 items-center">
      <h2 className="text-4xl md:text-5xl font-integral text-gray-800 font-extrabold tracking-wide text-center">
        NUEVOS PRODUCTOS
      </h2>
      <div className="w-full max-w-7xl">
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
          </div>
        ) : products.length > 0 ? (
          <ProductMaping products={products} />
        ) : (
          <div className="text-center text-gray-500">
            No hay productos disponibles
          </div>
        )}
      </div>
      <Link
        href="/products"
        className="flex justify-center items-center px-8 py-4 rounded-full border border-gray-200 bg-white text-base font-medium text-gray-900 hover:bg-[#f6f4f4] hover:shadow transition-all w-full max-w-xs"
      >
        Ver todos
      </Link>
      <hr className="w-full border-gray-200 max-w-5xl" />
    </section>
  );
};

export default NewArrivals;
