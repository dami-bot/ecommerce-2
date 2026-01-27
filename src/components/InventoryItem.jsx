export const InventoryItem = ({ producto, onEdit, onDelete, onNotify }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-2xl flex flex-col">
      <img 
        src={producto.imagenUrl || "https://via.placeholder.com/150"} 
        className="w-full h-28 object-cover rounded-xl mb-3"
      />
      <h4 className="text-white font-bold text-sm truncate">{producto.nombre}</h4>
      <div className="text-xs text-gray-400 mb-3">
        <p>Stock: <span className="text-white">{producto.stock}</span></p>
        <p>Precio: <span className="text-white">${producto.precio}</span></p>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-auto">
        <button onClick={() => onEdit(producto)} className="bg-yellow-500/20 text-yellow-500 py-1.5 rounded-lg text-xs font-bold hover:bg-yellow-500 hover:text-white transition">
          Editar
        </button>
        <button onClick={() => onDelete(producto.id)} className="bg-red-500/20 text-red-500 py-1.5 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white transition">
          Borrar
        </button>
      </div>
      
      {producto.cercaVencimiento && (
        <button 
          onClick={() => onNotify(producto)} 
          className="w-full mt-2 bg-red-600 text-white py-1.5 rounded-lg text-[10px] font-black uppercase animate-pulse"
        >
          ⚠️ Avisar Vencimiento
        </button>
      )}
    </div>
  );
};