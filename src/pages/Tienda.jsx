import { useState, useEffect, useMemo } from "react";
import { ProductCard } from "../components/ProductCard";
import { OfferCarousel } from "../components/OfferCarousel";
import CartDrawer from "../components/CartDrawer";
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast'; // ✅ Importamos toast

const API_URL = import.meta.env.VITE_API_URL;

export default function Tienda() {
  const { carrito, agregarAlCarrito } = useCart(); 

  const [productos, setProductos] = useState([]);  
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSel, setCategoriaSel] = useState("Todos"); // ✅ Estado para categoría
  const [openCart, setOpenCart] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const limit = 20;

  // Lista de categorías (Asegurate que coincidan con las de tu DB)
  const categorias = ["Todos", "Almacen", "Bebidas", "Limpieza", "Golosinas", "Fiambres"];

  const fetchProductos = async (pagina) => {
    try {
      const res = await fetch(`${API_URL}/api/productos?page=${pagina}&limit=${limit}`);
      const data = await res.json();
      if (data.length < limit) setHasMore(false);
      setProductos((prev) => {
        const nuevos = data.filter(p => !prev.some(existente => existente.id === p.id));
        return [...prev, ...nuevos];
      });
    } catch (err) {
      console.error("❌ Error cargando productos:", err);
    }
  };

  useEffect(() => { fetchProductos(page); }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore || busqueda !== "" || categoriaSel !== "Todos") return; // Pausar scroll si está filtrando
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, busqueda, categoriaSel]);

  // --- LÓGICA DE FILTRADO COMBINADA ---
  const productosFiltrados = useMemo(() => {
    return productos.filter(p => {
      const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
      const coincideCat = categoriaSel === "Todos" || p.categoria === categoriaSel;
      return coincideNombre && coincideCat;
    });
  }, [productos, busqueda, categoriaSel]);

  const ofertas = productos.filter(p => p.ofertaDiaria);

  // --- FUNCIÓN AGREGAR CON TOAST ---
  const manejarAgregar = (prod) => {
    agregarAlCarrito(prod);
    toast.success(`${prod.nombre} al carrito`, {
      icon: '🛒',
      style: { borderRadius: '15px', background: '#333', color: '#fff' },
    });
  };

  return (
    <div className="container mx-auto px-4 pb-20">
      {/* 1. Carrusel de Ofertas */}
      {ofertas.length > 0 && (
        <OfferCarousel ofertas={ofertas} agregarAlCarrito={manejarAgregar} />
      )}

      {/* 2. Buscador y Filtros */}
      <div className="flex flex-col items-center my-10 space-y-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="w-full p-4 pl-12 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 backdrop-blur-md focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <span className="absolute left-4 top-4 opacity-50">🔍</span>
        </div>

        {/* 3. Selector de Categorías (Pills) */}
        <div className="flex flex-wrap justify-center gap-2">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaSel(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                categoriaSel === cat 
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/40 scale-105" 
                : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Grilla de Productos */}
      {productosFiltrados.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {productosFiltrados.map(prod => (
            <ProductCard 
              key={prod.id} 
              producto={prod} 
              agregarAlCarrito={manejarAgregar} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-20">
          No se encontraron productos en esta categoría.
        </div>
      )}

      <CartDrawer isOpen={openCart} onClose={() => setOpenCart(false)} />

      {/* Botón flotante para móviles */}
      <button 
        onClick={() => setOpenCart(true)}
        className="fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-2xl z-40 lg:hidden font-bold active:scale-90 transition-transform"
      >
        🛒 {carrito.length}
      </button>
    </div>
  );
}