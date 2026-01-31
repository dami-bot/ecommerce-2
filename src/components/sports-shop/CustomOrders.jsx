import React from 'react';

export default function CustomOrders() {
  return (
    <section className="bg-orange-600 py-16 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-white max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-4">
            ¿Equipás a tu club o gimnasio?
          </h2>
          <p className="text-orange-100 text-lg md:text-xl font-medium">
            Somos fabricantes. Personalizamos indumentaria para equipos, box de crossfit y eventos deportivos con precios mayoristas imbatibles.
          </p>
        </div>
        
        <a 
          href="https://wa.me/tu-numero-aqui" 
          target="_blank"
          className="bg-black text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 shadow-2xl"
        >
          Consultar por Mayor ➔
        </a>
      </div>
    </section>
  );
}