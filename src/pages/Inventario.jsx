import { useState, useEffect } from "react";
import { ProductForm } from "../components/ProductForm";
import { InventoryItem } from "../components/InventoryItem";

const API_URL = import.meta.env.VITE_API_URL;

export default function Inventario() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("todos");
  const [porcentaje, setPorcentaje] = useState("");
  const [productoEditando, setProductoEditando] = useState(null);

  // NUEVOS ESTADOS DE CARGA
  const [cargandoLista, setCargandoLista] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [actualizandoPrecios, setActualizandoPrecios] = useState(false);

  const [formValues, setFormValues] = useState({
    nombre: "",
    stock: "",
    precio: "",
    vencimiento: "",
    categoria: "", // ✅ Nueva categoría inicial
    ofertaDiaria: false,
    file: null
  });

  const cargarProductos = async () => {
    setCargandoLista(true);
    try {
      const res = await fetch(`${API_URL}/api/productos`);
      const data = await res.json();
      const hoy = new Date();
      const procesados = data.map(p => ({
        ...p,
        cercaVencimiento: p.vencimiento &&
          (new Date(p.vencimiento) - hoy) / (1000 * 60 * 60 * 24) <= 7
      }));
      setProductos(procesados);
    } catch (err) {
      console.error("Error cargando productos:", err);
    } finally {
      setCargandoLista(false);
    }
  };

  useEffect(() => { cargarProductos(); }, []);

  const aplicarAumentoMasivo = async () => {
    if (!porcentaje || isNaN(porcentaje)) return alert("Ingresá un porcentaje válido.");
    const idsParaActualizar = productosFiltrados.map(p => p.id);
    if (idsParaActualizar.length === 0) return alert("No hay productos filtrados.");

    const confirmar = confirm(`¿Aumentar ${porcentaje}% a ${idsParaActualizar.length} productos?`);
    if (!confirmar) return;

    setActualizandoPrecios(true);
    try {
      const res = await fetch(`${API_URL}/api/productos/actualizar-precios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: idsParaActualizar, porcentaje: parseFloat(porcentaje) })
      });

      if (res.ok) {
        alert("✅ Precios actualizados");
        setPorcentaje("");
        cargarProductos();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setActualizandoPrecios(false);
    }
  };

  // --- SUBMIT BLINDADO (Para evitar el Error 500) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);

    try {
      const formData = new FormData();
      formData.append("nombre", formValues.nombre);

      // Convertimos a número antes de enviar para evitar el 500
      formData.append("precio", Number(formValues.precio));
      formData.append("stock", Number(formValues.stock));

      formData.append("categoria", formValues.categoria);
      formData.append("ofertaDiaria", String(formValues.ofertaDiaria));

      if (formValues.vencimiento) {
        formData.append("vencimiento", formValues.vencimiento);
      }

      if (formValues.file) {
        formData.append("imagen", formValues.file);
      }

      const isEditing = !!productoEditando;

      // --- OJO AQUÍ: Verificamos el ID ---
      if (isEditing && !productoEditando.id) {
        console.error("No hay ID para editar!");
        return alert("Error: El producto no tiene un ID válido.");
      }

      const url = isEditing
        ? `${API_URL}/api/productos/${productoEditando.id}`
        : `${API_URL}/api/productos`;

      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        alert(isEditing ? "✅ ¡Actualizado!" : "✅ ¡Creado!");
        resetForm();
        cargarProductos();
      } else {
        // Si sigue el 500, este log nos dirá POR QUÉ (mira la consola de NestJS si podés)
        console.error("Error del servidor:", data);
        alert(`Error: ${data.message || "Error interno del servidor"}`);
      }
    } catch (err) {
      console.error("Error de red:", err);
    } finally {
      setGuardando(false);
    }
  };
  // --- FUNCIÓN DE RESET (Corregida para evitar el error de controlado/no controlado) ---
  const resetForm = () => {
    setProductoEditando(null);
    setFormValues({
      nombre: "",
      stock: "",
      precio: "",
      vencimiento: "", // React prefiere string vacío en lugar de null
      categoria: "",
      ofertaDiaria: false,
      file: null
    });
  };

  const productosFiltrados = productos.filter(p => {
    const cumpleBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    if (filtro === "porVencer") return p.cercaVencimiento && cumpleBusqueda;
    if (filtro === "oferta") return p.ofertaDiaria && cumpleBusqueda;
    return cumpleBusqueda;
  });
  // 1. Cálculos (antes del return del componente)
  const totalProductos = productos.length;
  const productosBajoStock = productos.filter(p => p.stock <= 5).length;
  const valorTotalInventario = productos.reduce((acc, p) => acc + (p.precio * p.stock), 0);

 return (
  <div className="p-6 max-w-7xl mx-auto min-h-screen">
    <h1 className="text-3xl font-bold text-white mb-8 text-center uppercase tracking-tighter">
      Panel de Inventario {guardando && <span className="text-orange-500 animate-pulse text-sm ml-2">(Guardando...)</span>}
    </h1>

    <ProductForm
      onSubmit={handleSubmit}
      values={formValues}
      setValues={setFormValues}
      isEditing={!!productoEditando}
      onCancel={resetForm}
      isLoading={guardando}
    />

    {/* 📊 DASHBOARD DE ESTADÍSTICAS (Ahora fuera y arriba) */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      {/* Card Total */}
      <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
        <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Total Productos</p>
        <h3 className="text-2xl font-black text-white">{totalProductos}</h3>
      </div>

      {/* Card Bajo Stock */}
      <div className={`border p-4 rounded-2xl backdrop-blur-sm transition-colors ${
        productosBajoStock > 0 ? 'bg-red-500/10 border-red-500/50' : 'bg-white/5 border-white/10'
      }`}>
        <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">⚠️ Bajo Stock</p>
        <h3 className={`text-2xl font-black ${productosBajoStock > 0 ? 'text-red-500' : 'text-white'}`}>
          {productosBajoStock}
        </h3>
      </div>

      {/* Card Valor Invertido */}
      <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
        <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Capital en Stock</p>
        <h3 className="text-2xl font-black text-emerald-400">
          ${valorTotalInventario.toLocaleString('es-AR')}
        </h3>
      </div>
    </div>

    {/* 🛠️ PANEL DE HERRAMIENTAS (Buscador y Filtros) */}
    <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md border border-white/10 mb-8">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex flex-wrap gap-4 flex-1">
          <input
            type="text" 
            placeholder="🔍 Buscar..."
            className="flex-1 min-w-[200px] p-3 rounded-xl bg-white/5 text-white border border-white/10 outline-none focus:border-orange-500"
            value={busqueda} 
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <select
            className="p-3 rounded-xl bg-stone-800 text-white border border-white/10 outline-none cursor-pointer"
            value={filtro} 
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="bajoStock">📉 Bajo Stock</option> {/* Agregamos esta opción */}
            <option value="porVencer">⚠️ Por Vencer</option>
            <option value="oferta">🔥 Ofertas</option>
          </select>
        </div>

        {/* Sección Aumento Masivo */}
        <div className="flex items-center gap-3 bg-orange-500/10 p-2 rounded-2xl border border-orange-500/20">
          <input
            type="number" 
            placeholder="% Aumento"
            className="w-24 p-2 rounded-lg bg-stone-900 text-white border border-orange-500/50"
            value={porcentaje} 
            onChange={(e) => setPorcentaje(e.target.value)}
            disabled={actualizandoPrecios}
          />
          <button
            onClick={aplicarAumentoMasivo}
            disabled={actualizandoPrecios}
            className={`bg-orange-500 text-white px-4 py-2 rounded-lg font-bold transition ${actualizandoPrecios ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'}`}
          >
            {actualizandoPrecios ? "Actualizando..." : "Actualizar Masivo"}
          </button>
        </div>
      </div>
    </div>

    {/* Grilla de Productos */}
    {cargandoLista ? (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
      </div>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {productosFiltrados.map(prod => (
          <InventoryItem
            key={prod.id}
            producto={prod}
            onEdit={(p) => {
              setProductoEditando(p);
              setFormValues({
                nombre: p.nombre || "",
                stock: p.stock ?? "",
                precio: p.precio ?? "",
                vencimiento: p.vencimiento ? p.vencimiento.split('T')[0] : "",
                categoria: p.categoria || "Almacen",
                ofertaDiaria: !!p.ofertaDiaria,
                file: null
              });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onDelete={async (id) => {
              if (!confirm("¿Seguro?")) return;
              await fetch(`${API_URL}/api/productos/${id}`, { method: "DELETE" });
              cargarProductos();
            }}
            onNotify={(p) => {
              const msg = `Hola! Te aviso que el producto *${p.nombre}* está cerca de su fecha de vencimiento.`;
              window.open(`https://wa.me/5491121676940?text=${encodeURIComponent(msg)}`);
            }}
          />
        ))}
      </div>
    )}
  </div>
);}