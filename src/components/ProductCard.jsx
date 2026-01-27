export const ProductCard = ({ producto, agregarAlCarrito }) => {
  return (
    <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex flex-col hover:scale-[1.02] transition-transform">
      <div className="relative">
        <img 
          src={producto.imagenUrl || "https://via.placeholder.com/300"} 
          className="w-full h-40 object-cover rounded-2xl mb-4"
        />
        {producto.ofertaDiaria && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">Oferta</span>
        )}
      </div>
      <h3 className="text-white font-semibold truncate mb-1">{producto.nombre}</h3>
      <p className="text-orange-400 font-black text-xl mb-4">${producto.precio}</p>
      <button 
        onClick={() => agregarAlCarrito(producto)}
        className="mt-auto bg-white/10 hover:bg-orange-500 text-white hover:text-white py-2 rounded-xl border border-white/20 transition-all font-bold"
      >
        Agregar
      </button>
    </div>
  );
};