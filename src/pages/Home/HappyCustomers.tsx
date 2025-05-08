'use client';

import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const testimonials = [
  {
    name: 'Sarah M.',
    text: "Estoy sorprendida por la calidad y estilo de las prendas que recibí de Zentro. Desde ropa casual hasta vestidos elegantes, cada pieza que he comprado ha superado mis expectativas.",
  },
  {
    name: 'Alex K.',
    text: 'Encontrar ropa que se alinee con mi estilo personal siempre ha sido un desafío hasta que descubrí Zentro. El rango de opciones que ofrecen es realmente sorprendente, abarcando una variedad de gustos y ocasiones.',
  },
  {
    name: 'James L.',
    text: "Como alguien que siempre está buscando piezas de moda únicas, estoy emocionada de haber descubierto Zentro. La selección de ropa no solo es diversa, sino que también está perfectamente alineada con las últimas tendencias.",
  },
  {
    name: 'María G.',
    text: "Me encanta la sección de decoración del hogar en Zentro. Encontré unos cojines decorativos y lámparas que transformaron completamente mi sala de estar. La calidad es excelente y los precios son muy accesibles.",
  },
  {
    name: 'Carlos R.',
    text: "Como amante de la tecnología, me sorprendió encontrar gadgets y accesorios electrónicos de alta calidad en Zentro. La variedad de productos tecnológicos es impresionante y siempre tienen las últimas novedades.",
  },
  {
    name: 'Laura P.',
    text: "La sección de belleza y cuidado personal de Zentro es mi favorita. Tienen una increíble selección de productos de skincare y maquillaje de marcas reconocidas. Siempre encuentro algo nuevo para probar.",
  },
  {
    name: 'Diego M.',
    text: "Compré varios artículos para mi oficina en casa y quedé impresionado con la calidad. Desde muebles hasta organizadores, todo ha sido perfecto para crear un espacio de trabajo productivo y estético.",
  },
  {
    name: 'Ana S.',
    text: "La variedad de productos para mascotas que ofrece Zentro es increíble. Encontré juguetes, camas y accesorios que mi perro adora. Es genial poder encontrar todo lo que necesito para mi mascota en un solo lugar.",
  }
];

const HappyCustomers: FC = () => {
  return (
    <section className="w-full pb-10 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-4xl md:text-5xl font-black font-integral leading-tight text-gray-900">
            NUESTROS CLIENTES FELICES
          </h2>
          <div className="hidden md:flex gap-4">
            <button className="swiper-prev p-2 rounded-full border border-gray-600 hover:bg-gray-100 transition">
              <span className="text-2xl">&#8592;</span>
            </button>
            <button className="swiper-next p-2 rounded-full border border-gray-600 hover:bg-gray-100 transition">
              <span className="text-2xl">&#8594;</span>
            </button>
          </div>
        </div>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
          }}
          className="pb-4"
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white rounded-2xl border text border-gray-200 p-6 md:p-8 h-full flex flex-col shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
                  ))}
                </div>
                <div className="flex items-center mb-2">
                  <span className="font-bold text-lg text-gray-900 mr-2">{t.name}</span>
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 6.293a1 1 0 00-1.414 0L9 12.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
                </div>
                <p className="text-gray-600 text-base md:text-sm">{t.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Mobile navigation */}
        <div className="flex md:hidden justify-end gap-4 mt-2">
          <button className="swiper-prev p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition">
            <span className="text-2xl">&#8592;</span>
          </button>
          <button className="swiper-next p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition">
            <span className="text-2xl">&#8594;</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HappyCustomers;
