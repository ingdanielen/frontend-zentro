import { CartItem } from '@/types/cart';
import { Product } from '@/types/productType';
import { useState, useEffect } from 'react';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCart = () => {
  const [cart, setCart] = useState<CartState>(initialState);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on client-side only
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart({
          items: parsedCart.items || [],
          totalItems: parsedCart.totalItems || 0,
          totalPrice: parsedCart.totalPrice || 0,
        });
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        setCart(initialState);
      }
    }
    setIsInitialized(true);
  }, []);

  const updateCart = (newCart: CartState) => {
    setCart(newCart);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const addToCart = (product: Product, quantity: number) => {
    const existingItem = cart.items.find(item => item._id === product._id);
    let newItems: CartItem[];

    if (existingItem) {
      newItems = cart.items.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      const newItem: CartItem = {
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        images: product.images,
        quantity
      };
      newItems = [...cart.items, newItem];
    }

    const newCart = {
      items: newItems,
      totalItems: newItems.reduce((total, item) => total + item.quantity, 0),
      totalPrice: newItems.reduce((total, item) => total + (item.price * item.quantity), 0),
    };

    updateCart(newCart);
  };

  const removeFromCart = (productId: string) => {
    const newItems = cart.items.filter(item => item._id !== productId);
    const newCart = {
      items: newItems,
      totalItems: newItems.reduce((total, item) => total + item.quantity, 0),
      totalPrice: newItems.reduce((total, item) => total + (item.price * item.quantity), 0),
    };

    updateCart(newCart);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const newItems = cart.items.map(item =>
      item._id === productId
        ? { ...item, quantity }
        : item
    );

    const newCart = {
      items: newItems,
      totalItems: newItems.reduce((total, item) => total + item.quantity, 0),
      totalPrice: newItems.reduce((total, item) => total + (item.price * item.quantity), 0),
    };

    updateCart(newCart);
  };

  const clearCart = () => {
    updateCart(initialState);
  };

  return {
    cart,
    isInitialized,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}; 