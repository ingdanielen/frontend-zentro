/**
 * Auth Slice
 * 
 * Este slice de Redux maneja el estado de autenticación de la aplicación.
 * Incluye la gestión de:
 * - Usuario autenticado
 * - Token de autenticación
 * - Estado de autenticación
 * - Persistencia en localStorage
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from '@/types/authResponse';

/**
 * Interfaz que define la estructura de un usuario
 */
interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

/**
 * Interfaz que define el estado de autenticación
 */
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

/**
 * Estado inicial del slice de autenticación
 */
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isInitialized: false,
};

/**
 * Slice de Redux para manejar la autenticación
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Inicializa el estado de autenticación desde localStorage
     * @param {AuthState} state - Estado actual de autenticación
     */
    initializeAuth: (state) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        if (token && userStr) {
          try {
            const user = JSON.parse(userStr);
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
          } catch (e) {
            console.error('Error parsing user from localStorage:', e);
          }
        }
      }
      state.isInitialized = true;
    },

    /**
     * Establece las credenciales del usuario después del login
     * @param {AuthState} state - Estado actual de autenticación
     * @param {PayloadAction<LoginResponse['data']>} action - Datos de la respuesta del login
     */
    setCredentials: (state, action: PayloadAction<LoginResponse['data']>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      }
    },

    /**
     * Cierra la sesión del usuario
     * @param {AuthState} state - Estado actual de autenticación
     */
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },
  },
});

export const { setCredentials, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;