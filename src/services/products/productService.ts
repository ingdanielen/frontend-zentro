import  http  from '../baseRequest';
import { Product, SearchParams } from '../../types/productType';
import { ApiResponse, SearchParameters, ProductApiResponse, SingleProductResponse } from '../../types/apiResponse';      

// Product Service
export const productService = {
  // Search products with filters
  async searchProducts(params: SearchParams = {}): Promise<ProductApiResponse<Product>> {
    try {
      // Build query string from params
      const queryParams = new URLSearchParams();
      // Add pagination params
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      
      // Add search query
      if (params.q) queryParams.append('q', params.q);
      
      // Add additional search params
      if (params.category) queryParams.append('category', params.category);
      if (params.brand) queryParams.append('brand', params.brand);
      // Add any other search parameters here as needed
      
      const response = await http.get(`/items?${queryParams.toString()}`);
      return response.data as ProductApiResponse<Product>;
    } catch (error) {
      console.error('Error al buscar productos:', error);
      throw error;
    }
  },

  // Get product by ID
  async getProductById(id: string): Promise<SingleProductResponse> {
    try {
      const response = await http.get(`/items/${id}`);
      return response.data as SingleProductResponse;
    } catch (error) {
      console.error(`Error al obtener el producto con id ${id}:`, error);
      throw error;
    }
  },

  // Create new product
  async createProduct(product: Omit<Product, '_id' | 'rating' | 'createdAt' | '__v'>, token: string): Promise<Product> {
    try {
      const response = await http.post(`/items`, product, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data as Product;
    } catch (error) {
      console.error('Error al crear el producto:', error);
      throw error;
    }
  },

  // Update existing product
  async updateProduct(id: string, product: Partial<Product>, token: string): Promise<Product> {
    try {
      const response = await http.put(`/items/${id}`, product, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data as Product;
    } catch (error) {
      console.error(`Error al actualizar el producto con id ${id}:`, error);
      throw error;
    }
  },

  // Get search parameters (categories and brands)
  async getSearchParameters(): Promise<SearchParameters> {
    try {
      const response = await http.get(`/search`);
      return response.data as SearchParameters;
    } catch (error) {
      console.error('Error al obtener los parametros de busqueda:', error);
      throw error;
    }
  },

  // Get all system parameters
  async getAllParameters(): Promise<ApiResponse<Record<string, unknown>>> {
    try {
      const response = await http.get(`/parameters`);
      return response.data as ApiResponse<Record<string, unknown>>;
    } catch (error) {
      console.error('Error al obtener todos los parametros:', error);
      throw error;
    }
  },

  // Update parameter count
  async updateParameterCount(updateData: Record<string, unknown>): Promise<ApiResponse<Record<string, unknown>>> {
    try {
      const response = await http.post(`/parameters/update`, updateData);
      return response.data as ApiResponse<Record<string, unknown>>;
    } catch (error) {
      console.error('Error al actualizar el contador de parametros:', error);
      throw error;
    }
  }
};
