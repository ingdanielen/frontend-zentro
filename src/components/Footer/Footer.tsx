import { Facebook, Github, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-grayBg w-full relative pt-32 md:pt-36">
      {/* Banner superior sobresaliente */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-28 md:-top-24 w-[90%] max-w-7xl z-10">
        <div className="bg-softCoral rounded-3xl px-6 py-10 flex flex-col items-center justify-center gap-6 md:gap-0 md:flex-row md:justify-between md:py-12 md:px-16 ">
          <h2 className="text-white font-integral text-3xl md:text-4xl font-extrabold text-center md:text-left leading-tight md:max-w-4xl">
            MANTENTE CONECTADO CON TODO
            <br className="hidden md:block" />
            LO QUE ZENTRO TIENE PARA TI
          </h2>
          <form className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
            <div className="flex flex-col w-full md:w-80 gap-4 relative">
              <input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                className="w-full pl-12 pr-4 py-3 rounded-full border-none outline-none text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-orange-300 bg-white"
              />
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 rounded-full bg-white text-[#222] font-semibold shadow hover:bg-gray-100 transition"
              >
                Suscribirse
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer principal */}
      <div className="max-w-7xl mx-auto pt-48 sm:pt-52 md:pt-28 lg:pt-2 px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-200 pb-8">
          {/* Columna 1: Logo y descripción */}
          <div className="col-span-2 flex flex-col gap-4 md:col-span-2 lg:col-span-1">
            <div className="text-4xl font-extrabold tracking-tight text-black">
              ZENTRO.CO
            </div>
            <p className="text-gray-500 text-base">
              Zentro es el espacio donde marcas, ideas y pasiones se encuentran.
              Compra fácil, rápido y sin límites de categoría.
            </p>
            <div className="flex gap-4 mt-2">
              <Link className="cursor-pointer" href="#" aria-label="Twitter">
                <Twitter className="text-nightBlue" size={24} />
              </Link>
              <Link className="cursor-pointer" href="https://www.facebook.com/daniel.es17/" aria-label="Facebook">
                <Facebook className="text-nightBlue" size={24} />
              </Link>
              <Link className="cursor-pointer" href="https://www.instagram.com/daniel.ricardopr/" aria-label="Instagram">
                <Instagram className="text-nightBlue" size={24} />
              </Link>
              <Link className="cursor-pointer" href="https://github.com/ingdanielen" aria-label="Github">
                <Github className="text-nightBlue" size={24} />
              </Link>
            </div>
          </div>
          {/* Columna 2: ZENTRO */}
          <div>
            <div className="font-semibold text-lg tracking-widest text-black mb-2">
              ZENTRO
            </div>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li>
                <Link href="#" className="hover:text-black">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Cómo funciona
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Comunidad
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Trabaja con nosotros
                </Link>
              </li>
            </ul>
          </div>
          {/* Columna 3: HELP */}
          <div>
            <div className="font-semibold text-lg tracking-widest text-black mb-2">
              HELP
            </div>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li>
                <Link href="#" className="hover:text-black">
                  Soporte al cliente
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Envíos & entregas
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Términos & condiciones
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>
          {/* Columna 4: FAQ */}
          <div>
            <div className="font-semibold text-lg tracking-widest text-black mb-2">
              FAQ
            </div>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li>
                <Link href="#" className="hover:text-black">
                  Mi cuenta
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Gestionar pedidos
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Estados de compra
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Métodos de pago
                </Link>
              </li>
            </ul>
          </div>
          {/* Columna 5: RESOURCES */}
          <div>
            <div className="font-semibold text-lg tracking-widest text-black mb-2">
              RESOURCES
            </div>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li>
                <Link href="#" className="hover:text-black">
                  Guías para emprendedores
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Blog de ideas y tendencias
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Recomendados Zentro
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Comunidad en YouTube
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Fila inferior */}
        <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-4">
          <span className="text-gray-400 text-sm">
            Zentro © 2025 — Todos los derechos reservados.
          </span>
          <div className="flex gap-2">
            <Image src="/images/logos/payment.png" alt="Visa" className="" width={200} height={100} />

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
