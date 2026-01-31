import React from 'react';

const beneficios = [
  {
    icon: "🏗️",
    titulo: "Directo de Fábrica",
    desc: "Sin intermediarios. Garantizamos el mejor precio del mercado y control total de calidad."
  },
  {
    icon: "🚀",
    titulo: "Envíos Flash",
    desc: "Despachamos en menos de 24hs a todo el país. Tu rendimiento no puede esperar."
  },
  {
    icon: "💎",
    titulo: "Telas Premium",
    desc: "Utilizamos tecnología Dry-Fit y costuras reforzadas de grado competitivo."
  },
  {
    icon: "🔄",
    titulo: "Cambio Simple",
    desc: "¿No te quedó bien? Tenés 30 días para cambiar tu prenda sin vueltas."
  }
];

export default function Features() {
  return (
    <section className="bg-stone-950 py-24 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {beneficios.map((item, index) => (
            <div key={index} className="group text-center">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5 text-4xl transition-all duration-300 group-hover:bg-orange-600 group-hover:-translate-y-2 group-hover:shadow-[0_0_30px_rgba(234,88,12,0.3)]">
                {item.icon}
              </div>
              <h3 className="mb-3 text-xl font-black uppercase italic tracking-tighter text-white">
                {item.titulo}
              </h3>
              <p className="text-sm leading-relaxed text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}