import { useState, useEffect } from "react";
import { ProductForm } from "../components/ProductForm";
import { InventoryItem } from "../components/InventoryItem";
import { uploadToCloudinary } from "../utils/cloudinary";

const API_URL = import.meta.env.VITE_API_URL;

export default function Inventario() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("todos");
  const [porcentaje, setPorcentaje] = useState("");
  const [productoEditando, setProductoEditando] = useState(null);

  // Estado inicial para el formulario (limpio)
  const [formValues, setFormValues] = useState({
    nombre: "", stock: "", precio: "", vencimiento: "", ofertaDiaria: false, file: null
  });

  // 1. Cargar Productos
  const cargarProductos = async () => {
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
    } catch (err) { console.error("Error:", err); }
  };

  useEffect(() => { cargarProductos(); }, []);

  // 2. Agregar o Editar Producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imagenUrl = productoEditando?.imagenUrl || "";
      
      // Si hay un archivo nuevo, subirlo
      if (formValues.file) {
        imagenUrl = await uploadToCloudinary(formValues.file);
      }

      const method = productoEditando ? "PUT" : "POST";
      const url = productoEditando 
        ? `${API_URL}/api/productos/${productoEditando.id}`
        : `${API_URL}/api/productos`;

      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        if (key !== 'file') formData.append(key, value);
      });
      formData.append("imagenUrl", imagenUrl);

      const res = await fetch(url, { method, body: formData });

      if (res.ok) {
        alert(productoEditando ? "✅ Actualizado" : "✅ Agregado");
        resetForm();
        cargarProductos();
      }
    } catch (err) { console.error(err); }
  };

  const resetForm = () => {
    setProductoEditando(null);
    setFormValues({ nombre: "", stock: "", precio: "", vencimiento: "", ofertaDiaria: false, file: null });
  };

  // 3. Eliminar
  const eliminarProducto = async (id) => {
    if (!confirm("¿Seguro quieres eliminarlo?")) return;
    await fetch(`${API_URL}/api/productos/${id}`, { method: "DELETE" });
    cargarProductos();
  };

  // 4. Filtrado
  const productosFiltrados = productos.filter(p => {
    const cumpleBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    if (filtro === "porVencer") return p.cercaVencimiento && cumpleBusqueda;
    if (filtro === "oferta") return p.ofertaDiaria && cumpleBusqueda;
    return cumpleBusqueda;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Gestión de Inventario</h1>

      {/* Formulario (Componente Extraído) */}
      <ProductForm 
        onSubmit={handleSubmit}
        values={formValues}
        setValues={setFormValues}
        isEditing={!!productoEditando}
        onCancel={resetForm}
      />

      {/* Controles de Filtros */}
      <div className="flex flex-wrap justify-center gap-4 my-8 bg-white/10 p-4 rounded-2xl backdrop-blur-md">
        <input 
          type="text" placeholder="Buscar..." 
          className="p-2 rounded bg-white/20 text-white outline-none"
          value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
        />
        <select 
          className="p-2 rounded bg-gray-800 text-white"
          value={filtro} onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="porVencer">Por Vencer</option>
          <option value="oferta">En Oferta</option>
        </select>
      </div>

      {/* Grilla de Inventario */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {productosFiltrados.map(prod => (
          <InventoryItem 
            key={prod.id} 
            producto={prod} 
            onEdit={(p) => {
              setProductoEditando(p);
              setFormValues({ ...p, file: null });
            }}
            onDelete={eliminarProducto}
            onNotify={(p) => {
               const msg = `Hola, el producto ${p.nombre} vence pronto.`;
               window.open(`https://wa.me/5491121676940?text=${encodeURIComponent(msg)}`);
            }}
          />
        ))}
      </div>
    </div>
  );
}