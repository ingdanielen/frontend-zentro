'use client';

import { CartItem } from '@/types/cart';
import { Trash2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import LoadingFade from '@/components/UX-UI/LoadingFade';
import { useCart } from '@/hooks/useCart';

interface ShopcartItemProps {
  item: CartItem;
}

const ShopcartItem: React.FC<ShopcartItemProps> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular una pequeña carga para mostrar la animación
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(item._id, newQuantity);
    }
  };

  // Si no hay item, no renderizamos nada
  if (!item) {
    return null;
  }

  return (
    <LoadingFade isLoading={isLoading}>
      <div className="group relative bg-zentro-card/5 hover:bg-zentro-card/10 transition-all duration-300 rounded-xl p-4">
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 flex-shrink-0">
            {item?.images && (
              <img
                src={item.images}
                alt={item.name || 'Product image'}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-white truncate">
              {item?.name || 'Producto sin nombre'}
            </h3>
            <p className="text-sm text-zentro-text/70 line-clamp-2 mt-1">
              {item?.description || 'Sin descripción'}
            </p>
            <div className="mt-2 flex items-center gap-4">
              <span className="text-xl font-bold text-zentro-primary">
                ${(item?.price || 0).toFixed(2)}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-zentro-card/20 text-white hover:bg-zentro-primary/20 transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  value={item?.quantity || 0}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  min="1"
                  className="w-16 text-center bg-transparent text-white border border-zentro-border rounded-lg focus:outline-none focus:border-zentro-primary"
                />
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-zentro-card/20 text-white hover:bg-zentro-primary/20 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => removeFromCart(item._id)}
            className="p-2 text-zentro-text/50 hover:text-red-500 transition-colors"
            aria-label="remove item"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </LoadingFade>
  );
};

export default ShopcartItem; 