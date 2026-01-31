import React from 'react';

export default function HeroSports() {
  return (
    <div className="relative h-[90vh] w-full overflow-hidden bg-black">
      {/* Imagen de Fondo con Overlay */}
      <img 
        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
        alt="Sportswear Factory" 
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      
      {/* Degradado para dar profundidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Contenido Central */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <span className="mb-4 inline-block rounded-full bg-orange-600 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
          Directo de nuestra fábrica
        </span>
        
        <h1 className="max-w-4xl text-5xl font-black italic tracking-tighter text-white md:text-8xl">
          FORJADO EN EL <span className="text-orange-600">MOVIMIENTO</span>
        </h1>
        
        <p className="mt-6 max-w-xl text-lg text-gray-300 md:text-xl">
          Ropa técnica de alto rendimiento diseñada y fabricada para quienes no conocen los límites.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button className="rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition hover:bg-orange-600 hover:text-white">
            Ver Colección
          </button>
          <button className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md transition hover:bg-white/20">
            Nuestra Fábrica
          </button>
        </div>
      </div>

      {/* Indicador de scroll o detalle visual */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-10 w-[2px] bg-gradient-to-b from-orange-600 to-transparent" />
      </div>
    </div>
  );
}