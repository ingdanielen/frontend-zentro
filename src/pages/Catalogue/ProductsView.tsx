"use client"
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { productService } from '@/services/products/productService';
import { Product } from '@/types/productType';
import Breadcrumb from '@/components/UX-UI/Breadcrumb';
import ProductsFilterBar from '@/components/UX-UI/ProductsFilterBar';
import { Filter, X } from 'lucide-react';
import ProductCard from '@/components/UX-UI/ProductCard';

interface SearchFilters {
  category: string | null;    
  brand: string | null;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  q?: string;
}

const ProductsView: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<SearchFilters>({
    category: null,
    brand: null
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 9;
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
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

      console.log('Fetching products with params:', params);
      const response = await productService.searchProducts(params);
      const newProducts = response?.data?.items || [];
      setProducts(newProducts);
      // Mantener todos los productos para los filtros
      if (!params.q && !params.category && !params.brand && !params.minPrice && !params.maxPrice && !params.color) {
        setAllProducts(newProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [maxPrice]);

  // Cargar productos iniciales
  useEffect(() => {
    fetchProducts({ category: null, brand: null });
  }, [fetchProducts]);

  const handleFilter = useCallback((newFilters: SearchFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
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

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return sortedProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  const totalProducts = products.length;
  const startProduct = totalProducts === 0 ? 0 : (currentPage - 1) * PRODUCTS_PER_PAGE + 1;
  const endProduct = Math.min(currentPage * PRODUCTS_PER_PAGE, totalProducts);

  const categoryLabel = filters.category || 'Catálogo de Productos';

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleCloseFilter = useCallback(() => {
    setIsFilterOpen(false);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 overflow-x-hidden">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Catálogo' }]} />
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
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <h1 className="text-3xl font-extrabold text-nightBlue">{categoryLabel.charAt(0).toUpperCase() + categoryLabel.slice(1)}</h1>
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
              <span className="text-gray-500 text-base">
                Showing {startProduct}-{endProduct} of {totalProducts} Products
              </span>
              <div className="flex items-center gap-2 text-base">
                <span className="text-gray-500">Sort by:</span>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value as 'popular' | 'lowest' | 'highest')}
                    className="appearance-none font-semibold text-nightBlue bg-transparent pr-6 pl-2 py-1 rounded focus:outline-none border-0 focus:ring-0 shadow-none"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="lowest">Lowest Price</option>
                    <option value="highest">Highest Price</option>
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
              {paginatedProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedProducts.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                  {/* Pagination Controls */}
                  {products.length > PRODUCTS_PER_PAGE && (
                    <div className="flex items-center justify-center mt-10 gap-4 select-none">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg border flex items-center gap-2 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="material-icons">arrow_back</span> Previous
                      </button>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }).map((_, i) => {
                          const page = i + 1;
                          // Show first, last, current, and neighbors; ellipsis for gaps
                          if (
                            page === 1 ||
                            page === totalPages ||
                            Math.abs(page - currentPage) <= 1 ||
                            (currentPage <= 3 && page <= 3) ||
                            (currentPage >= totalPages - 2 && page >= totalPages - 2)
                          ) {
                            return (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium ${currentPage === page ? 'bg-gray-200 text-black' : 'text-gray-500 hover:bg-gray-100'}`}
                              >
                                {page}
                              </button>
                            );
                          }
                          // Ellipsis logic
                          if (
                            (page === currentPage - 2 && currentPage > 3) ||
                            (page === currentPage + 2 && currentPage < totalPages - 2)
                          ) {
                            return <span key={page} className="px-2">...</span>;
                          }
                          return null;
                        })}
                      </div>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg border flex items-center gap-2 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next <span className="material-icons">arrow_forward</span>
                      </button>
                    </div>
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

export default ProductsView;
