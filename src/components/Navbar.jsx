import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-stone-900/80 backdrop-blur-md border-b border-white/10 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Título */}
        <Link to="/" className="text-2xl font-bold text-white tracking-tighter">
          DISTRIBUIDORA<span className="text-orange-500">ER</span>
        </Link>

        {/* Enlaces de Navegación */}
        <div className="flex gap-6 text-white/70 font-medium">
          <Link to="/" className="hover:text-white transition">
            Tienda
          </Link>
          <Link to="/admin/inventario" className="hover:text-white transition">
            Inventario
          </Link>
          <Link to="/admin/reportes" className="hover:text-white transition">
            Reportes
          </Link>
        </div>
      </div>
    </nav>
  );
}