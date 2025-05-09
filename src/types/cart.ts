import { Product } from './productType';

export interface CartItem extends Pick<Product, '_id' | 'name' | 'description' | 'price' | 'images'> {
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  loadCart: () => void;
} 