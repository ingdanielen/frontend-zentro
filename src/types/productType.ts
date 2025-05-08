export interface Product {
    _id: string;
    active: boolean;
    name: string;
    stock: number;
    width: number;
    height: number;
    weight: number;
    color: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    images: string;
    rating: number;
    createdAt: string;
    __v: number;
  }

  
export interface SearchParams {
  q?: string;
  page?: number;
  limit?: number;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  stock?: number;
  width?: number;
  height?: number;
  weight?: number;
  price?: number;
  rating?: number;
}
