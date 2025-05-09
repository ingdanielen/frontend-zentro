/**
 * AuthInitializer Component
 * 
 * Este componente se encarga de inicializar el estado de autenticación
 * al cargar la aplicación. Verifica si existe un token y datos de usuario
 * en localStorage y los carga en el estado de Redux.
 * 
 * Es un componente funcional que no renderiza nada (retorna null) ya que
 * su única función es ejecutar la inicialización de la autenticación.
 * 
 * @returns {null} No renderiza ningún elemento
 */

'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { initializeAuth } from '@/store/features/authSlice';

export const AuthInitializer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return null;
}; 