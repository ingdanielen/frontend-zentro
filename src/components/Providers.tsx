/**
 * Providers Component
 * 
 * Este es un componente de alto nivel que proporciona los contextos y providers
 * necesarios para toda la aplicación. Actúa como un wrapper que envuelve la aplicación
 * con:
 * - Redux Provider para el manejo del estado global
 * - AuthInitializer para la inicialización de la autenticación
 * 
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso a los providers
 * @returns {JSX.Element} Componente con los providers configurados
 */

'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { AuthInitializer } from './AuthInitializer';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer />
      {children}
    </Provider>
  );
} 