import React from "react";
import { Star, StarHalf, CheckCircle2, MoreVertical } from "lucide-react";

const reviews = [
  {
    name: "Samantha D.",
    date: "14 de agosto, 2023",
    rating: 4.5,
    verified: true,
    comment:
      "\"¡Excelente servicio y atención al cliente! El producto llegó antes de lo esperado y en perfectas condiciones. Definitivamente volveré a comprar aquí.\"",
  },
  {
    name: "Alex M.",
    date: "15 de agosto, 2023",
    rating: 4,
    verified: true,
    comment:
      "\"La calidad del producto superó mis expectativas. El proceso de compra fue muy sencillo y la comunicación con el vendedor fue excelente. ¡Muy recomendado!\"",
  },
  {
    name: "Ethan R.",
    date: "16 de agosto, 2023",
    rating: 4.5,
    verified: true,
    comment:
      "\"Me encantó la experiencia de compra. El producto es exactamente como se describe y el envío fue muy rápido. El empaque estaba muy bien cuidado.\"",
  },
  {
    name: "Olivia P.",
    date: "17 de agosto, 2023",
    rating: 4,
    verified: true,
    comment:
      "\"¡Muy satisfecha con mi compra! El producto es de excelente calidad y el precio es muy competitivo. El servicio post-venta también es muy bueno.\"",
  },
  {
    name: "Liam K.",
    date: "18 de agosto, 2023",
    rating: 5,
    verified: true,
    comment:
      "\"Increíble experiencia de compra. El producto es de primera calidad y el servicio al cliente es excepcional. Definitivamente recomiendo esta tienda.\"",
  },
  {
    name: "Ava H.",
    date: "19 de agosto, 2023",
    rating: 4.5,
    verified: true,
    comment:
      "\"La atención al detalle en el empaque y la presentación del producto es impresionante. La calidad es excelente y el servicio al cliente es muy profesional.\"",
  },
];

function StarRating({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<Star key={i} className="text-yellow-400 inline fill-current" size={20} />);
    } else if (rating >= i - 0.5) {
      stars.push(<StarHalf key={i} className="text-yellow-400 inline fill-current" size={20} />);
    } else {
      stars.push(<Star key={i} className="text-yellow-400 inline" size={20} />);
    }
  }
  return <span>{stars}</span>;
}

const Opinions: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl text-nightBlue font-semibold">Todas las Reseñas <span className="text-gray-500 font-normal">(451)</span></h2>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition">
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M3.333 5.833h13.334M5.833 10h8.334M8.333 14.167h3.334" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span>Más recientes</span>
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          <button className="ml-2 px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition">Escribir una Reseña</button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {reviews.map((review, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-2 shadow-sm">
            <div className="flex items-center gap-2">
              <StarRating rating={review.rating} />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-semibold text-lg text-nightBlue">{review.name}</span>
              {review.verified && <CheckCircle2 className="text-green-500" size={20} aria-label="Verificado" />}
            </div>
            <p className="text-gray-700 mt-1">&ldquo;{review.comment}&rdquo;</p>
            <span className="text-gray-400 text-sm mt-2">Publicado el {review.date}</span>
            <button className="self-end text-gray-400 hover:text-gray-600 p-1 rounded-full transition" title="Más opciones">
              <MoreVertical size={24} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button className="px-6 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition">Cargar Más Reseñas</button>
      </div>
    </section>
  );
};

export default Opinions;
