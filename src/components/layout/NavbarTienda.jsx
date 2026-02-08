export const Navbar = () => {
  return (
    <nav style={navStyles.nav}>
      <div style={navStyles.logoContainer}>
        <div style={navStyles.logoIcon}>M</div>
        <span style={navStyles.logoText}>Market<span style={{color: '#ff6b00'}}>Plus</span></span>
      </div>
      <div style={navStyles.links}>
        <span style={navStyles.tagline}>Distribuidora de Usados</span>
      </div>
    </nav>
  );
};

const navStyles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 40px',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '10px' },
  logoIcon: {
    background: '#ff6b00',
    color: 'white',
    width: '35px',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '20px'
  },
  logoText: { fontSize: '22px', fontWeight: '800', color: '#333', letterSpacing: '-0.5px' },
  tagline: { fontSize: '14px', color: '#777', fontWeight: '500' }
};