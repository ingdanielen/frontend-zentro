import  http  from '../baseRequest';
import { Product, SearchParams } from '../../types/productType';
import { ApiResponse, PaginatedResponse, SearchParameters, ProductApiResponse } from '../../types/apiResponse';      

// Product Service
export const productService = {
  // Search products with filters
  async searchProducts(params: SearchParams = {}): Promise<ProductApiResponse<Product>> {
    try {
      const response = await http.get(`/items`, { params });
      return response.data as ProductApiResponse<Product>;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  // Get product by ID
  async getProductById(id: string): Promise<Product> {
    try {
      const response = await http.get(`/items/${id}`);
      return response.data as Product;
    } catch (error) {
      console.error(`Error getting product with id ${id}:`, error);
      throw error;
    }
  },

  // Create new product
  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    try {
      const response = await http.post(`/items`, product);
      return response.data as Product;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update existing product
  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    try {
      const response = await http.put(`/items/${id}`, product);
      return response.data as Product;
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error);
      throw error;
    }
  },

  // Get search parameters (categories and brands)
  async getSearchParameters(): Promise<SearchParameters> {
    try {
      const response = await http.get(`/search`);
      return response.data as SearchParameters;
    } catch (error) {
      console.error('Error getting search parameters:', error);
      throw error;
    }
  },

  // Get all system parameters
  async getAllParameters(): Promise<ApiResponse<any>> {
    try {
      const response = await http.get(`/parameters`);
      return response.data as ApiResponse<any>;
    } catch (error) {
      console.error('Error getting all parameters:', error);
      throw error;
    }
  },

  // Update parameter count
  async updateParameterCount(updateData: any): Promise<ApiResponse<any>> {
    try {
      const response = await http.post(`/parameters/update`, updateData);
      return response.data as ApiResponse<any>;
    } catch (error) {
      console.error('Error updating parameter count:', error);
      throw error;
    }
  }
};
