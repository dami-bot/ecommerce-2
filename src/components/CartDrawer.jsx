import { useState } from "react";
import { useCart } from "../context/CartContext"; // ✅ Importamos el hook

export default function CartDrawer({ isOpen, onClose }) {
  // ✅ Extraemos todo del contexto, ya no dependemos de las props del padre
  const { carrito, setCarrito } = useCart();
  
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");

  // Calcular total
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  // --- FUNCIONES DEL CARRITO ---
  const modificarCantidad = (id, delta) => {
    setCarrito(prevCarrito => {
      return prevCarrito.map(item => {
        if (item.id === id) {
          const nuevaCant = item.cantidad + delta;
          // Validación: no bajar de 1 y no superar el stock si quisieras
          if (nuevaCant < 1) return item; 
          return { ...item, cantidad: nuevaCant };
        }
        return item;
      });
    });
  };

  const eliminarItem = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const enviarPedido = () => {
    if (!nombre.trim() || !direccion.trim()) {
      return alert("Por favor, completa tu nombre y dirección.");
    }

    if (carrito.length === 0) return alert("El carrito está vacío.");

    const nroPedido = Date.now().toString().slice(-6);
    
    let mensaje = `*PEDIDO NRO: #${nroPedido}*\n`;
    mensaje += `*Cliente:* ${nombre}\n`;
    mensaje += `*Dirección:* ${direccion}\n`;
    mensaje += `--------------------------\n`;
    
    carrito.forEach(item => {
      mensaje += `• ${item.cantidad}x ${item.nombre} - $${(item.precio * item.cantidad).toLocaleString()}\n`;
    });

    mensaje += `--------------------------\n`;
    mensaje += `*TOTAL: $${total.toLocaleString()}*`;

    const whatsappUrl = `https://wa.me/5491121676940?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, "_blank");

    // LIMPIAR Y CERRAR
    setCarrito([]);
    setNombre("");
    setDireccion("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Panel del Carrito */}
      <div className="relative w-full max-w-md bg-stone-900 h-full shadow-2xl flex flex-col p-6 border-l border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Tu Pedido</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white text-3xl">&times;</button>
        </div>

        {/* Lista de Items */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2">
          {carrito.length === 0 ? (
            <p className="text-center text-gray-500 mt-20">No hay productos en el carrito.</p>
          ) : (
            carrito.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5">
                <img src={item.imagenUrl} className="w-16 h-16 object-cover rounded-xl" alt={item.nombre} />
                <div className="flex-1">
                  <h4 className="text-white font-bold text-sm leading-tight">{item.nombre}</h4>
                  <p className="text-orange-500 font-bold text-xs mt-1">${item.precio.toLocaleString()}</p>
                </div>
                
                {/* Controles de Cantidad */}
                <div className="flex items-center gap-2 bg-black/30 rounded-lg p-1">
                  <button onClick={() => modificarCantidad(item.id, -1)} className="w-6 h-6 text-white hover:bg-white/10 rounded">-</button>
                  <span className="text-white font-bold text-xs w-4 text-center">{item.cantidad}</span>
                  <button onClick={() => modificarCantidad(item.id, 1)} className="w-6 h-6 text-white hover:bg-white/10 rounded">+</button>
                </div>

                <button onClick={() => eliminarItem(item.id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg">
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Formulario de Datos */}
        {carrito.length > 0 && (
          <div className="space-y-3 mb-6 bg-white/5 p-4 rounded-2xl">
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-2">Datos de Entrega</h3>
            <input 
              type="text" placeholder="Tu nombre completo"
              className="w-full p-3 rounded-xl bg-stone-800 text-white text-sm border border-white/10 outline-none focus:border-orange-500"
              value={nombre} onChange={(e) => setNombre(e.target.value)}
            />
            <input 
              type="text" placeholder="Dirección de entrega"
              className="w-full p-3 rounded-xl bg-stone-800 text-white text-sm border border-white/10 outline-none focus:border-orange-500"
              value={direccion} onChange={(e) => setDireccion(e.target.value)}
            />
          </div>
        )}

        {/* Footer del Carrito */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-400 font-medium">Total Estimado</span>
            <span className="text-2xl font-bold text-white">${total.toLocaleString()}</span>
          </div>
          
          <button 
            onClick={enviarPedido}
            disabled={carrito.length === 0}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 text-white font-bold rounded-2xl transition shadow-lg shadow-orange-500/20"
          >
            CONFIRMAR PEDIDO POR WHATSAPP
          </button>
        </div>
      </div>
    </div>
  );
}