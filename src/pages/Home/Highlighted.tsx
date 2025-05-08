'use client'
import Image from "next/image";
import Link from "next/link";

const dressStyles = [
  {
    label: "Tecnología",
    img: "/images/technology.png",
    alt: "Ropa tecnología",
  },
  {
    label: "Formal",
    img: "/images/technology.png",
    alt: "Ropa formal",
  },
  {
    label: "Party",
    img: "/images/technology.png",
    alt: "Ropa de fiesta",
  },
  {
    label: "Gym",
    img: "/images/technology.png",
    alt: "Ropa de gimnasio",
  },
];

export default function Highlighted() {
  return (
    <section className="w-full flex justify-center items-center py-8 md:py-16">
      <div className="w-full max-w-6xl bg-grayBg rounded-3xl px-2 md:px-8 py-8 flex flex-col gap-8">
        <h2 className="text-4xl font-integral font-extrabold text-gray-800 text-center py-5">
          EXPLORA POR PRODUCTOS
        </h2>
        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-6">
          {/* Fila 1 */}
          <Link href={`/products/${dressStyles[0].label.toLowerCase()}`} className="relative rounded-2xl overflow-hidden bg-white min-h-[220px] group shadow hover:shadow-lg transition-all cursor-pointer col-span-2">
            <Image
              src={dressStyles[0].img}
              alt={dressStyles[0].alt}
              fill
              className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <span className="absolute top-6 right-6 text-black text-2xl font-bold drop-shadow-md z-10">
              {dressStyles[0].label}
            </span>
          </Link>
          <Link href={`/products/${dressStyles[1].label.toLowerCase()}`} className="relative rounded-2xl overflow-hidden bg-white min-h-[220px] group shadow hover:shadow-lg transition-all cursor-pointer">
            <Image
              src={dressStyles[1].img}
              alt={dressStyles[1].alt}
              fill
              className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <span className="absolute top-6 right-6 text-black text-2xl font-bold drop-shadow-md z-10">
              {dressStyles[1].label}
            </span>
          </Link>
          {/* Fila 2 */}
          <Link href={`/products/${dressStyles[2].label.toLowerCase()}`} className="relative rounded-2xl overflow-hidden bg-white min-h-[220px] group shadow hover:shadow-lg transition-all cursor-pointer">
            <Image
              src={dressStyles[2].img}
              alt={dressStyles[2].alt}
              fill
              className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <span className="absolute top-6 right-6 text-black text-2xl font-bold drop-shadow-md z-10">
              {dressStyles[2].label}
            </span>
          </Link>
          <Link href={`/products/${dressStyles[3].label.toLowerCase()}`} className="relative rounded-2xl overflow-hidden bg-white min-h-[220px] group shadow hover:shadow-lg transition-all cursor-pointer col-span-2">
            <Image
              src={dressStyles[3].img}
              alt={dressStyles[3].alt}
              fill
              className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <span className="absolute top-6 right-6 text-black text-2xl font-bold drop-shadow-md z-10">
              {dressStyles[3].label}
            </span>
          </Link>
        </div>
        {/* Mobile list */}
        <div className="flex flex-col gap-4 md:hidden">
          {dressStyles.map((style) => (
            <Link
              key={style.label}
              href={`/products/${style.label.toLowerCase()}`}
              className="relative rounded-2xl overflow-hidden bg-white min-h-[120px] shadow group hover:shadow-md transition-all cursor-pointer"
            >
              <Image
                src={style.img}
                alt={style.alt}
                fill
                className="object-cover object-top w-full h-full group-hover:scale-105 transition-transform duration-300"
                sizes="100vw"
              />
              <span className="absolute top-4 right-4 text-xl font-bold text-black drop-shadow-md z-10">
                {style.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
