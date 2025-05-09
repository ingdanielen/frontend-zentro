/**
 * Servicio base para realizar peticiones HTTP utilizando Axios
 * Este archivo configura una instancia de Axios con interceptores y métodos HTTP genéricos
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

/**
 * Interfaz para respuestas de error de la API
 */
interface ApiErrorResponse {
  message: string;
  status: number;
  data: unknown;
}

/**
 * Interfaz para datos de error de la API
 */
interface ApiErrorData {
  message?: string;
  [key: string]: unknown;
}

// Configuración base de Axios
const baseConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

console.log('API Base URL:', process.env.NEXT_PUBLIC_API_URL);

// Crear instancia de Axios con la configuración base
const axiosInstance: AxiosInstance = axios.create(baseConfig);

/**
 * Interceptor de peticiones
 * Agrega el token de autenticación a las peticiones si existe
 */
axiosInstance.interceptors.request.use(
  (config) => {
    // Solo en cliente: agrega token si existe
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor de respuestas
 * Maneja los errores de las peticiones y los formatea de manera consistente
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiErrorData>) => {
    if (error.response) {
      // La petición fue realizada y el servidor respondió con un código de estado
      // que está fuera del rango de 2xx
      const errorMessage = error.response.data?.message || error.message;
      return Promise.reject({
        message: errorMessage,
        status: error.response.status,
        data: error.response.data
      } as ApiErrorResponse);
    } else if (error.request) {
      // La petición fue realizada pero no se recibió respuesta
      return Promise.reject({
        message: 'No se recibió respuesta del servidor',
        status: 0,
        data: null
      } as ApiErrorResponse);
    } else {
      // Ocurrió un error al configurar la petición
      return Promise.reject({
        message: 'Error al configurar la petición',
        status: 0,
        data: null
      } as ApiErrorResponse);
    }
  }
);

/**
 * Interfaz genérica para respuestas de la API
 */
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

/**
 * Objeto con métodos HTTP genéricos
 * Cada método maneja las peticiones y formatea las respuestas de manera consistente
 */
const http = {
  /**
   * Realiza una petición GET
   * @param url - URL del endpoint
   * @param config - Configuración opcional de Axios
   * @returns Promise con la respuesta formateada
   */
  get: async function<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.get(url, config);
      return {
        data: response.data,
        status: response.status,
        message: 'Success',
      };
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      throw {
        message: apiError.message || 'Error en la petición GET',
        status: apiError.status || 500,
        data: apiError.data
      } as ApiErrorResponse;
    }
  },

  /**
   * Realiza una petición POST
   * @param url - URL del endpoint
   * @param data - Datos a enviar
   * @param config - Configuración opcional de Axios
   * @returns Promise con la respuesta formateada
   */
  post: async function<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.post(url, data, config);
      return {
        data: response.data,
        status: response.status,
        message: 'Success',
      };
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      throw {
        message: apiError.message || 'Error en la petición POST',
        status: apiError.status || 500,
        data: apiError.data
      } as ApiErrorResponse;
    }
  },

  /**
   * Realiza una petición PUT
   * @param url - URL del endpoint
   * @param data - Datos a enviar
   * @param config - Configuración opcional de Axios
   * @returns Promise con la respuesta formateada
   */
  put: async function<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.put(url, data, config);
      return {
        data: response.data,
        status: response.status,
        message: 'Success',
      };
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      throw {
        message: apiError.message || 'Error en la petición PUT',
        status: apiError.status || 500,
        data: apiError.data
      } as ApiErrorResponse;
    }
  },

  /**
   * Realiza una petición PATCH
   * @param url - URL del endpoint
   * @param data - Datos a enviar
   * @param config - Configuración opcional de Axios
   * @returns Promise con la respuesta formateada
   */
  patch: async function<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.patch(url, data, config);
      return {
        data: response.data,
        status: response.status,
        message: 'Success',
      };
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      throw {
        message: apiError.message || 'Error en la petición PATCH',
        status: apiError.status || 500,
        data: apiError.data
      } as ApiErrorResponse;
    }
  },

  /**
   * Realiza una petición DELETE
   * @param url - URL del endpoint
   * @param config - Configuración opcional de Axios
   * @returns Promise con la respuesta formateada
   */
  delete: async function<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.delete(url, config);
      return {
        data: response.data,
        status: response.status,
        message: 'Success',
      };
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      throw {
        message: apiError.message || 'Error en la petición DELETE',
        status: apiError.status || 500,
        data: apiError.data
      } as ApiErrorResponse;
    }
  },
};

export default http;
