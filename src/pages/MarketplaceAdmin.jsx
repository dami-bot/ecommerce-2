import { useEffect, useState } from 'react';
import { MarketplaceForm } from '../components/marketplace/XForm';

const MarketplaceAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null); // Para la función de editar

  // URL base de tu backend en Railway
  const API_URL = "https://backend-railway-production-d546.up.railway.app/marketplace";

  // 1. Cargar productos
  const cargarProductos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data)) {
        setProductos(data);
      } else {
        setProductos([]);
      }
    } catch (error) {
      console.error("Error cargando productos:", error);
      setProductos([]);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // 2. Marcar como vendido
  const marcarVendido = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}/vender`, { method: 'PATCH' });
      if (res.ok) {
        await cargarProductos();
        alert("¡Producto marcado como vendido! 🚀");
      }
    } catch (error) {
      console.error("Error al marcar como vendido:", error);
    }
  };

  // 3. Reactivar producto
  const reactivarProducto = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}/reactivar`, { method: 'PATCH' });
      if (res.ok) {
        await cargarProductos();
        alert("¡Producto nuevamente a la venta! 💰");
      }
    } catch (error) {
      console.error("Error al reactivar:", error);
    }
  };

  // 4. Eliminar producto
  const eliminarProducto = async (id) => {
    if (window.confirm("¿Estás seguro de que querés borrar este producto?")) {
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (res.ok) {
          cargarProductos();
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  // 5. Función para activar la edición
  const handleEditar = (producto) => {
    setProductoAEditar(producto);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Sube al formulario
  };

  return (
    <div style={styles.adminPage}>
      <h1 style={styles.title}>Panel Marketplace</h1>

      {/* Formulario: ahora recibe el producto a editar */}
      <MarketplaceForm 
        onProductCreated={cargarProductos} 
        productoAEditar={productoAEditar}
        setProductoAEditar={setProductoAEditar}
      />

      <h2 style={styles.subTitle}>Gestión de Inventario</h2>
      
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th>Producto</th>
              <th>Precio</th>
              <th>Vendedor / Celular</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id} style={{
                ...styles.row,
                backgroundColor: p.estado === 'vendido' ? '#14161a' : '#1a1c22',
                opacity: p.estado === 'vendido' ? 0.6 : 1
              }}>
                <td style={{ padding: '15px' }}>
                  <strong>{p.nombre}</strong>
                </td>
                <td style={{ color: '#ff6b00', fontWeight: 'bold' }}>${p.precioFinal}</td>
                <td>
                  <div style={styles.vendedorBox}>
                    <span>{p.vendedorNombre}</span>
                    <br />
                    <small style={{ color: '#aaa' }}>{p.vendedorCelular || "Sin número"}</small>
                    {p.vendedorCelular && (
                      <a 
                        href={`https://wa.me/${p.vendedorCelular.replace(/\D/g, '')}`} 
                        target="_blank" 
                        rel="noreferrer"
                        style={styles.waLink}
                      >
                        📲 WhatsApp
                      </a>
                    )}
                  </div>
                </td>
                <td>
                  <span style={p.estado === 'vendido' ? styles.badgeVendido : styles.badgeActivo}>
                    {p.estado.toUpperCase()}
                  </span>
                </td>
                <td style={styles.actions}>
                  <button onClick={() => handleEditar(p)} style={styles.editBtn}>✏️</button>
                  
                  {p.estado === 'vendido' ? (
                    <button onClick={() => reactivarProducto(p.id)} style={styles.reactivarBtn}>🔄</button>
                  ) : (
                    <button onClick={() => marcarVendido(p.id)} style={styles.venderBtn}>✅</button>
                  )}

                  <button onClick={() => eliminarProducto(p.id)} style={styles.deleteBtn}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  adminPage: { padding: '40px', backgroundColor: '#0f1115', minHeight: '100vh', color: 'white' },
  title: { textAlign: 'center', color: '#ff6b00', marginBottom: '30px', fontWeight: '800' },
  subTitle: { marginTop: '50px', color: '#ff6b00', borderBottom: '1px solid #333', paddingBottom: '10px' },
  tableContainer: { marginTop: '20px', overflowX: 'auto', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' },
  table: { width: '100%', borderCollapse: 'collapse', background: '#1a1c22' },
  headerRow: { background: '#252830', textAlign: 'left', color: '#aaa', fontSize: '14px' },
  row: { borderBottom: '1px solid #333', transition: '0.3s' },
  vendedorBox: { lineHeight: '1.4' },
  waLink: { color: '#25D366', textDecoration: 'none', fontSize: '11px', marginLeft: '5px', fontWeight: 'bold' },
  badgeActivo: { backgroundColor: '#2e7d32', color: 'white', padding: '3px 8px', borderRadius: '5px', fontSize: '11px' },
  badgeVendido: { backgroundColor: '#555', color: 'white', padding: '3px 8px', borderRadius: '5px', fontSize: '11px' },
  actions: { display: 'flex', gap: '10px', padding: '15px' },
  editBtn: { backgroundColor: '#007bff', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' },
  venderBtn: { backgroundColor: '#28a745', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' },
  reactivarBtn: { backgroundColor: '#6f42c1', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' },
  deleteBtn: { backgroundColor: '#dc3545', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }
};

export default MarketplaceAdmin;