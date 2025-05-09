/**
 * ShopcartSummary Component
 * 
 * Este componente muestra el resumen del carrito de compras, incluyendo:
 * - Subtotal y cantidad de items
 * - Costo de envío
 * - Total a pagar
 * - Botón de proceder al pago
 * - Métodos de pago aceptados
 * 
 * @param {Object} props - Propiedades del componente
 * @param {number} props.totalItems - Total de items en el carrito
 * @param {number} props.totalPrice - Precio total del carrito
 * @returns {JSX.Element} Componente de resumen del carrito
 */

'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface ShopcartSummaryProps {
  totalItems: number;
  totalPrice: number;
}

const ShopcartSummary: React.FC<ShopcartSummaryProps> = ({ totalItems, totalPrice }) => {
  const handleCheckout = () => {
    // Implement checkout logic
  };

  const formattedPrice = (price: number) => {
    return (price || 0).toFixed(2);
  };

  return (
    <div className="bg-lightGray rounded-2xl p-6 shadow-xl border border-mediumGray">
      <h2 className="text-2xl font-bold text-nightBlue mb-6">
        Resumen del Pedido
      </h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center text-softBlack/80">
          <span>Subtotal ({totalItems} items)</span>
          <span className="text-lg">${formattedPrice(totalPrice)}</span>
        </div>
        
        <div className="flex justify-between items-center text-softBlack/80">
          <span>Envío</span>
          <span className="text-zafire">Gratis</span>
        </div>
        
        <div className="h-px bg-gradient-to-r from-transparent via-mediumGray to-transparent my-6" />
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold text-nightBlue">Total</span>
          <span className="text-2xl font-bold text-zafire">
            ${formattedPrice(totalPrice)}
          </span>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full mt-8 bg-gradient-to-r from-zafire to-deepBlue hover:from-deepBlue hover:to-zafire text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-zafire/20 transition-all duration-300 flex items-center justify-center gap-2 group"
      >
        <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span>Proceder al Pago</span>
      </button>

      <div className="mt-6 text-center">
        <p className="text-sm text-softBlack/60">
          Pago seguro garantizado
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <img src="/visa.svg" alt="Visa" className="h-6" />
          <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
          <img src="/amex.svg" alt="American Express" className="h-6" />
        </div>
      </div>
    </div>
  );
};

export default ShopcartSummary; 