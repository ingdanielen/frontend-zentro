'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { loginService } from '@/services/loginService';
import { LoginCredentials } from '@/types/authResponse';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/features/authSlice';
import Input from '@/components/UX-UI/Input';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user.role === 'admin') {
            router.push('/admin');
          } else {
            router.push('/carrito');
          }
        } catch (e) {
          console.error('Error parsing user from localStorage:', e);
          router.push('/carrito');
        }
      } else {
        router.push('/carrito');
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const credentials: LoginCredentials = { email, password };
      const response = await loginService.login(credentials);
      
      if (response.success) {
        localStorage.setItem('token', response.data.token);
        dispatch(setCredentials(response.data));
        if (response.data.user.role === 'admin') {
          router.push("/admin");
        } else {
          router.push("/carrito");
        }
      } else {
        setError(response.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error al iniciar sesión. Por favor, intente nuevamente.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-5 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
        <div className="text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-nightBlue mb-2">
              Bienvenido de nuevo
            </h2>
            <p className="text-gray-600 text-sm">
              Inicia sesión para continuar tu viaje
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
            />

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600" 
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-nightBlue focus:ring-nightBlue border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 text-gray-600">
                Recordarme
              </label>
            </div>

            <a href="#" className="text-nightBlue hover:text-nightBlue/80 transition-colors duration-300">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-nightBlue text-white rounded-2xl font-semibold hover:bg-nightBlue/90 focus:outline-none focus:ring-2 focus:ring-nightBlue/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
            ) : (
              "Iniciar sesión"
            )}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                O continuar con
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-200 rounded-2xl bg-white text-gray-700 hover:bg-gray-50 transition-all duration-300"
            >
              <span className="sr-only">Iniciar sesión con Google</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
            </button>

            <button
              type="button"
              className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-200 rounded-2xl bg-white text-gray-700 hover:bg-gray-50 transition-all duration-300"
            >
              <span className="sr-only">Iniciar sesión con GitHub</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
