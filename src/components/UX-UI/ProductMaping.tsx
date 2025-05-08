import React from 'react';
import { Product } from '@/types/productType';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

interface ProductMapingProps {
  products: Product[];
}

const getStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg
        key={i}
        className={`w-5 h-5 ${i <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
      </svg> 
    );
  }
  return stars;
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="rounded-2xl p-6 md:p-5 w-[260px] flex-shrink-0 flex flex-col items-start transition-shadow duration-200 group:hover:scale-105">
      <div className="w-full bg-[#f6f4f4] rounded-2xl py-4 px-5 flex justify-center items-center mb-5">
        <img
          src={product.images}
          alt={product.name}
          className="w-40 h-40 object-contain rounded-lg bg-white"
        />
      </div>
      <div className="text-base font-bold mb-2 text-gray-900">{product.name}</div>
      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-0.5">{getStars(product.rating)}</div>
        <span className="text-sm text-gray-700">{product.rating.toFixed(1)}/5</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-nightBlue">${product.price.toLocaleString('es-CO')}</span>
        <span className="text-sm text-gray-700 line-through">${(product.price * 1.1).toLocaleString('es-CO')}</span>
      </div>
    </div>
  );
};

const ProductMaping: React.FC<ProductMapingProps> = ({ products }) => {
  return (
    <>
      {/* Mobile Swiper */}
      <div className="md:hidden">
        <Swiper
          spaceBetween={24}
          slidesPerView={1.6}
          centeredSlides={true}
          style={{ paddingLeft: 32, paddingRight: 32 }}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="!pb-10"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductMaping; 