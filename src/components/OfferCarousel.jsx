export const OfferCarousel = ({ ofertas, agregarAlCarrito }) => {
  return (
    <div className="w-full overflow-x-auto flex gap-4 p-4 no-scrollbar">
      {ofertas.map((prod) => (
        <div 
          key={prod.id} 
          className="min-w-[280px] bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-2xl shadow-xl flex items-center gap-4 text-white"
        >
          <img src={prod.imagenUrl} className="w-20 h-20 object-cover rounded-lg shadow-md" />
          <div>
            <h4 className="font-bold text-sm leading-tight">{prod.nombre}</h4>
            <p className="text-xl font-black">$ {prod.precio}</p>
            <button 
              onClick={() => agregarAlCarrito(prod)}
              className="mt-2 bg-white text-orange-600 text-xs px-3 py-1 rounded-full font-bold uppercase"
            >
              ¡Lo quiero!
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};