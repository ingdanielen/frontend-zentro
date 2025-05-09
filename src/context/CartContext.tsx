'use client';
import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';
import { CartItem, CartContextType } from '@/types/cart';
import { Product } from '@/types/productType';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';

const CART_STORAGE_KEY = 'zentro_cart';

export const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (context === null) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const totalItems = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [items]);

  const addItem = useCallback((product: Product, quantity: number = 1) => {
    console.log('Intentando añadir al carrito:', { product, quantity, isAuthenticated });
    
    if (!isAuthenticated) {
      console.log('Usuario no autenticado, redirigiendo a login');
      router.push('/login');
      return;
    }

    if (!product || !product._id) {
      console.error('Producto inválido:', product);
      return;
    }

    setItems(currentItems => {
      const existingItem = currentItems.find(item => item._id === product._id);
      
      if (existingItem) {
        console.log('Producto existente, actualizando cantidad');
        return currentItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      console.log('Añadiendo nuevo producto al carrito');
      const newItem: CartItem = {
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        images: product.images,
        quantity
      };
      
      return [...currentItems, newItem];
    });
  }, [isAuthenticated, router]);

  const removeItem = useCallback((id: string) => {
    setItems(currentItems => currentItems.filter(item => item._id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item._id === id ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  }, []);

  const loadCart = useCallback(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }, []);

  const value = useMemo(() => ({
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    loadCart
  }), [items, totalItems, totalPrice, addItem, removeItem, updateQuantity, clearCart, loadCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 