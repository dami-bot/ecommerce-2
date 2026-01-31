import { useEffect, useState } from 'react';

export default function Reportes() {
  const [compras, setCompras] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/compras`)
      .then(res => res.json())
      .then(data => setCompras(data));
  }, []);

  const totalRecaudado = compras.reduce((acc, c) => acc + (c.total || 0), 0);

  const limpiarTodo = async () => {
    if (!confirm("¿Seguro que querés borrar todo el historial?")) return;
    await fetch(`${API_URL}/api/compras`, { method: 'DELETE' });
    setCompras([]);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen text-white">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black uppercase tracking-tighter">Reporte de Ventas</h1>
        <button onClick={limpiarTodo} className="text-xs bg-red-500/20 text-red-500 px-4 py-2 rounded-lg border border-red-500/30 hover:bg-red-500 hover:text-white transition">
          Limpiar Historial
        </button>
      </div>

      {/* 💰 Resumen Rápido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
          <p className="text-gray-400 text-sm uppercase font-bold mb-1">Total Recaudado</p>
          <h2 className="text-5xl font-black text-emerald-400">${totalRecaudado.toLocaleString('es-AR')}</h2>
        </div>
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
          <p className="text-gray-400 text-sm uppercase font-bold mb-1">Órdenes Totales</p>
          <h2 className="text-5xl font-black text-white">{compras.length}</h2>
        </div>
      </div>

      {/* 📋 Tabla de Ventas */}
      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/10 text-xs uppercase text-gray-400">
            <tr>
              <th className="p-4">Pedido</th>
              <th className="p-4">Cliente / Dirección</th>
              <th className="p-4">Items</th>
              <th className="p-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-sm">
            {compras.map(c => (
              <tr key={c.id} className="hover:bg-white/5 transition">
                <td className="p-4 font-bold text-orange-500">#{c.numeroPedido}</td>
                <td className="p-4">
                  <div className="font-bold">{c.cliente}</div>
                  <div className="text-xs text-gray-500">{c.direccion}</div>
                </td>
                <td className="p-4">
                  {/* Como items es JSON, lo mapeamos directamente */}
                  {Array.isArray(c.items) && c.items.map((it, idx) => (
                    <div key={idx} className="text-xs">{it.cantidad}x {it.nombre}</div>
                  ))}
                </td>
                <td className="p-4 text-right font-black">${c.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}