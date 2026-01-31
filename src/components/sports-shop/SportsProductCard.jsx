import React, { useState } from 'react';

export default function SportsProductCard({ producto }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-stone-900 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge de Oferta o Nueva Colección */}
      {producto.isNew && (
        <span className="absolute top-4 left-4 z-20 bg-orange-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">
          Nuevo
        </span>
      )}

      {/* Contenedor de Imagen */}
      <div className="relative h-80 overflow-hidden bg-stone-800">
        <img
          src={isHovered && producto.imagen2 ? producto.imagen2 : producto.imagen}
          alt={producto.nombre}
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        
        {/* Botón rápido de compra (aparece en hover) */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
          <button className="w-full bg-white text-black py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-colors">
            Añadir al Carrito
          </button>
        </div>
      </div>

      {/* Info del Producto */}
      <div className="p-5">
        <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-1">
          {producto.categoria}
        </p>
        <h3 className="text-white font-black italic uppercase tracking-tighter text-xl mb-2">
          {producto.nombre}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm font-medium">Fábrica Directa</span>
          <span className="text-white font-bold text-xl">${producto.precio.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}