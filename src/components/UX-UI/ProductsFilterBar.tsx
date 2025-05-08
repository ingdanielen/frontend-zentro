import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterState {
  category: string | null;
  brand: string | null;
  minPrice?: number;
  maxPrice?: number;
}

interface ProductsFilterBarProps {
  categories: string[];
  brands: string[];
  maxPrice: number;
  onFilter: (filters: FilterState) => void;
}

const ProductsFilterBar: React.FC<ProductsFilterBarProps> = ({ 
  categories, 
  brands, 
  maxPrice,
  onFilter 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(maxPrice);

  const [openSections, setOpenSections] = useState({
    category: true,
    brand: true,
    price: true,
    colors: true
  });

  const hasActiveFilters = selectedCategory !== null || 
                         selectedBrand !== null || 
                         minPrice > 0 || 
                         maxPriceFilter < maxPrice;

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = Number(e.target.value);
    if (type === 'min') {
      if (value <= maxPriceFilter) {
        setMinPrice(value);
      }
    } else {
      if (value >= minPrice) {
        setMaxPriceFilter(value);
      }
    }
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
    setMinPrice(0);
    setMaxPriceFilter(maxPrice);
    onFilter({
      category: null,
      brand: null,
      minPrice: 0,
      maxPrice: maxPrice,
    });
  };

  const handleApply = () => {
    const newFilters = {
      category: selectedCategory,
      brand: selectedBrand,
      minPrice: minPrice > 0 ? minPrice : undefined,
      maxPrice: maxPriceFilter < maxPrice ? maxPriceFilter : undefined,
    };
    onFilter(newFilters);
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(value);
  };

  useEffect(() => {
    if (maxPriceFilter > maxPrice) {
      setMaxPriceFilter(maxPrice);
    }
  }, [maxPrice, maxPriceFilter]);

  return (
    <aside className="w-full md:w-64 bg-white rounded-2xl p-6 shadow-sm text-gray-700 border mb-8 md:mb-0 md:mr-8">
      <h2 className="font-bold text-lg mb-4">Filtros</h2>
      
      {/* Categorías */}
      <div className="mb-4 border-b pb-4">
        <button 
          className="w-full flex justify-between items-center font-semibold mb-2 transition-colors duration-200 hover:text-nightBlue"
          onClick={() => toggleSection('category')}
        >
          <span>Categorías</span>
          <div className="transform transition-transform duration-200">
            {openSections.category ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </button>
        <div className={`grid transition-all duration-300 ease-in-out ${openSections.category ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <div className="flex flex-wrap gap-2 py-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`px-3 py-1 rounded-full text-sm border transition-all duration-200 truncate max-w-full ${
                    selectedCategory === cat 
                      ? 'bg-nightBlue text-white border-nightBlue' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marcas */}
      <div className="mb-4 border-b pb-4">
        <button 
          className="w-full flex justify-between items-center font-semibold mb-2 transition-colors duration-200 hover:text-nightBlue"
          onClick={() => toggleSection('brand')}
        >
          <span>Marcas</span>
          <div className="transform transition-transform duration-200">
            {openSections.brand ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </button>
        <div className={`grid transition-all duration-300 ease-in-out ${openSections.brand ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <div className="flex flex-wrap gap-2 py-2">
              {brands.map((brand) => (
                <button
                  key={brand}
                  className={`px-3 py-1 rounded-full text-sm border transition-all duration-200 truncate max-w-full ${
                    selectedBrand === brand 
                      ? 'bg-nightBlue text-white border-nightBlue' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Precio */}
      <div className="mb-4 border-b pb-4">
        <button 
          className="w-full flex justify-between items-center font-semibold mb-2 transition-colors duration-200 hover:text-nightBlue"
          onClick={() => toggleSection('price')}
        >
          <span>Precio</span>
          <div className="transform transition-transform duration-200">
            {openSections.price ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </button>
        <div className={`grid transition-all duration-300 ease-in-out ${openSections.price ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Desde</label>
                  <input
                    type="number"
                    min={0}
                    max={maxPriceFilter}
                    value={minPrice}
                    onChange={e => setMinPrice(Number(e.target.value))}
                    className="w-full px-2 py-1 border rounded text-sm transition-all duration-200 focus:border-nightBlue focus:ring-1 focus:ring-nightBlue focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Hasta</label>
                  <input
                    type="number"
                    min={minPrice}
                    max={maxPrice}
                    value={maxPriceFilter}
                    onChange={e => setMaxPriceFilter(Number(e.target.value))}
                    className="w-full px-2 py-1 border rounded text-sm transition-all duration-200 focus:border-nightBlue focus:ring-1 focus:ring-nightBlue focus:outline-none"
                  />
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Rango: {formatPrice(minPrice)} - {formatPrice(maxPriceFilter)}
              </div>
              <div className="relative pt-6 pb-2">
                <div className="relative h-2 bg-gray-200 rounded-full">
                  <div 
                    className="absolute h-2 bg-nightBlue rounded-full"
                    style={{
                      left: `${(minPrice / maxPrice) * 100}%`,
                      right: `${100 - (maxPriceFilter / maxPrice) * 100}%`
                    }}
                  />
                  <input
                    type="range"
                    min={0}
                    max={maxPrice}
                    step={1000}
                    value={minPrice}
                    onChange={(e) => handleRangeChange(e, 'min')}
                    className="absolute w-full h-2 opacity-0 cursor-pointer"
                  />
                  <input
                    type="range"
                    min={0}
                    max={maxPrice}
                    step={1000}
                    value={maxPriceFilter}
                    onChange={(e) => handleRangeChange(e, 'max')}
                    className="absolute w-full h-2 opacity-0 cursor-pointer"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">{formatPrice(0)}</span>
                  <span className="text-xs text-gray-500">{formatPrice(maxPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="space-y-2">
        <button
          className="w-full bg-nightBlue text-white py-2 rounded-full font-semibold hover:bg-blue-900 transition-all duration-200 transform hover:scale-[1.02]"
          onClick={handleApply}
        >
          Aplicar Filtros
        </button>
        {hasActiveFilters && (
          <button
            className="w-full border border-gray-300 text-gray-700 py-2 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-[1.02]"
            onClick={handleClearFilters}
          >
            Limpiar Filtros
          </button>
        )}
      </div>
    </aside>
  );
};

export default ProductsFilterBar; 