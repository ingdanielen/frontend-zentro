import { Product } from "./productType";

export interface PaginationInfo {
  currentPage?: number;
  perPage?: number;
  total?: number;
  totalPages?: number;
}

export interface ProductApiResponse<T> {
  success: boolean;
  message: string;
  data: {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
    data?: T[];
    metadata?: {
      total?: number;
      page?: number;
      limit?: number;
      totalPages?: number;
    };
  }

  export interface ProductResponse {
    products?: Product[];
    pagination?: {
      currentPage?: number;
      perPage?: number;
      total?: number;
      totalPages?: number;
    };
  }

export interface SearchParameters {
    categories?: string[];
    brands?: string[];
}

export interface SingleProductResponse {
  success: boolean;
  message: string;
  data: Product;
}