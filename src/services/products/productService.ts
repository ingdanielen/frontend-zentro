import  http  from '../baseRequest';
import { Product, SearchParams } from '../../types/productType';
import { ApiResponse, SearchParameters, ProductApiResponse, SingleProductResponse } from '../../types/apiResponse';      

/**
 * Servicio de Productos
 * Este servicio maneja todas las operaciones relacionadas con productos
 * incluyendo búsqueda, creación, actualización y obtención de parámetros
 */
export const productService = {
  /**
   * Busca productos con filtros
   * @param params - Parámetros de búsqueda (página, límite, categoría, marca, etc.)
   * @returns Promise con la respuesta de la API conteniendo los productos
   */
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

  /**
   * Obtiene un producto específico por su ID
   * @param id - ID del producto a buscar
   * @returns Promise con la información del producto
   */
  async getProductById(id: string): Promise<SingleProductResponse> {
    try {
      const response = await http.get(`/items/${id}`);
      return response.data as SingleProductResponse;
    } catch (error) {
      console.error(`Error al obtener el producto con id ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crea un nuevo producto en el sistema
   * @param product - Datos del producto a crear (sin ID ni campos generados)
   * @param token - Token de autenticación
   * @returns Promise con el producto creado
   */
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

  /**
   * Actualiza un producto existente
   * @param id - ID del producto a actualizar
   * @param product - Datos actualizados del producto
   * @param token - Token de autenticación
   * @returns Promise con el producto actualizado
   */
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

  /**
   * Obtiene los parámetros de búsqueda disponibles
   * (categorías y marcas)
   * @returns Promise con los parámetros de búsqueda
   */
  async getSearchParameters(): Promise<SearchParameters> {
    try {
      const response = await http.get(`/search`);
      return response.data as SearchParameters;
    } catch (error) {
      console.error('Error al obtener los parametros de busqueda:', error);
      throw error;
    }
  },

  /**
   * Obtiene todos los parámetros del sistema
   * @returns Promise con todos los parámetros del sistema
   */
  async getAllParameters(): Promise<ApiResponse<Record<string, unknown>>> {
    try {
      const response = await http.get(`/parameters`);
      return response.data as ApiResponse<Record<string, unknown>>;
    } catch (error) {
      console.error('Error al obtener todos los parametros:', error);
      throw error;
    }
  },

  /**
   * Actualiza el contador de parámetros
   * @param updateData - Datos para actualizar el contador
   * @returns Promise con la respuesta de la actualización
   */
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
