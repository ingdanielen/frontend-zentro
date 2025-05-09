/**
 * Componente ProductsView
 * 
 * Este componente muestra un catálogo de productos con capacidades de filtrado, ordenamiento y paginación.
 * Incluye un diseño responsivo con una barra lateral de filtros adaptable a móvil y una cuadrícula de tarjetas de productos.
 */

"use client"
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { productService } from '@/services/products/productService';
import { Product } from '@/types/productType';
import Breadcrumb from '@/components/UX-UI/Breadcrumb';
import ProductsFilterBar from '@/components/UX-UI/ProductsFilterBar';
import Pagination from '@/components/UX-UI/Pagination';
import { Filter, X } from 'lucide-react';
import ProductCard from '@/components/UX-UI/ProductCard';

// Interfaz que define la estructura de los filtros de búsqueda
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

const ProductsView: React.FC = () => {
  // Agregar estilos de animación de aparición gradual
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Gestión del estado para productos y UI
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<SearchFilters>({
    category: null,
    brand: null,
    page: 1,
    limit: 9
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [sort, setSort] = useState<'popular' | 'lowest' | 'highest'>('popular');

  // Extraer categorías, marcas y calcular precio máximo de todos los productos
  const categories = useMemo(() => Array.from(new Set(allProducts.map(p => p.category).filter(Boolean))), [allProducts]);
  const brands = useMemo(() => Array.from(new Set(allProducts.map(p => p.brand).filter(Boolean))), [allProducts]);
  const maxPrice = useMemo(() => Math.max(...allProducts.map(p => p.price), 0), [allProducts]);

  // Obtener productos según los filtros aplicados
  const fetchProducts = useCallback(async (customFilters: SearchFilters) => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = {
        page: customFilters.page || 1,
        limit: customFilters.limit || 9
      };
      
      // Agregar parámetros de filtro si existen
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
      setTotalItems(response?.data?.total || 0);
      
      // Almacenar todos los productos para las opciones de filtro cuando no hay filtros aplicados
      if (!params.q && !params.category && !params.brand && !params.minPrice && !params.maxPrice && !params.color) {
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
    if (filters.page === 1 && !filters.category && !filters.brand) {
      fetchProducts(filters);
    }
  }, [fetchProducts, filters]);

  // Manejar cambios en los filtros y actualizar la lista de productos
  const handleFilter = useCallback((newFilters: SearchFilters) => {
    const updatedFilters = { 
      ...filters, 
      ...newFilters,
      page: newFilters.page || 1 // Reiniciar a página 1 para nuevos filtros
    };
    setFilters(updatedFilters);
    fetchProducts(updatedFilters);
    // Cerrar el panel de filtros en móvil después de aplicar los filtros
    if (window.innerWidth < 768) {
      setIsFilterOpen(false);
    }
  }, [filters, fetchProducts]);

  // Ordenar productos según la opción seleccionada
  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    if (sort === 'lowest') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sort === 'highest') {
      sorted.sort((a, b) => b.price - a.price);
    } else {
      // 'popular' (por defecto, ordenar por rating descendente)
      sorted.sort((a, b) => b.rating - a.rating);
    }
    return sorted;
  }, [products, sort]);

  // Calcular valores de paginación
  const totalPages = Math.ceil(totalItems / (filters.limit || 9));
  const startProduct = totalItems === 0 ? 0 : ((filters.page || 1) - 1) * (filters.limit || 9) + 1;
  const endProduct = Math.min((filters.page || 1) * (filters.limit || 9), totalItems);

  const categoryLabel = filters.category || 'Catálogo de Productos';

  // Manejar cambios de página
  const handlePageChange = (page: number) => {
    const updatedFilters = { ...filters, page };
    setFilters(updatedFilters);
    fetchProducts(updatedFilters);
    // Desplazarse al inicio al cambiar de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cerrar panel de filtros
  const handleCloseFilter = useCallback(() => {
    setIsFilterOpen(false);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 overflow-x-hidden">
      {/* Navegación de migas de pan */}
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Catálogo' }]} />
      <div className="flex flex-col md:flex-row gap-8">
        {/* Botón de Filtros Móvil - Fijo en la esquina inferior derecha en pantallas móviles */}
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="md:hidden fixed bottom-6 right-6 flex items-center gap-2 bg-nightBlue text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-900 transition-colors duration-200 z-[1000]"
        >
          {isFilterOpen ? <X size={20} /> : <Filter size={20} />}
          <span>{isFilterOpen ? 'Cerrar' : 'Filtros'}</span>
        </button>

        {/* Overlay Móvil - Oscurece el fondo cuando el filtro está abierto en móvil */}
        {isFilterOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={handleCloseFilter}
          />
        )}

        {/* Panel Lateral de Filtros - Se desliza desde la derecha en móvil, estático en escritorio */}
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

        {/* Área Principal de Contenido - Cuadrícula de Productos y Controles */}
        <div className="flex-1 min-w-0">
          {/* Sección de Encabezado con Título y Controles */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <h1 className="text-3xl font-extrabold text-nightBlue">{categoryLabel.charAt(0).toUpperCase() + categoryLabel.slice(1)}</h1>
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
              {/* Mostrar Contador de Productos */}
              <span className="text-gray-500 text-base">
                Mostrando {startProduct}-{endProduct} de {totalItems} Productos
              </span>
              {/* Selector de Ordenamiento */}
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
                  {/* Flecha Personalizada del Selector */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de Visualización de Productos */}
          {loading ? (
            <div className="text-center py-20 text-lg text-gray-500">Cargando productos...</div>
          ) : (
            <div>
              {sortedProducts.length > 0 ? (
                <>
                  {/* Cuadrícula de Productos con Animación de Aparición */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProducts.map((product, index) => (
                      <div 
                        key={product._id} 
                        style={{ 
                          opacity: 0,
                          animationName: 'fadeIn',
                          animationDuration: '0.5s',
                          animationTimingFunction: 'ease-in',
                          animationFillMode: 'forwards',
                          animationDelay: `${index * 100}ms`
                        }}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                  {/* Componente de Paginación - Solo se muestra si hay más de una página */}
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

export default ProductsView;
