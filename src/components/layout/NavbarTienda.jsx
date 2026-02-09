const NavbarTienda = () => (
  <nav style={navStyles.nav}>
    <div style={navStyles.container}>
      <div style={navStyles.logoContainer}>
        <div style={navStyles.logoIcon}>M</div>
        <span style={navStyles.logoText}>
          Market<span style={{ color: '#ff6b00' }}>Plus</span>
        </span>
      </div>
      
      <div style={navStyles.menu}>
        <div style={navStyles.badge}>
          <span style={navStyles.dot}></span>
          TIENDA OFICIAL
        </div>
      </div>
    </div>
  </nav>
);

const navStyles = {
  nav: {
    // 📌 POSICIONAMIENTO ABSOLUTO ARRIBA
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999, // Super por encima de todo
    
    // ✨ DISEÑO GLASSMORPHISM
    height: '70px',
    backgroundColor: 'rgba(10, 11, 14, 0.8)', // Fondo oscuro traslúcido
    backdropFilter: 'blur(12px)', // Desenfoque de fondo
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
  },
  logoIcon: {
    background: 'linear-gradient(135deg, #ff6b00 0%, #ff8800 100%)',
    color: 'white',
    width: '35px',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '20px',
    boxShadow: '0 4px 15px rgba(255, 107, 0, 0.3)',
  },
  logoText: {
    color: 'white',
    fontSize: '22px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '6px 14px',
    borderRadius: '100px',
    color: '#aaa',
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '1px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  dot: {
    width: '6px',
    height: '6px',
    backgroundColor: '#25D366',
    borderRadius: '50%',
    boxShadow: '0 0 10px #25D366',
  },
};