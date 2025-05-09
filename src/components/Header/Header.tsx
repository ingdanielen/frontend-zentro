"use client";
import { useCart } from "@/hooks/useCart";
import { productService } from '@/services/products/productService';
import { logout } from '@/store/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ApiResponse } from '@/types/apiResponse';
import { SearchParams } from '@/types/parameters';
import { ChevronDown, LogOut, Menu, ShoppingCart, User, UserCircle, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import InputQuery from '../common/InputQuery';

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Categorías", dropdown: true },
  { label: "En venta", href: "/catalogo" },
  { label: "Administración", href: "/admin", adminOnly: true },
  { label: "Novedades", href: "/novedades" },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [categories, setCategories] = useState<SearchParams['categories']>([]);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { cart } = useCart();
  const [showMobileCategories, setShowMobileCategories] = useState(false);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productService.getSearchParameters() as ApiResponse<SearchParams>;
        if (response.success && response.data.categories) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    setUserMenuOpen(false);
    router.push('/login');
  };

  return (
    <header className="w-full">
      {/* Top Banner */}
      <div className="bg-nightBlue text-white text-center py-2 text-sm flex justify-center items-center relative">
        <span>
          App hecha por Daniel Ricardo Escorcia para Zentro.co{" "}
          <Link href="#" className="underline">
            Loguea aquí
          </Link>
        </span>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
          aria-label="Close banner"
        ></button>
      </div>

      {/* Main Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white shadow-sm md:px-24 relative">
        {/* Hamburger for Mobile */}
        <button
          className="md:hidden  mr-2 z-20"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Open menu"
        >
          {mobileMenuOpen ? (
            <X className="text-nightBlue" size={28} />
          ) : (
            <Menu className="text-nightBlue" size={28} />
          )}
        </button>

        {/* Logo */}
        <div className="flex-1 flex justify-start md:static md:pointer-events-auto pointer-events-none items-center md:left-auto md:right-auto">
          <div className="font-extrabold font-integral text-2xl tracking-tight text-nightBlue pointer-events-auto">
            ZENTRO.CO
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 ml-8">
          {navLinks.map((link) => (
            (!link.adminOnly || (link.adminOnly && user?.role === 'admin')) && (
              <div key={link.label} className="relative group">
                {link.href ? (
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 text-base text-gray-800 hover:text-nightBlue focus:outline-none transition-all duration-200 relative ${
                      pathname === link.href
                        ? "text-nightBlue font-medium after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-nightBlue after:rounded-full"
                        : "hover:after:absolute hover:after:bottom-[-8px] hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-nightBlue/50 hover:after:rounded-full"
                    }`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button className="flex items-center gap-1 text-base text-gray-800 hover:text-nightBlue focus:outline-none transition-all duration-200 relative hover:after:absolute hover:after:bottom-[-8px] hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-nightBlue/50 hover:after:rounded-full">
                    {link.label}
                    {link.dropdown && <ChevronDown className="ml-1" size={16} />}
                  </button>
                )}
                {/* Dropdown example (now flex-wrap) */}
                {link.dropdown && (
                  <div className="fixed left-0 right-0 mt-4 bg-white border-t border-gray-100 shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                      <div className="flex flex-wrap gap-4">
                        {categories.map((category) => (
                          <Link 
                            key={category.name} 
                            href={`/categoria/${encodeURIComponent(category.name)}`}
                            className="group/category px-5 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-800 group-hover/category:text-nightBlue transition-colors duration-200">
                                {category.name}
                              </span>
                            </div>
                          </Link> 
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          ))}
        </nav>

        {/* Search Bar (desktop only) */}
        <div className="flex-1 mx-6 max-w-xl hidden md:flex">
          <InputQuery limit={8} />
        </div>

        {/* Icons (right for mobile and desktop) */}
        <div className="flex items-center gap-4 md:gap-6 ml-auto md:ml-0 z-20">
          <Link href="/carrito" className="relative">
            <ShoppingCart className="cursor-pointer text-gray-800 w-7 h-7 md:w-8 md:h-8 hover:text-nightBlue hover:border hover:border-nightBlue hover:bg-gray-200 rounded-full p-1 transition-all duration-300" />
            {cart.totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-nightBlue text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.totalItems}
              </span>
            )}
          </Link>
          
          {isAuthenticated ? (
            <div className="relative user-menu-container">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 text-gray-800 hover:text-nightBlue transition-colors duration-300"
              >
                <div className="relative">
                  <UserCircle className="w-8 h-8 md:w-9 md:h-9 text-nightBlue" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <span className="hidden md:block text-sm font-medium">{user?.name}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <User className="cursor-pointer text-gray-800 w-7 h-7 md:w-8 md:h-8 border border-gray-700 rounded-full p-1 hover:text-nightBlue hover:border-nightBlue hover:bg-gray-200 transition-all duration-300" />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Dropdown/Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          mobileMenuOpen
            ? "bg-black bg-opacity-30"
            : "bg-black bg-opacity-0 pointer-events-none"
        } flex`}
      >
        <div
          className={`w-3/4 max-w-xs bg-white shadow-lg px-6 py-6 flex flex-col gap-4 h-full transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <span className="font-extrabold font-integral text-xl text-nightBlue">
              ZENTRO.CO
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          {navLinks.map((link) => {
            if (link.adminOnly && user?.role !== 'admin') return null;
            if (link.dropdown) {
              return (
                <div key={link.label}>
                  <button
                    className={`w-full text-left text-base font-medium py-1 flex items-center gap-2 hover:text-nightBlue transition-all duration-200 relative ${
                      showMobileCategories ? 'text-nightBlue font-medium border-l-4 border-nightBlue bg-gray-50 pl-3' : 'text-black border-l-4 border-transparent pl-3'
                    }`}
                    onClick={() => setShowMobileCategories(!showMobileCategories)}
                  >
                    {link.label}
                    <ChevronDown className={`ml-1 transition-transform duration-200 ${showMobileCategories ? 'rotate-180' : ''}`} size={16} />
                  </button>
                  <div
                    className={`pl-6 flex flex-col gap-1 mt-1 overflow-hidden transition-all duration-300 ease-in-out ${showMobileCategories ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    style={{ transitionProperty: 'max-height, opacity' }}
                  >
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={`/categoria/${encodeURIComponent(category.name)}`}
                        className="text-gray-700 hover:text-nightBlue py-1"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={link.label}
                href={link.href || "#"}
                className={`text-left text-base font-medium py-1 flex items-center gap-2 hover:text-nightBlue transition-all duration-200 ${
                  pathname === link.href
                    ? "text-nightBlue font-medium border-l-4 border-nightBlue bg-gray-50 pl-3"
                    : "text-black border-l-4 border-transparent pl-3"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-2 mt-4">
            <InputQuery limit={8} />
          </div>
          <div className="flex items-center gap-4 mt-6">
            <Link href="/cart">
              <ShoppingCart className="cursor-pointer text-gray-800 w-7 h-7 border border-gray-300 rounded-full p-1" />
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <User className="w-7 h-7 border border-gray-300 rounded-full p-1" />
                <span className="text-sm font-medium">{user?.name}</span>
              </div>
            ) : (
              <Link href="/login">
                <User className="cursor-pointer text-gray-800 w-7 h-7 border border-gray-300 rounded-full p-1" />
              </Link>
            )}
          </div>
        </div>
        <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
      </div>
    </header>
  );
};

export default Header;
