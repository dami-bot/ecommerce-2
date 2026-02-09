import React from 'react';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <div style={styles.logo}>
          <span style={styles.logoText}>MARKET</span>
          <span style={styles.logoDot}>.</span>
          <span style={styles.logoSub}>ADMIN</span>
        </div>
        
        <ul style={styles.navLinks}>
          <li style={styles.li}><a href="#productos" style={styles.link}>Productos</a></li>
          <li style={styles.li}><a href="#ventas" style={styles.link}>Ventas</a></li>
          <li style={styles.li}>
            <button style={styles.statusBadge}>Online</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    // 📌 Esto lo deja fijo arriba
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    
    // ✨ Efecto "Glassmorphism"
    background: 'rgba(26, 28, 34, 0.85)', 
    backdropFilter: 'blur(10px)', 
    WebkitBackdropFilter: 'blur(10px)',
    
    borderBottom: '1px solid #333',
    padding: '0 20px',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.3s ease',
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'baseline',
    gap: '2px'
  },
  logoText: {
    color: '#fff',
    fontSize: '22px',
    fontWeight: '800',
    letterSpacing: '1px'
  },
  logoDot: {
    color: '#ff6b00',
    fontSize: '28px',
    fontWeight: 'bold'
  },
  logoSub: {
    color: '#aaa',
    fontSize: '14px',
    fontWeight: '400',
    textTransform: 'uppercase'
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    listStyle: 'none',
    gap: '25px',
    margin: 0,
    padding: 0,
  },
  li: {
    margin: 0
  },
  link: {
    color: '#eee',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
    transition: 'color 0.2s',
    '&:hover': { color: '#ff6b00' } // Nota: Esto requiere CSS real o un evento onMouseEnter
  },
  statusBadge: {
    background: 'rgba(37, 211, 102, 0.1)',
    color: '#25D366',
    border: '1px solid #25D366',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
};

export default Navbar;