import { useEffect, useState } from 'react';
import { MarketplaceCard } from '../components/marketplace/MarketplaceCard';

const NavbarTienda = () => (
  <nav style={navStyles.nav}>
    <div style={navStyles.logoContainer}>
      <div style={navStyles.logoIcon}>M</div>
      <span style={navStyles.logoText}>Market<span style={{color: '#ff6b00'}}>Plus</span></span>
    </div>
    <div style={navStyles.links}>
      {/* <span style={navStyles.tagline}>Equipamiento Profesional</span> */}
    </div>
  </nav>
);

const MarketplaceShop = () => {
  const [items, setItems] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetch('https://backend-railway-production-d546.up.railway.app/marketplace')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setItems(data);
      });
  }, []);

  const itemsFiltrados = items
    .filter(item => 
      item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
    )
    .sort((a, b) => (a.estado === 'vendido' ? 1 : -1));

  return (
    <div style={styles.page}>
      <NavbarTienda />

      <header style={styles.hero}>
        <h1 style={styles.mainTitle}>Marketplace de Usados</h1>
        <p style={styles.subTitle}>Equipamiento con historia, listo para producir.</p>
        
        <div style={styles.searchWrapper}>
          <input 
            type="text" 
            placeholder="🔍 Buscar herramientas, heladeras, muebles..." 
            style={styles.searchInput}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </header>

      <div style={styles.container}>
        <div style={styles.grid}>
          {itemsFiltrados.map(item => (
            <MarketplaceCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

const navStyles = {
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '15px 40px', background: '#1a1c22', // Fondo oscuro sólido
    position: 'sticky', top: 0, zIndex: 1000,
    borderBottom: '1px solid #333'
  },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '10px' },
  logoIcon: { background: '#ff6b00', color: 'white', width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', fontWeight: 'bold' },
  logoText: { fontSize: '22px', fontWeight: '800', color: '#ffffff' },
  tagline: { fontSize: '13px', color: '#aaa', fontWeight: '400' }
};

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#0f1115', // Fondo principal oscuro
    backgroundImage: 'radial-gradient(circle at top right, #1a1c22, #0f1115)', // Efecto de profundidad
    color: '#ffffff'
  },
  hero: { padding: '80px 20px 40px 20px', textAlign: 'center' },
  mainTitle: { 
    fontSize: '48px', 
    fontWeight: '800', 
    color: '#ffffff', 
    marginBottom: '10px',
    textShadow: '0 2px 10px rgba(0,0,0,0.5)' 
  },
  subTitle: { fontSize: '19px', color: '#aaa', marginBottom: '40px' },
  searchWrapper: { 
    maxWidth: '600px', 
    margin: '0 auto', 
    background: '#1a1c22', 
    borderRadius: '12px', 
    padding: '2px', 
    border: '1px solid #333',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)' 
  },
  searchInput: { 
    width: '100%', 
    padding: '16px 20px', 
    borderRadius: '10px', 
    border: 'none', 
    outline: 'none', 
    fontSize: '16px', 
    background: 'transparent', 
    color: 'white' 
  },
  container: { padding: '40px', maxWidth: '1300px', margin: 'auto' },
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
    gap: '30px', 
    justifyItems: 'center' 
  }
};

export default MarketplaceShop;