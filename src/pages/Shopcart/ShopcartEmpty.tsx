'use client';

import { ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const ShopcartEmpty: React.FC = () => {


  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="relative">
        <div className="absolute inset-0  blur-3xl rounded-full" />
        <div className="relative bg-zentro-card/10 backdrop-blur-lg p-8 rounded-2xl border border-zentro-border">
          <ShoppingBag className="w-24 h-24 text-gray-500 mx-auto mb-6" />
          
          <h2 className="text-3xl font-bold text-gray-500 mb-4">
            Tu carrito está vacío
          </h2>
          
          <p className="text-gray-500 text-lg mb-8 max-w-sm px-8">
            Parece que aún no has agregado productos a tu carrito de compras
          </p>

          <Link
            href="/catalogo"
            className="bg-nightBlue  hover:from-nightBlue/90 hover:to-nightBlue/70 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-nightBlue/20 transition-all duration-300 inline-flex items-center gap-2 group"
          >
            <span>Explorar Productos</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShopcartEmpty; 