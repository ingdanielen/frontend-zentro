import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface ApiErrorResponse {
  message: string;
  status: number;
  data: unknown;
}

interface ApiErrorData {
  message?: string;
  [key: string]: unknown;
}

// Define base configuration
const baseConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

console.log('API Base URL:', process.env.NEXT_PUBLIC_API_URL);

// Create axios instance
const axiosInstance: AxiosInstance = axios.create(baseConfig);

// Request interceptor
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

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiErrorData>) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const errorMessage = error.response.data?.message || error.message;
      return Promise.reject({
        message: errorMessage,
        status: error.response.status,
        data: error.response.data
      } as ApiErrorResponse);
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject({
        message: 'No se recibió respuesta del servidor',
        status: 0,
        data: null
      } as ApiErrorResponse);
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject({
        message: 'Error al configurar la petición',
        status: 0,
        data: null
      } as ApiErrorResponse);
    }
  }
);

// Generic response type
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// HTTP Methods
const http = {
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
