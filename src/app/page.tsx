/**
 * Página Principal (Home)
 * 
 * Esta es la página principal de la aplicación que muestra los diferentes
 * componentes de la landing page, incluyendo el hero banner, nuevos productos,
 * productos más vendidos, productos destacados y testimonios de clientes.
 */

import Hero from "@/pages/Home/Hero";
import NewArrivals from "@/pages/Home/NewArrivals";
import TopSellings from "@/pages/Home/TopSellings";
import Highlighted from "@/pages/Home/Highlighted";
import HappyCustomers from "@/pages/Home/HappyCustomers";

/**
 * Home Component
 * 
 * Componente principal que renderiza la página de inicio con todos sus
 * componentes organizados verticalmente con espaciado consistente.
 * 
 * @returns {JSX.Element} Página principal de la aplicación
 */
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-20 w-full">
        <Hero />
        <NewArrivals />
        <TopSellings />
        <Highlighted /> 
        <HappyCustomers />
    </div>
  );
}
