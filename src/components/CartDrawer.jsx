export const CartDrawer = ({ isOpen, onClose, carrito, total, quitarDelCarrito, nombreCliente, setNombreCliente }) => {
  if (!isOpen) return null;

  const enviarPedido = () => {
    const texto = carrito.map(i => `${i.cantidad}x ${i.nombre}`).join(", ");
    const msg = `Hola! Soy ${nombreCliente}. Mi pedido: ${texto}. Total: $${total}`;
    window.open(`https://wa.me/5491121676940?text=${encodeURIComponent(msg)}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-stone-900 p-6 shadow-2xl flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Tu Carrito</h2>
          <button onClick={onClose} className="text-white text-2xl">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {carrito.map(item => (
            <div key={item.id} className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
              <div>
                <p className="text-white font-medium">{item.nombre}</p>
                <p className="text-orange-400 text-sm">{item.cantidad} x ${item.precio}</p>
              </div>
              <button onClick={() => quitarDelCarrito(item.id)} className="text-red-500 text-xs">Quitar</button>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <input 
            type="text" placeholder="Tu nombre" 
            className="w-full p-3 rounded-xl bg-white/10 text-white mb-4 outline-none border border-white/10"
            value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)}
          />
          <div className="flex justify-between text-white text-xl font-bold mb-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button 
            onClick={enviarPedido}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold text-lg transition"
          >
            Confirmar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};