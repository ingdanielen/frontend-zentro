/**
 * Root Layout Component
 * 
 * Este es el componente de diseño raíz de la aplicación que define la estructura básica
 * de todas las páginas. Incluye la configuración de fuentes, metadatos y componentes
 * comunes como el Header y Footer.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Providers from "@/components/Providers";

// Configuración de la fuente Geist Sans para el texto principal
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Configuración de la fuente Geist Mono para texto monoespaciado
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadatos de la aplicación para SEO
export const metadata: Metadata = {
  title: "Zentro Store",
  description: "Zentro es un bazar de productos en linea",
};

/**
 * RootLayout Component
 * 
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos que se renderizarán dentro del layout
 * @returns {JSX.Element} Layout principal de la aplicación
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        <Providers>
          <Header />
          {children}
          <div className="pt-24"> 
            <Footer />
          </div> 
        </Providers>
      </body>
    </html>
  );
}
