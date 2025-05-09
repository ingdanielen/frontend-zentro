'use client';
import LoadingFade from '@/components/UX-UI/LoadingFade';
import { useAppSelector } from '@/store/hooks';
import { HelpCircle, LogIn, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ShopcartEmpty from './ShopcartEmpty';
import ShopcartSummary from './ShopcartSummary';
import ShopcartItem from './ShopcartItem';
import { useCart } from '@/hooks/useCart';

const ShopcartView: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { cart, isInitialized } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <LoadingFade isLoading={isLoading}>
        <div className="min-h-screen bg-gradient-to-br from-zentro-dark to-zentro-darker py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-8">
                Inicia sesión para continuar
              </h1>
              <div className="space-y-4">
                <button
                  onClick={() => router.push('/login')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zentro-primary text-white rounded-lg hover:bg-zentro-primary/90 transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  Iniciar Sesión
                </button>
                <div>
                  <button
                    onClick={() => router.push('/register')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-zentro-card/20 text-white rounded-lg hover:bg-zentro-card/30 transition-colors"
                  >
                    <UserPlus className="w-5 h-5" />
                    Crear Cuenta
                  </button>
                </div>
              </div>
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-400">
                  ¿Necesitas ayuda?{' '}
                  <a href="/novedades" className="text-zentro-primary hover:text-zentro-primary/80 transition-colors inline-flex items-center gap-1">
                    <HelpCircle className="w-4 h-4" />
                    Contáctanos
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </LoadingFade>
    );
  }

  if (!isInitialized) {
    return (
      <LoadingFade isLoading={true}>
        <div className="min-h-screen bg-gradient-to-br from-zentro-dark to-zentro-darker py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-8">
                Cargando carrito...
              </h1>
            </div>
          </div>
        </div>
      </LoadingFade>
    );
  }

  return (
    <LoadingFade isLoading={isLoading}>
      <div className="min-h-screen bg-gradient-to-br from-zentro-dark to-zentro-darker py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Tu Carrito de Compras
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-zentro-card/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-zentro-border">
                <div className="space-y-6">
                  {cart.items.length === 0 ? (
                    <ShopcartEmpty />
                  ) : (
                    cart.items.map((item) => (
                      <ShopcartItem key={item._id} item={item} />
                    ))
                  )}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <ShopcartSummary totalItems={cart.totalItems} totalPrice={cart.totalPrice} />
            </div>
          </div>
        </div>
      </div>
    </LoadingFade>
  );
};

export default ShopcartView;
