import Image from "next/image";

const brands = ["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"];

export default function Hero() {
  return (
    <section className="w-full bg-grayBg flex flex-col">
      {/* Hero principal */}
      <div className="max-w-7xl mx-auto w-full flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-8 py-8 ">
        {/* Texto */}
        <div className=" flex flex-col items-center md:items-start text-center md:text-left gap-6 md:gap-8">
          <h1 className="font-integral  font-extrabold text-3xl md:text-5xl leading-tight md:leading-[1.1] md:bg-transparent bg-white md:px-0 px-4 text-gray-800">
            DESCUBRE TODO LO QUE IMAGINAS EN UN SOLO LUGAR
          </h1>
          <p className="text-[#7D7D7D] text-base md:text-lg max-w-lg">
            Desde ropa y accesorios hasta tecnología, hogar y más. Zentro reúne
            lo mejor de cada categoría para ti.
          </p>
          <button className="bg-[#E25A5A] hover:bg-[#d94c4c] transition-colors text-white font-satoshi font-semibold rounded-full px-8 py-3 text-lg md:text-xl shadow-md">
            Explorar el bazar
          </button>
          <div className="flex w-full justify-center md:justify-start gap-8 mt-4 md:mt-8">
            <div className="flex flex-col items-center">
              <span className="font-integral text-2xl md:text-3xl font-extrabold text-nightBlue">
                200
              </span>
              <span className="text-[#7D7D7D] text-sm md:text-base mt-1">
                Marcas
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-integral text-2xl md:text-3xl font-extrabold text-nightBlue">
                2,000
              </span>
              <span className="text-[#7D7D7D] text-sm md:text-base mt-1">
                Productos únicos
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-integral text-2xl md:text-3xl font-extrabold text-nightBlue">
                30,000
              </span>
              <span className="text-[#7D7D7D] text-sm md:text-base mt-1">
                Calificaciones
              </span>
            </div>
          </div>
        </div>
        {/* Imagen */}
        <div className="relative w-[1600px] h-[600px] -mb-8 md:block hidden ">
          <Image
            src="/images/hero-image.png"
            alt="Hero principal"
            fill
            priority
            className="object-contain"
          />
        </div>
        <div className=" flex items-center justify-center  md:mb-0">
          <div className="relative w-[400px] h-[360px] md:hidden">
            <Image
              src="/images/hero-image.png"
              alt="Hero principal"
              fill
              priority
              className=" object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </div>
      {/* Barra de marcas */}
      <div className="w-full bg-[#232E3D] py-6 md:py-8 px-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {brands.map((brand, i) => (
          <span
            key={brand}
            className="text-white text-xl md:text-2xl font-integral tracking-wide font-normal md:font-semibold uppercase"
            style={{ letterSpacing: i === 4 ? "normal" : "0.08em" }}
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}
