import { useEffect, useState } from 'react';
import { MarketplaceForm } from '../components/marketplace/XForm';

const MarketplaceAdmin = () => {
  const [productos, setProductos] = useState([]);

  const marcarVendido = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/marketplace/${id}/vender`, {
        method: 'PATCH', // Importante que sea PATCH
      });

      if (res.ok) {
        // ESTA LÍNEA ES CLAVE: Refresca la lista del Admin
        await cargarProductos();
        alert("¡Producto marcado como vendido! 🚀");
      } else {
        console.error("Error al marcar como vendido");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };
  const reactivarProducto = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/marketplace}/reactivar`, {
        method: 'PATCH',
      });

      if (res.ok) {
        await cargarProductos(); // Refrescamos la tabla
        alert("¡Producto nuevamente a la venta! 💰");
      }
    } catch (error) {
      console.error("Error al reactivar:", error);
    }
  };

  // Función para traer los productos
  const cargarProductos = async () => {
    try {
      const res = await fetch('https://backend-railway-production-d546.up.railway.app/marketplace');
      const data = await res.json();

      // Verificamos si data es realmente un Array antes de guardarlo
      if (Array.isArray(data)) {
        setProductos(data);
      } else {
        console.error("El backend no devolvió un array:", data);
        setProductos([]); // Si no es array, ponemos lista vacía para que no explote
      }
    } catch (error) {
      console.error("Error cargando productos:", error);
      setProductos([]); // Si hay error de red, lista vacía
    }
  };

  // Función para borrar
  const eliminarProducto = async (id) => {
    if (window.confirm("¿Estás seguro de que querés borrar este producto?")) {
      await fetch(`http://localhost:8080/marketplace/${id}`, { method: 'DELETE' });
      cargarProductos(); // Recargamos la lista
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div style={{ padding: '40px', backgroundColor: '#fdfdfd', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Panel Marketplace</h1>

      {/* Pasamos cargarProductos como prop para que el form avise cuando termine */}
      <MarketplaceForm onProductCreated={cargarProductos} />

      <h2 style={{ marginTop: '50px', color: '#ff6b00' }}>Productos Activos</h2>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={{ background: '#eee' }}>
              <th>Producto</th>
              <th>Precio Final</th>
              <th>Vendedor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(productos) && productos.map(p => (
              <tr key={p.id} style={{
                ...styles.row,
                backgroundColor: p.estado === 'vendido' ? '#f8f8f8' : 'white' // Fondo gris si está vendido
              }}>
                <td style={{ padding: '10px' }}>
                  {p.nombre}
                  {p.estado === 'vendido' && <span style={styles.soldBadge}> (Vendido)</span>}
                </td>
                <td>${p.precioFinal}</td>
                <td>{p.vendedorNombre}</td>
                <td>
                  {p.estado === 'vendido' ? (
                    // BOTÓN PARA VOLVER A PONER A LA VENTA
                    <button
                      onClick={() => reactivarProducto(p.id)}
                      style={{ ...styles.venderBtn, backgroundColor: '#007bff' }} // Azul para reactivar
                    >
                      🔄 Volver a poner a la venta
                    </button>
                  ) : (
                    // BOTÓN PARA MARCAR COMO VENDIDO
                    <button
                      onClick={() => marcarVendido(p.id)}
                      style={styles.venderBtn}
                    >
                      Marcar Vendido
                    </button>
                  )}

                  <button onClick={() => eliminarProducto(p.id)} style={styles.deleteBtn}>
                    Eliminar
                  </button>
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
  tableContainer: { marginTop: '20px', overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '10px' },
  row: { borderBottom: '1px solid #ddd', textAlign: 'left' },
  deleteBtn: { backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' },
  venderBtn: { backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' },
  soldBadge: { color: '#d32f2f', fontWeight: 'bold', fontSize: '12px' }
};

export default MarketplaceAdmin;