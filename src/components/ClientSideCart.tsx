'use client';

import { CartProvider } from '@/context/CartContext';
import  ShopcartView from '@/pages/Shopcart/ShopcartView';

export default function ClientSideCart() {
    return (
        <CartProvider>
            <ShopcartView />    
        </CartProvider>
    );
} 