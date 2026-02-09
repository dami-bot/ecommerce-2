import { useState, useEffect } from 'react';

export const MarketplaceForm = ({ onProductCreated, productoAEditar, setProductoAEditar }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    precioFinal: '', // Lo usamos en el input por comodidad
    vendedorNombre: '',
    vendedorCelular: '', // Lo usamos en el input por comodidad
    descripcion: '',
    categoria: 'Equipamiento',
    imagen: ''
  });

  // 1. Al editar, mapeamos lo que viene de la DB a los campos del formulario
  useEffect(() => {
    if (productoAEditar) {
      setForm({
        nombre: productoAEditar.nombre || '',
        precioFinal: productoAEditar.precioBase || '', // DB usa precioBase
        vendedorNombre: productoAEditar.vendedorNombre || '',
        vendedorCelular: productoAEditar.vendedorTelefono || '', // DB usa vendedorTelefono
        descripcion: productoAEditar.descripcion || '',
        categoria: productoAEditar.categoria || 'Equipamiento',
        imagen: productoAEditar.imagen || ''
      });
    }
  }, [productoAEditar]);

  const uploadToCloudinary = async () => {
    if (!file) return form.imagen;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: data }
    );
    const fileData = await res.json();
    return fileData.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const imagenUrl = await uploadToCloudinary();
      const esEdicion = !!productoAEditar;
      
      const url = esEdicion 
        ? `https://backend-railway-production-d546.up.railway.app/marketplace/${productoAEditar.id}`
        : `https://backend-railway-production-d546.up.railway.app/marketplace`;

      // 2. CREAMOS EL PAYLOAD CON LOS NOMBRES EXACTOS DE LA DB
      const bodyEnvio = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        categoria: form.categoria,
        imagen: imagenUrl,
        vendedorNombre: form.vendedorNombre,
        precioBase: parseFloat(form.precioFinal), // Mapeo a precioBase
        vendedorTelefono: form.vendedorCelular,   // Mapeo a vendedorTelefono
        estado: productoAEditar?.estado || 'activo'
      };

      const res = await fetch(url, {
        method: esEdicion ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyEnvio),
      });

      if (res.ok) {
        alert(esEdicion ? "✅ Cambios guardados" : "🚀 Producto publicado");
        // Limpiamos el formulario
        setForm({ nombre: '', precioFinal: '', vendedorNombre: '', vendedorCelular: '', descripcion: '', categoria: 'Equipamiento', imagen: '' });
        setFile(null);
        setProductoAEditar(null);
        onProductCreated();
      } else {
        const errorData = await res.json();
        console.error("Error del servidor:", errorData);
        alert("Error en el servidor: " + (errorData.message || "No se pudo guardar"));
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{productoAEditar ? "📝 Editar Producto" : "Cargar Producto"}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input style={styles.input} placeholder="¿Qué vendés?" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
        <input style={styles.input} type="number" placeholder="Precio ($)" value={form.precioFinal} onChange={e => setForm({...form, precioFinal: e.target.value})} required />
        
        <div style={styles.fileContainer}>
          <label style={{color: '#ff6b00', display: 'block', marginBottom: '5px'}}>📸 Foto</label>
          <input type="file" onChange={e => setFile(e.target.files[0])} style={styles.fileInput} />
          {form.imagen && !file && <p style={{fontSize: '11px', color: '#25D366'}}>Imagen actual guardada</p>}
        </div>

        <input style={styles.input} placeholder="Tu Nombre" value={form.vendedorNombre} onChange={e => setForm({...form, vendedorNombre: e.target.value})} />
        <input style={styles.input} placeholder="WhatsApp (Ej: 54911...)" value={form.vendedorCelular} onChange={e => setForm({...form, vendedorCelular: e.target.value})} />
        <textarea style={styles.textarea} placeholder="Breve descripción..." value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} />
        
        <div style={{display: 'flex', gap: '10px'}}>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "ESPERE..." : productoAEditar ? "GUARDAR CAMBIOS" : "PUBLICAR"}
          </button>
          {productoAEditar && (
            <button type="button" onClick={() => setProductoAEditar(null)} style={styles.cancelButton}>
              CANCELAR
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: { background: '#1a1c22', padding: '25px', borderRadius: '15px', border: '1px solid #333', maxWidth: '500px', margin: '20px auto' },
  title: { color: '#ff6b00', textAlign: 'center', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#0f1115', color: 'white', outline: 'none' },
  textarea: { padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#0f1115', color: 'white', minHeight: '80px', outline: 'none' },
  fileContainer: { padding: '15px', border: '1px dashed #444', textAlign: 'center', borderRadius: '8px' },
  fileInput: { color: '#aaa', fontSize: '13px' },
  button: { background: '#ff6b00', color: 'white', padding: '14px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', flex: 2 },
  cancelButton: { background: '#444', color: 'white', padding: '14px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', flex: 1 }
};