"use client";

import { Newspaper, Rocket, Lightbulb } from "lucide-react";

const Novedades = () => {
  const novedades = [
    {
      id: 1,
      titulo: "Nueva Actualización del Sistema",
      descripcion:
        "Implementamos mejoras significativas en la interfaz y rendimiento del sistema.",
      icono: <Rocket className="w-6 h-6 text-zafire" />,
      fecha: "15 Marzo 2024",
    },
    {
      id: 2,
      titulo: "Nuevas Características",
      descripcion:
        "Descubre las últimas funcionalidades que hemos agregado para mejorar tu experiencia.",
      icono: <Lightbulb className="w-6 h-6 text-zafire" />,
      fecha: "10 Marzo 2024",
    },
    {
      id: 3,
      titulo: "Mejoras en la Plataforma",
      descripcion:
        "Optimizaciones y mejoras en la plataforma para una mejor experiencia de usuario.",
      icono: <Newspaper className="w-6 h-6 text-zafire" />,
      fecha: "5 Marzo 2024",
    },
  ];

  return (
    <div className=" bg-gradient-to-b from-white to-lightGray/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 bg-nightBlue rounded-2xl p-6 sm:p-8 lg:p-12 text-white transform transition-all duration-300">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 font-integral tracking-tight">
            Novedades y Actualizaciones
          </h1>
          <p className="text-base sm:text-lg lg:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Mantente al día con las últimas mejoras y características de nuestra
            plataforma
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {novedades.map((novedad) => (
            <div
              key={novedad.id}
              className="group bg-white rounded-xl shadow-md transition-all duration-300 overflow-hidden transform hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
            >
              <div className="p-6 sm:p-8 relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-zafire/5 to-nightBlue/5 rounded-bl-full transition-all duration-300 group-hover:scale-150"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-zafire/10 to-nightBlue/10 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                    {novedad.icono}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-nightBlue mb-3 group-hover:text-zafire transition-colors duration-300">
                    {novedad.titulo}
                  </h2>
                  <p className="text-softBlack mb-4 leading-relaxed text-sm sm:text-base">
                    {novedad.descripcion}
                  </p>
                  <div className="flex items-center text-sm text-mediumGray">
                    <span className="inline-block w-2 h-2 bg-nightBlue rounded-full mr-2"></span>
                    {novedad.fecha}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Novedades;
