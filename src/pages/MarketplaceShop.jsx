import { useEffect, useState } from 'react';
import { MarketplaceCard } from '../components/marketplace/MarketplaceCard';

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
      
      {/* 📌 CABECERA FIJA INTEGRAL */}
      <div style={styles.fixedHeader}>
        <nav style={styles.nav}>
          <div style={styles.logoContainer}>
            <div style={styles.logoIcon}>M</div>
            <span style={styles.logoText}>Market<span style={{color: '#ff6b00'}}>Plus</span></span>
          </div>
          <div style={styles.badgeTienda}>TIENDA OFICIAL</div>
        </nav>

        <div style={styles.searchSection}>
          <div style={styles.searchContainer}>
            <h1 style={styles.miniTitle}>Marketplace <span style={{color: '#ff6b00'}}>Usados</span></h1>
            <div style={styles.searchWrapper}>
              <input 
                type="text" 
                placeholder="🔍 Buscar herramientas, heladeras..." 
                style={styles.searchInput}
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 🚀 EL CONTENIDO (Con padding para no quedar debajo de la cabecera) */}
      <main style={styles.mainContent}>
        <div style={styles.container}>
          <div style={styles.grid}>
            {itemsFiltrados.map(item => (
              <MarketplaceCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#0f1115',
    backgroundImage: 'radial-gradient(circle at top right, #1a1c22, #0f1115)',
    color: '#ffffff'
  },
  fixedHeader: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(26, 28, 34, 0.9)', // Glassmorphism
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid #333',
  },
  nav: {
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: '10px 40px',
    maxWidth: '1300px',
    margin: '0 auto'
  },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '10px' },
  logoIcon: { background: '#ff6b00', color: 'white', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', fontWeight: 'bold' },
  logoText: { fontSize: '20px', fontWeight: '800', color: '#ffffff' },
  badgeTienda: { fontSize: '10px', color: '#25D366', border: '1px solid #25D366', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold' },
  
  searchSection: {
    padding: '10px 40px 20px 40px',
  },
  searchContainer: {
    maxWidth: '1300px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px'
  },
  miniTitle: { fontSize: '24px', fontWeight: '800', margin: 0 },
  searchWrapper: { 
    flex: 1,
    maxWidth: '500px',
    background: '#1a1c22', 
    borderRadius: '10px', 
    border: '1px solid #444',
  },
  searchInput: { 
    width: '100%', 
    padding: '12px 15px', 
    borderRadius: '10px', 
    border: 'none', 
    outline: 'none', 
    fontSize: '14px', 
    background: 'transparent', 
    color: 'white' 
  },

  mainContent: {
    paddingTop: '160px', // 🚨 IMPORTANTE: Espacio para que el grid no se tape
  },
  container: { padding: '20px', maxWidth: '1300px', margin: 'auto' },
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
    gap: '25px', 
    justifyItems: 'center' 
  }
};

export default MarketplaceShop;