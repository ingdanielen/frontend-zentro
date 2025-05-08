import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

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
  (error: AxiosError) => {
    // Handle different error status codes
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handle unauthorized
          break;
        case 403:
          // Handle forbidden
          break;
        case 404:
          // Handle not found
          break;
        case 500:
          // Handle server error
          break;
      }
    }
    return Promise.reject(error);
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
      throw error;
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
      throw error;
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
      throw error;
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
      throw error;
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
      throw error;
    }
  },
};

export default http;
