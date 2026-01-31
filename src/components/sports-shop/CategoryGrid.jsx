import React from 'react';

const categorias = [
  {
    id: 1,
    nombre: 'Running',
    imagen: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=1000&auto=format&fit=crop',
    frase: 'Velocidad sin límites'
  },
  {
    id: 2,
    nombre: 'Training & Gym',
    imagen: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop',
    frase: 'Potencia tu fuerza'
  },
  {
    id: 3,
    nombre: 'Accesorios',
    imagen: 'https://images.unsplash.com/photo-1517438322351-1e809376662a?q=80&w=1000&auto=format&fit=crop',
    frase: 'El equipo que necesitás'
  },
  {
    id: 4,
    nombre: 'Línea Fábrica',
    imagen: 'https://images.unsplash.com/photo-1558770147-d2a384e1ad85?q=80&w=1000&auto=format&fit=crop',
    frase: 'Calidad de origen'
  }
];

export default function CategoryGrid() {
  return (
    <section className="bg-black py-20 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-orange-600 font-bold uppercase tracking-tighter italic text-xl">Explorá nuestro catálogo</h2>
            <p className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter">Categorías Destacadas</p>
          </div>
          <button className="text-white border-b-2 border-orange-600 pb-1 font-bold uppercase tracking-widest text-sm hover:text-orange-600 transition-colors mt-4 md:mt-0">
            Ver todo el catálogo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categorias.map((cat) => (
            <div 
              key={cat.id} 
              className="group relative h-[500px] overflow-hidden rounded-2xl cursor-pointer bg-stone-900"
            >
              {/* Imagen con efecto zoom */}
              <img 
                src={cat.imagen} 
                alt={cat.nombre} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
              />
              
              {/* Overlay degradado */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

              {/* Contenido de la Card */}
              <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                <p className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-2">{cat.frase}</p>
                <h3 className="text-white text-3xl font-black uppercase italic tracking-tighter leading-none mb-4">
                  {cat.nombre}
                </h3>
                <div className="h-1 w-0 bg-orange-600 transition-all duration-500 group-hover:w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}