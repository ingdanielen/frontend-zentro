"use client"
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { productService } from '@/services/products/productService';
import { Product } from '@/types/productType';
import Breadcrumb from '@/components/UX-UI/Breadcrumb';
import ProductsFilterBar from '@/components/UX-UI/ProductsFilterBar';
import Pagination from '@/components/UX-UI/Pagination';
import { Filter, X } from 'lucide-react';
import ProductCard from '@/components/UX-UI/ProductCard';

interface SearchFilters {
  category: string | null;    
  brand: string | null;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  q?: string; 
  page?: number;
  limit?: number;
}

interface ProductByCategoryViewProps {
  category: string;
}

const ProductByCategoryView: React.FC<ProductByCategoryViewProps> = ({ category = '' }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<SearchFilters>({
    category: category || '',
    brand: null,
    page: 1,
    limit: 9
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [sort, setSort] = useState<'popular' | 'lowest' | 'highest'>('popular');

  // Extraer categorías, marcas y colores de todos los productos
  const categories = useMemo(() => Array.from(new Set(allProducts.map(p => p.category).filter(Boolean))), [allProducts]);
  const brands = useMemo(() => Array.from(new Set(allProducts.map(p => p.brand).filter(Boolean))), [allProducts]);
  const maxPrice = useMemo(() => Math.max(...allProducts.map(p => p.price), 0), [allProducts]);

  // Obtener productos según filtros
  const fetchProducts = useCallback(async (customFilters: SearchFilters) => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = {};
      
      if (customFilters.q && customFilters.q.trim() !== '') {
        params.q = customFilters.q;
      }
      if (customFilters.category) {
        params.category = customFilters.category;
      }
      if (customFilters.brand) {
        params.brand = customFilters.brand;
      }
      if (customFilters.minPrice && customFilters.minPrice > 0) {
        params.minPrice = customFilters.minPrice;
      }
      if (customFilters.maxPrice && customFilters.maxPrice < maxPrice) {
        params.maxPrice = customFilters.maxPrice;
      }
      if (customFilters.color) {
        params.color = customFilters.color;
      }
      if (customFilters.page) {
        params.page = customFilters.page;
      }
      if (customFilters.limit) {
        params.limit = customFilters.limit;
      }

      console.log('Fetching products with params:', params);
      const response = await productService.searchProducts(params);
      const newProducts = response?.data?.items || [];
      setProducts(newProducts);
      setTotalItems(response?.data?.total || 0);
      
      // Mantener todos los productos para los filtros
      if (!params.q && !params.brand && !params.minPrice && !params.maxPrice && !params.color) {
        setAllProducts(newProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [maxPrice]);

  // Cargar productos iniciales
  useEffect(() => {
    fetchProducts({ category: category, brand: null, page: 1, limit: 9 });
  }, [fetchProducts, category]);

  const handleFilter = useCallback((newFilters: SearchFilters) => {
    const updatedFilters = { ...filters, ...newFilters, page: 1 }; // Reset to page 1 when filters change
    setFilters(updatedFilters);
    fetchProducts(updatedFilters);
    // Cerrar el filtro después de aplicar los filtros en móvil
    if (window.innerWidth < 768) {
      setIsFilterOpen(false);
    }
  }, [filters, fetchProducts]);

  // Ordenar productos según el filtro seleccionado
  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    if (sort === 'lowest') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sort === 'highest') {
      sorted.sort((a, b) => b.price - a.price);
    } else {
      // 'popular' (por defecto, por rating descendente)
      sorted.sort((a, b) => b.rating - a.rating);
    }
    return sorted;
  }, [products, sort]);

  const totalPages = Math.ceil(totalItems / (filters.limit || 9));
  const startProduct = totalItems === 0 ? 0 : ((filters.page || 1) - 1) * (filters.limit || 9) + 1;
  const endProduct = Math.min((filters.page || 1) * (filters.limit || 9), totalItems);

  const handlePageChange = (page: number) => {
    const updatedFilters = { ...filters, page };
    setFilters(updatedFilters);
    fetchProducts(updatedFilters);
  };

  const handleCloseFilter = useCallback(() => {
    setIsFilterOpen(false);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 overflow-x-hidden">
      <Breadcrumb items={[
        { label: 'Home', href: '/' }, 
        { label: 'Catálogo', href: '/catalogo' },
        { label: category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Categoría' }
      ]} />
      <div className="flex flex-col md:flex-row gap-8">
        {/* Floating Filter Button */}
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="md:hidden fixed bottom-6 right-6 flex items-center gap-2 bg-nightBlue text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-900 transition-colors duration-200 z-[1000]"
        >
          {isFilterOpen ? <X size={20} /> : <Filter size={20} />}
          <span>{isFilterOpen ? 'Cerrar' : 'Filtros'}</span>
        </button>

        {/* Overlay for mobile */}
        {isFilterOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={handleCloseFilter}
          />
        )}

        {/* Filtros laterales */}
        <div 
          className={`md:w-64 w-[85%] md:block fixed md:relative top-0 right-0 h-full md:h-auto bg-white z-50 md:z-auto p-4 md:p-0 overflow-y-auto overflow-x-hidden transition-transform duration-300 ease-in-out ${isFilterOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'} shadow-lg md:shadow-none`}
        >
          <ProductsFilterBar 
            categories={categories} 
            brands={brands} 
            maxPrice={maxPrice}
            onFilter={handleFilter}  
          />
        </div>

        {/* Productos */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <h1 className="text-3xl font-extrabold text-nightBlue">
              {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Categoría'}
            </h1>
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
              <span className="text-gray-500 text-base">
                Mostrando {startProduct}-{endProduct} de {totalItems} Productos
              </span>
              <div className="flex items-center gap-2 text-base">
                <span className="text-gray-500">Ordenar por:</span>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value as 'popular' | 'lowest' | 'highest')}
                    className="appearance-none font-semibold text-nightBlue bg-transparent pr-6 pl-2 py-1 rounded focus:outline-none border-0 focus:ring-0 shadow-none"
                  >
                    <option value="popular">Más Popular</option>
                    <option value="lowest">Menor Precio</option>
                    <option value="highest">Mayor Precio</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-20 text-lg text-gray-500">Cargando productos...</div>
          ) : (
            <div>
              {sortedProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProducts.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={filters.page || 1}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      className="mt-10"
                    />
                  )}
                </>
              ) : (
                <div className="text-center py-20 text-lg text-gray-500">
                  No se encontraron productos
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductByCategoryView;
