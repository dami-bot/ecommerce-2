import { useState, useEffect, useRef } from "react";
import { ProductCard } from "../components/ProductCard";
import { OfferCarousel } from "../components/OfferCarousel";
import { CartDrawer } from "../components/CartDrawer";

const API_URL = import.meta.env.VITE_API_URL;

export default function Tienda() {
  // --- ESTADOS ---
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [openCart, setOpenCart] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // Datos del cliente para el pedido
  const [nombreCliente, setNombreCliente] = useState("");
  const [direccionCliente, setDireccionCliente] = useState("");

  const limit = 20;

  // --- LOGICA DE CARGA ---
  const fetchProductos = async (pagina) => {
    try {
      const res = await fetch(`${API_URL}/api/productos?page=${pagina}&limit=${limit}`);
      const data = await res.json();
      
      if (data.length < limit) setHasMore(false);
      
      // Evitar duplicados al concatenar
      setProductos((prev) => {
        const nuevos = data.filter(p => !prev.some(existente => existente.id === p.id));
        return [...prev, ...nuevos];
      });
    } catch (err) {
      console.error("❌ Error cargando productos:", err);
    }
  };

  useEffect(() => { fetchProductos(page); }, [page]);

  // --- SCROLL INFINITO ---
  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore) return;
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  // --- FUNCIONES DEL CARRITO ---
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        if (existe.cantidad >= producto.stock) {
          alert("⚠️ Sin más stock");
          return prev;
        }
        return prev.map((p) => p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p);
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const quitarDelCarrito = (id) => setCarrito(prev => prev.filter(p => p.id !== id));
  
  const totalCarrito = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);

  // --- FILTRADO ---
  const productosFiltrados = productos.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const ofertas = productos.filter(p => p.ofertaDiaria);

  return (
    <div className="container mx-auto px-4">
      {/* 1. Carrusel de Ofertas */}
      {ofertas.length > 0 && (
        <OfferCarousel 
          ofertas={ofertas} 
          agregarAlCarrito={agregarAlCarrito} 
          carrito={carrito} 
        />
      )}

      {/* 2. Buscador */}
      <div className="max-w-md mx-auto my-10">
        <input
          type="text"
          placeholder="🔍 Buscar productos..."
          className="w-full p-4 rounded-full bg-white/20 border border-white/30 text-white placeholder-white/70 backdrop-blur-md focus:ring-2 focus:ring-orange-400 outline-none"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* 3. Grilla de Productos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {productosFiltrados.map(prod => (
          <ProductCard 
            key={prod.id} 
            producto={prod} 
            agregarAlCarrito={agregarAlCarrito} 
          />
        ))}
      </div>

      {/* 4. Carrito Lateral (Drawer) */}
      <CartDrawer 
        isOpen={openCart}
        onClose={() => setOpenCart(false)}
        carrito={carrito}
        total={totalCarrito}
        nombreCliente={nombreCliente}
        setNombreCliente={setNombreCliente}
        direccionCliente={direccionCliente}
        setDireccionCliente={setDireccionCliente}
        quitarDelCarrito={quitarDelCarrito}
      />

      {/* Botón flotante para abrir carrito en móviles */}
      <button 
        onClick={() => setOpenCart(true)}
        className="fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-2xl z-40 lg:hidden"
      >
        🛒 {carrito.length}
      </button>
    </div>
  );
}