import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tienda from './pages/Tienda';
/* import Inventario from './pages/Inventario';
import Reportes from './pages/Reportes';
import Navbar from './components/Navbar'; */
import { CartProvider } from './context/CartContext'
import { Toaster } from 'react-hot-toast';
import  MarketplaceAdmin from './pages/MarketplaceAdmin'
import MarketplaceShop from './pages/MarketplaceShop';

function App() {
  return (

    <CartProvider>
      <Toaster />
      <Router>
        
        <main className="pt-24"> {/* Espacio para que el Navbar no tape el contenido */}
          <Routes>
            <Route path="/admin" element={<MarketplaceAdmin />} />
            <Route path="/" element={<MarketplaceShop />} />
           {/*  <Route path="/" element={<Tienda />} /> */}
           {/*  <Route path="/admin/inventario" element={<Inventario />} />
            <Route path="/admin/reportes" element={<Reportes />} /> */}

          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;