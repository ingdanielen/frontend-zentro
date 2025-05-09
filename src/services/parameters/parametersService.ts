import { ProductApiResponse } from '../../types/apiResponse';
import { SearchParams } from '../../types/productType';
import http from '../baseRequest';  

// Product Service
export const parametersService = {
  // Search products with filters
  async searchParameters(): Promise<ProductApiResponse<SearchParams>> {
    try {
      const response = await http.get(`/search`);
      return response.data as ProductApiResponse<SearchParams>;
    } catch (error) {
      console.error('Error al buscar productos:', error);
      throw error;
    }
  },
};
