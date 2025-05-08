"use client";
import React, { useState } from "react";
import { Menu, X, ShoppingCart, User, Search, ArrowDown } from "lucide-react";
import Link from "next/link";
const navLinks = [
  { label: "Categorías", dropdown: true },
  { label: "En venta" },
  { label: "Ofertas" },
  { label: "Novedades" },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Top Banner */}
      <div className="bg-nightBlue text-white text-center py-2 text-sm flex justify-center items-center relative">
        <span>
          App hecha por Daniel Ricardo Escorcia para Zentro.co{" "}
          <a href="#" className="underline">
            Loguea aquí
          </a>
        </span>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
          aria-label="Close banner"
        >
        </button>
      </div>

      {/* Main Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white shadow-sm md:px-24 relative">
        {/* Hamburger for Mobile */}
        <button
          className="md:hidden  mr-2 z-20"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Open menu"
        >
          {mobileMenuOpen ? <X className="text-nightBlue"    size={28} /> : <Menu className="text-nightBlue" size={28} />}
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
            <div key={link.label} className="relative group">
              <button className="flex items-center gap-1 text-base text-gray-800 hover:text-nightBlue focus:outline-none">
                {link.label}
                {link.dropdown && <ArrowDown className="ml-1" size={16} />}
              </button>
              {/* Dropdown example (not functional) */}
              {link.dropdown && (
                <div className="absolute text-nightBlue left-0 mt-2 bg-white shadow-lg rounded-md min-w-[120px] z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform origin-top scale-95 group-hover:scale-100 transition-all duration-200 ease-out">
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Category 1
                  </Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Category 2
                  </Link>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Search Bar (desktop only) */}
        <div className="flex-1 mx-6 max-w-xl hidden md:flex">
          <div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-2">
            <Search className="text-gray-400 mr-2" size={20} />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="bg-transparent outline-none text-gray-800 w-full text-base"
            />
          </div>
        </div>

        {/* Icons (right for mobile and desktop) */}
        <div className="flex items-center gap-4 md:gap-6 ml-auto md:ml-0 z-20">

          <Link href="/cart">
            <ShoppingCart className="cursor-pointer text-gray-800 w-7 h-7 md:w-8 md:h-8 hover:text-nightBlue hover:border hover:border-nightBlue hover:bg-gray-200 rounded-full p-1 transition-all duration-300" />
          </Link>
          <Link href="/login">
            <User className="cursor-pointer text-gray-800 w-7 h-7 md:w-8 md:h-8 border border-gray-700 rounded-full p-1 hover:text-nightBlue hover:border-nightBlue hover:bg-gray-200 transition-all duration-300" />
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown/Sidebar */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 ${mobileMenuOpen ? 'bg-black bg-opacity-30' : 'bg-black bg-opacity-0 pointer-events-none'} flex`}>
        <div className={`w-3/4 max-w-xs bg-white shadow-lg px-6 py-6 flex flex-col gap-4 h-full transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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
          {navLinks.map((link) => (
            <button
              key={link.label}
              className="text-left text-base font-medium text-black py-2 border-b border-gray-100"
            >
              {link.label}
            </button>
          ))}
          <div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-2 mt-4">
            <Search className="text-gray-400 mr-2" size={20} />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="bg-transparent outline-none w-full text-base "
            />
          </div>
          <div className="flex items-center gap-4 mt-6">
            <Link href="/cart">
              <ShoppingCart className="cursor-pointer text-gray-800 w-7 h-7 border border-gray-300 rounded-full p-1" />
            </Link>
            <Link href="/login">
              <User className="cursor-pointer text-gray-800 w-7 h-7 border border-gray-300 rounded-full p-1" />
            </Link>
          </div>
        </div>
        <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
      </div>
    </header>
  );
};

export default Header;
