import { useEffect, useState, useMemo } from "react";
import jsPDF from "jspdf";
import { StatCard } from "../components/StatCard";
import { SalesChart } from "../components/SalesChart";

const API_URL = import.meta.env.VITE_API_URL;

export default function Reportes() {
  const [compras, setCompras] = useState([]);
  const [periodo, setPeriodo] = useState("diario");

  // 1. Cargar datos desde el backend
  useEffect(() => {
    const cargarCompras = async () => {
      try {
        const res = await fetch(`${API_URL}/api/compras`);
        const data = await res.json();
        setCompras(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error al cargar compras:", err);
      }
    };
    cargarCompras();
  }, []);

  // 2. Procesar datos para el gráfico (Memorizado para rendimiento)
  const ventasProcesadas = useMemo(() => {
    const mapa = {};
    compras.forEach((compra) => {
      const fecha = new Date(compra.date);
      let clave = "";

      switch (periodo) {
        case "diario": clave = fecha.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" }); break;
        case "semanal": clave = fecha.toLocaleDateString("es-AR", { weekday: "short" }); break;
        case "mensual": clave = fecha.toLocaleDateString("es-AR", { month: "short" }); break;
        case "anual": clave = fecha.getFullYear().toString(); break;
        default: clave = fecha.toLocaleDateString("es-AR");
      }

      const total = (Array.isArray(compra.items) ? compra.items : JSON.parse(compra.items || "[]"))
        .reduce((acc, item) => acc + item.precio * item.cantidad, 0);

      mapa[clave] = (mapa[clave] || 0) + total;
    });
    return Object.entries(mapa).map(([fecha, total]) => ({ fecha, total }));
  }, [compras, periodo]);

  // 3. Cálculos generales
  const totalGeneral = compras.reduce((acc, c) => {
    const items = Array.isArray(c.items) ? c.items : JSON.parse(c.items || "[]");
    return acc + items.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
  }, 0);

  const promedioCompra = compras.length ? totalGeneral / compras.length : 0;

  // 4. Generar PDF
  const generarPDF = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
    doc.setFontSize(20);
    doc.text("📄 Reporte de Ventas", 40, 40);
    doc.setFontSize(12);
    doc.text(`Periodo: ${periodo.toUpperCase()}`, 40, 60);
    doc.text(`Total Vendido: $${totalGeneral.toFixed(2)}`, 40, 80);
    
    let y = 110;
    ventasProcesadas.forEach(v => {
      doc.text(`${v.fecha}: $${v.total.toFixed(2)}`, 50, y);
      y += 20;
    });
    doc.save(`Reporte_${periodo}_${new Date().toLocaleDateString()}.pdf`);
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20">
        <h1 className="text-3xl font-bold text-white">📊 Historial y Métricas</h1>
        <div className="flex gap-4">
          <select 
            value={periodo} 
            onChange={(e) => setPeriodo(e.target.value)}
            className="bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="diario">Diario</option>
            <option value="semanal">Semanal</option>
            <option value="mensual">Mensual</option>
            <option value="anual">Anual</option>
          </select>
          <button 
            onClick={generarPDF}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Descargar PDF
          </button>
        </div>
      </header>

      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard label="Total Vendido" value={totalGeneral} isCurrency />
        <StatCard label="Ventas Realizadas" value={compras.length} />
        <StatCard label="Promedio por Venta" value={promedioCompra} isCurrency />
      </div>

      {/* Gráfico Dinámico */}
      <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20">
        <h2 className="text-xl font-bold text-white mb-6">Tendencia de Ventas</h2>
        <SalesChart data={ventasProcesadas} />
      </div>

      {/* Tabla de Detalle */}
      <div className="bg-white/10 rounded-2xl overflow-hidden border border-white/20 backdrop-blur-md">
        <table className="w-full text-left text-white">
          <thead className="bg-white/10 text-gray-300 uppercase text-xs font-bold">
            <tr>
              <th className="px-6 py-4">Fecha</th>
              <th className="px-6 py-4">Cliente</th>
              <th className="px-6 py-4 text-right">Monto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {compras.slice(-10).map((c, i) => (
              <tr key={i} className="hover:bg-white/5 transition">
                <td className="px-6 py-4">{new Date(c.date).toLocaleDateString()}</td>
                <td className="px-6 py-4">{c.cliente || "Consumidor Final"}</td>
                <td className="px-6 py-4 text-right font-mono">
                  ${(Array.isArray(c.items) ? c.items : JSON.parse(c.items || "[]"))
                    .reduce((sum, item) => sum + item.precio * item.cantidad, 0).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}