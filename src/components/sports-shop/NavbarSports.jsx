import React from 'react';

export default function NavbarSports() {
  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center">
        {/* LOGO */}
        <div className="text-white font-black italic text-3xl tracking-tighter">
          SPORT<span className="text-orange-600">FACTORY</span>
        </div>

        {/* LINKS (Ocultos en móvil, podrías agregar un menú hamburguesa después) */}
        <div className="hidden md:flex gap-8 text-white font-bold uppercase italic text-sm tracking-widest">
          <a href="#" className="hover:text-orange-600 transition-colors">Inicio</a>
          <a href="#" className="hover:text-orange-600 transition-colors">Colecciones</a>
          <a href="#" className="hover:text-orange-600 transition-colors">Fábrica</a>
          <a href="#" className="hover:text-orange-600 transition-colors">Contacto</a>
        </div>

        {/* ACCIONES */}
        <div className="flex gap-4 text-white font-bold">
          <button className="hover:text-orange-600 transition-colors">🔍</button>
          <button className="hover:text-orange-600 transition-colors relative">
            🛒 <span className="absolute -top-2 -right-2 bg-orange-600 text-[10px] px-1.5 rounded-full">0</span>
          </button>
        </div>
      </div>
    </nav>
  );
}