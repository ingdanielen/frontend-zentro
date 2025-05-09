/**
 * CartContext
 * 
 * Este contexto proporciona la funcionalidad del carrito de compras para toda la aplicación.
 * Maneja el estado del carrito, incluyendo:
 * - Añadir/eliminar productos
 * - Actualizar cantidades
 * - Calcular totales
 * - Persistencia en localStorage
 * - Integración con autenticación
 */

'use client';
import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';
import { CartItem, CartContextType } from '@/types/cart';
import { Product } from '@/types/productType';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';

/** Clave para almacenar el carrito en localStorage */
const CART_STORAGE_KEY = 'zentro_cart';

/** Contexto del carrito de compras */
export const CartContext = createContext<CartContextType | null>(null);

/**
 * Hook personalizado para acceder al contexto del carrito
 * @throws {Error} Si se usa fuera de un CartProvider
 * @returns {CartContextType} El contexto del carrito
 */
export const useCart = () => {
  const context = React.useContext(CartContext);
  if (context === null) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

/**
 * Proveedor del contexto del carrito
 * 
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto
 * @returns {JSX.Element} Proveedor del contexto del carrito
 */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  /**
   * Efecto para cargar el carrito desde localStorage al montar el componente
   */
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

  /**
   * Efecto para guardar el carrito en localStorage cuando cambia
   */
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  /**
   * Calcula el total de items en el carrito
   */
  const totalItems = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  /**
   * Calcula el precio total del carrito
   */
  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [items]);

  /**
   * Añade un producto al carrito
   * @param {Product} product - Producto a añadir
   * @param {number} quantity - Cantidad a añadir (por defecto 1)
   */
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

  /**
   * Elimina un producto del carrito
   * @param {string} id - ID del producto a eliminar
   */
  const removeItem = useCallback((id: string) => {
    setItems(currentItems => currentItems.filter(item => item._id !== id));
  }, []);

  /**
   * Actualiza la cantidad de un producto en el carrito
   * @param {string} id - ID del producto
   * @param {number} quantity - Nueva cantidad
   */
  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item._id === id ? { ...item, quantity } : item
      )
    );
  }, []);

  /**
   * Limpia todo el carrito
   */
  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  }, []);

  /**
   * Carga el carrito desde localStorage
   */
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

  // Valor del contexto memoizado
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