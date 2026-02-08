export const MarketplaceCard = ({ item }) => {
  const TU_NUMERO_WA = "5491121676940"; 

  const esVendido = item.estado === 'vendido';

  const mensajeWa = `¡Hola! Me interesa la oportunidad que vi en el Marketplace:
📌 *Producto:* ${item.nombre}
💰 *Precio:* $${item.precioFinal}
👤 *Vendedor:* ${item.vendedorNombre}
---
¿Me podrían dar más información?`;

  const linkWa = `https://wa.me/${TU_NUMERO_WA}?text=${encodeURIComponent(mensajeWa)}`;

  return (
    <div style={{ 
      ...styles.card, 
      opacity: esVendido ? 0.7 : 1, 
      filter: esVendido ? 'grayscale(0.5)' : 'none' 
    }}>
      <div style={{ 
        ...styles.badge, 
        background: esVendido ? '#555' : '#ff6b00' 
      }}>
        {esVendido ? 'VENDIDO' : 'Oportunidad'}
      </div>

      <img src={item.imagen || 'https://via.placeholder.com/200'} alt={item.nombre} style={styles.image} />
      
      <div style={styles.info}>
        <h3 style={styles.name}>{item.nombre}</h3>
        <p style={styles.price}>${item.precioFinal}</p>
        
        {/* AGREGAMOS LA DESCRIPCIÓN AQUÍ */}
        <p style={styles.description}>
          {item.descripcion || "Sin descripción adicional."}
        </p>

       {/*  <p style={styles.vendedor}>Referencia: #MKP-{item.id}</p> */}
        
        {esVendido ? (
          <div style={styles.soldText}>PRODUCTO NO DISPONIBLE</div>
        ) : (
          <a href={linkWa} target="_blank" rel="noreferrer" style={styles.waButton}>
            Consultar Disponibilidad
          </a>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: { background: '#1a1c22', border: '1px solid #333', color:'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', position: 'relative', width: '280px', transition: '0.3s' },
  badge: { position: 'absolute', top: '10px', right: '10px', color: 'white', padding: '5px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', zIndex: 10 },
  image: { width: '100%', height: '180px', objectFit: 'cover' },
  info: { padding: '15px' },
  name: { fontSize: '18px', margin: '0 0 5px 0', color: 'white', fontWeight: 'bold' },
  price: { fontSize: '22px', fontWeight: 'bold', color: '#ff6b00', margin: '0' },
  
  // Estilo para la nueva descripción
  description: { 
    fontSize: '14px', 
    color: '#aaa', // Gris claro para que no brille tanto como el título
    margin: '10px 0',
    lineHeight: '1.4',
    height: '40px', // Altura fija para que todas las cards midan lo mismo
    overflow: 'hidden', // Corta el texto si es muy largo
    display: '-webkit-box',
    WebkitLineClamp: 2, // Máximo 2 líneas
    WebkitBoxOrient: 'vertical'
  },

  vendedor: { fontSize: '11px', color: '#555', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' },
  waButton: { display: 'block', textAlign: 'center', background: '#25D366', color: 'white', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' },
  
  soldText: { 
    textAlign: 'center', 
    background: '#333', 
    color: '#777', 
    padding: '10px', 
    borderRadius: '8px', 
    fontWeight: 'bold',
    fontSize: '14px',
    border: '1px solid #444'
  }
};