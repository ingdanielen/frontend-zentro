'use client'
import React from 'react';
import { Product } from '@/types/productType';
import Link from 'next/link';
import ProductMaping from '@/components/UX-UI/ProductMaping';   

// Dummy data para ejemplo visual
const products: Product[] = [
  {
    _id: '1',
    active: true,
    name: 'T-shirt with Tape Details',
    stock: 10,
    width: 0,
    height: 0,
    weight: 0,
    color: 'Black',
    description: '',
    price: 780000,
    category: 'Clothes',
    brand: 'BrandA',
    images: 'https://i.imgur.com/1.png',
    rating: 4.5,
    createdAt: '',
    __v: 0,
  },
  {
    _id: '2',
    active: true,
    name: 'Skinny Fit Jeans',
    stock: 10,
    width: 0,
    height: 0,
    weight: 0,
    color: 'Blue',
    description: '',
    price: 250000,
    category: 'Clothes',
    brand: 'BrandB',
    images: 'https://i.imgur.com/2.png',
    rating: 3.5,
    createdAt: '',
    __v: 0,
  },
  {
    _id: '3',
    active: true,
    name: 'Checkered Shirt',
    stock: 10,
    width: 0,
    height: 0,
    weight: 0,
    color: 'Red',
    description: '',
    price: 920000,
    category: 'Clothes',
    brand: 'BrandC',
    images: 'https://i.imgur.com/3.png',
    rating: 4.5,
    createdAt: '',
    __v: 0,
  },
  {
    _id: '4',
    active: true,
    name: 'Sleeve Striped T-shirt',
    stock: 10,
    width: 0,
    height: 0,
    weight: 0,
    color: 'Orange',
    description: '',
    price: 130000,
    category: 'Clothes',
    brand: 'BrandD',
    images: 'https://i.imgur.com/4.png',
    rating: 4.5,
    createdAt: '',
    __v: 0,
  },
];

const NewArrivals: React.FC = () => {
  return (
    <section className="w-full flex flex-col gap-10 items-center">
      <h2 className="text-4xl md:text-5xl font-integral text-nightBlue font-extrabold tracking-wide text-center">LO MÁS VENDIDO</h2>
      <div className="w-full max-w-7xl">
        <ProductMaping products={products} />
      </div>
      <Link
        href="/products"
        className="flex justify-center items-center px-8 py-4 rounded-full border border-gray-200 bg-white text-base font-medium text-gray-900 hover:bg-[#f6f4f4] hover:shadow transition-all w-full max-w-xs"
      >
        Ver todos
      </Link>
      <hr className="w-full border-gray-200 max-w-5xl" />
    </section>
  );
};

export default NewArrivals;
