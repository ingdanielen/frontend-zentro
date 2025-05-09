import { productService } from '@/services/products/productService';
import { Product } from '@/types/productType';
import { Loader2, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState, useCallback } from 'react';

interface InputQueryProps {
  limit: number;
}

const InputQuery: React.FC<InputQueryProps> = ({ limit }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const performSearch = useCallback(async (term: string) => {
    if (!term.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const response = await productService.searchProducts({ q: term, page: 1, limit });
      if (response.success) {
        setResults(response.data.items);
        setIsOpen(true);
      } else {
        setResults([]);
        setError('No se encontraron productos.');
      }
    } catch {
      setResults([]);
      setError('Error al buscar productos.');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (searchTerm.trim()) {
      timeoutRef.current = setTimeout(() => {
        performSearch(searchTerm);
      }, 300);
    } else {
      setResults([]);
      setIsOpen(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchTerm, performSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      setIsOpen(true);
    }
  };

  const handleProductClick = (productId: string) => {
    setIsOpen(false);
    router.push(`/catalogo/${productId}`);
  };

  return (
    <div className="w-full relative" ref={containerRef}>
      <div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-2">
        <Search className="text-gray-400 mr-2" size={20} />
        <input
          type="text"
          placeholder="Buscar productos..."
          className="bg-transparent outline-none text-gray-800 w-full text-base"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => searchTerm.trim() && setIsOpen(true)}
        />
      </div>
      {isOpen && (
        <div className="absolute w-full bg-white shadow-lg rounded-lg p-2 mt-1 max-h-64 overflow-y-auto z-50">
          {loading ? (
            <div className="flex items-center justify-center py-2">
              <Loader2 className="w-4 h-4 text-gray-500 animate-spin mr-2" />
              <span className="text-sm text-gray-500">Buscando...</span>
            </div>
          ) : error ? (
            <div className="text-sm text-red-500 py-2 px-2">{error}</div>
          ) : results.length > 0 ? (
            <ul>
              {results.map(product => (
                <li 
                  key={product._id} 
                  className="py-1 px-2 hover:bg-gray-100 text-gray-800 rounded text-sm cursor-pointer"
                  onClick={() => handleProductClick(product._id)}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          ) : searchTerm.trim() && (
            <div className="text-sm text-gray-500 py-2 px-2">No se encontraron resultados</div>
          )}
        </div>
      )}
    </div>
  );
};

export default InputQuery; 