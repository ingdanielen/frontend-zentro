import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/productType';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link 
      href={`/catalogo/${product._id}`} 
      className="group"
    >
      <div className="rounded-2xl p-4 w-full flex flex-col items-start transition-all duration-300 hover:bg-gray-50 hover:scale-[1.02] bg-white">
        <div className="w-full bg-[#f6f4f4] rounded-2xl py-4 px-5 flex justify-center items-center mb-4">
          <img
            src={product.images}
            alt={product.name}
            className="w-40 h-40 object-contain rounded-lg bg-white transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="text-base font-bold mb-2 text-gray-900 line-clamp-2">{product.name}</div>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(i => (
              <svg
                key={i}
                className={`w-5 h-5 ${i <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-700">{product.rating.toFixed(1)}/5</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-nightBlue">${product.price.toLocaleString('es-CO')}</span>
          <span className="text-sm text-gray-700 line-through">${(product.price * 1.1).toLocaleString('es-CO')}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 