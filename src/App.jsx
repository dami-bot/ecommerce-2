import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tienda from './pages/Tienda';
import Inventario from './pages/Inventario';
import Reportes from './pages/Reportes';
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <Navbar /> 
      <main className="pt-24"> {/* Espacio para que el Navbar no tape el contenido */}
        <Routes>
          <Route path="/" element={<Tienda />} />
          <Route path="/admin/inventario" element={<Inventario />} />
          <Route path="/admin/reportes" element={<Reportes />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;