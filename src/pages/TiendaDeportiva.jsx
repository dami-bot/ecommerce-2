import NavbarSports from '../components/sports-shop/NavbarSports';
import HeroSports from '../components/sports-shop/HeroSports'; // Antes decía Hero
import CategoryGrid from '../components/sports-shop/CategoryGrid'; // Antes decía Categoy
import Features from '../components/sports-shop/Features';
import CustomOrders from '../components/sports-shop/CustomOrders';
import SportsProductCard from '../components/sports-shop/SportsProductCard'; // <-- ESTA FALTABA

const productosDestacados = [
  {
    id: 1,
    nombre: "Remera Técnica Ultra-Dry",
    categoria: "Running",
    precio: 24900,
    imagen: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000&auto=format&fit=crop",
    imagen2: "https://images.unsplash.com/photo-1516211613529-661705607b39?q=80&w=1000&auto=format&fit=crop",
    isNew: true
  },
  {
    id: 2,
    nombre: "Short Compresión Pro",
    categoria: "Training",
    precio: 18500,
    imagen: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1000&auto=format&fit=crop",
    imagen2: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1000&auto=format&fit=crop",
    isNew: false
  },
  {
    id: 3,
    nombre: "Calza Térmica Factory-Edge",
    categoria: "Crossfit",
    precio: 32000,
    imagen: "https://images.unsplash.com/photo-1539109132314-d49c02d8214d?q=80&w=1000&auto=format&fit=crop",
    imagen2: "https://images.unsplash.com/photo-1506629082925-6391f295b935?q=80&w=1000&auto=format&fit=crop",
    isNew: true
  },
  {
    id: 4,
    nombre: "Musculosa Mesh Breathable",
    categoria: "Gym",
    precio: 15900,
    imagen: "https://images.unsplash.com/photo-1571945153237-4929e783ee4a?q=80&w=1000&auto=format&fit=crop",
    imagen2: "https://images.unsplash.com/photo-1583454110551-21f2fa29617d?q=80&w=1000&auto=format&fit=crop",
    isNew: false
  }
];

export default function TiendaDeportiva() {
  return (
    <div className="bg-black min-h-screen pt-16"> {/* pt-16 para que el Hero no quede atrás del Navbar fijo */}
      <NavbarSports />
      <HeroSports />
      <CategoryGrid />
      {/* SECCIÓN DE PRODUCTOS DESTACADOS */}
      <section className="py-20 bg-stone-950 px-4">
        <div className="container mx-auto">
          <div className="mb-12">
            <h2 className="text-orange-600 font-bold uppercase tracking-tighter italic text-xl">Lo más buscado</h2>
            <p className="text-white text-4xl font-black uppercase tracking-tighter">Novedades de Fábrica</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productosDestacados.map(prod => (
              <SportsProductCard key={prod.id} producto={prod} />
            ))}
          </div>
        </div>
      </section>
      <Features />
      <CustomOrders />

      {/* Footer simple para cerrar */}
      <footer className="py-10 text-center text-gray-600 text-xs border-t border-white/5">
        &copy; 2026 DamiWeb.jsx - TODOS LOS DERECHOS RESERVADOS.
      </footer>
    </div>
  );
}