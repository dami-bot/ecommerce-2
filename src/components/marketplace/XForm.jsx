import { useState, useEffect } from 'react';

// Agregamos las props productoAEditar y setProductoAEditar
export const MarketplaceForm = ({ onProductCreated, productoAEditar, setProductoAEditar }) => {
  const [form, setForm] = useState({
    nombre: '',
    precioBase: '',
    vendedorNombre: '',
    vendedorTelefono: '',
    descripcion: '',
    categoria: 'Equipamiento',
    imagen: '' // Guardamos la URL de la imagen aquí también
  });
  
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // EFECTO: Si 'productoAEditar' cambia, llenamos el formulario
  useEffect(() => {
    if (productoAEditar) {
      setForm({
        nombre: productoAEditar.nombre || '',
        precioBase: productoAEditar.precioFinal || '', // Usamos precioFinal que es el que viene del backend
        vendedorNombre: productoAEditar.vendedorNombre || '',
        vendedorTelefono: productoAEditar.vendedorCelular || '',
        descripcion: productoAEditar.descripcion || '',
        categoria: productoAEditar.categoria || 'Equipamiento',
        imagen: productoAEditar.imagen || ''
      });
    }
  }, [productoAEditar]);

  const uploadToCloudinary = async () => {
    if (!file) return form.imagen; // Si no hay archivo nuevo, devolvemos la URL que ya estaba
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
      
      // Definimos si es POST (nuevo) o PUT (editar)
      const esEdicion = !!productoAEditar;
      const url = esEdicion 
        ? `${import.meta.env.VITE_API_URL}/marketplace/${productoAEditar.id}`
        : `${import.meta.env.VITE_API_URL}/marketplace`;
      
      const res = await fetch(url, {
        method: esEdicion ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          precioBase: parseFloat(form.precioBase),
          imagen: imagenUrl
        }),
      });

      if (res.ok) {
        alert(esEdicion ? "¡Producto actualizado!" : "¡Producto publicado!");
        
        // Limpiamos todo
        setForm({ nombre: '', precioBase: '', vendedorNombre: '', vendedorTelefono: '', descripcion: '', categoria: 'Equipamiento', imagen: '' });
        setFile(null);
        if (setProductoAEditar) setProductoAEditar(null); // Salimos del modo edición
        onProductCreated(); // Refrescamos la tabla del Admin
      }
    } catch (error) {
      alert("Error al procesar el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        {productoAEditar ? "📝 Editar Producto" : "Cargar Producto Usado"}
      </h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input style={styles.input} placeholder="¿Qué vendés?" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
        <input style={styles.input} type="number" placeholder="Precio ($)" value={form.precioBase} onChange={e => setForm({...form, precioBase: e.target.value})} required />
        
        <div style={styles.fileContainer}>
          <label style={styles.fileLabel}>📸 Foto del Producto</label>
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} style={styles.fileInput} />
          {(file || form.imagen) && (
            <p style={styles.fileName}>
              {file ? `Nueva: ${file.name}` : "Imagen actual cargada ✅"}
            </p>
          )}
        </div>

        <input style={styles.input} placeholder="Vendedor" value={form.vendedorNombre} onChange={e => setForm({...form, vendedorNombre: e.target.value})} />
        <input style={styles.input} placeholder="WhatsApp (54911...)" value={form.vendedorTelefono} onChange={e => setForm({...form, vendedorTelefono: e.target.value})} />
        <textarea style={styles.textarea} placeholder="Descripción..." value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} />
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "PROCESANDO..." : productoAEditar ? "GUARDAR CAMBIOS" : "PUBLICAR"}
          </button>
          
          {productoAEditar && (
            <button 
              type="button" 
              onClick={() => {
                setProductoAEditar(null);
                setForm({ nombre: '', precioBase: '', vendedorNombre: '', vendedorTelefono: '', descripcion: '', categoria: 'Equipamiento', imagen: '' });
              }} 
              style={styles.cancelButton}
            >
              CANCELAR
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: { background: '#1a1c22', padding: '30px', borderRadius: '15px', border: '1px solid #333', maxWidth: '500px', margin: '20px auto' },
  title: { textAlign: 'center', color: '#ff6b00', marginBottom: '25px', fontSize: '24px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '12px 15px', borderRadius: '8px', border: '1px solid #333', background: '#0f1115', color: 'white', fontSize: '16px', outline: 'none' },
  textarea: { padding: '12px 15px', borderRadius: '8px', border: '1px solid #333', background: '#0f1115', color: 'white', fontSize: '16px', minHeight: '80px', outline: 'none' },
  fileContainer: { padding: '15px', border: '2px dashed #444', borderRadius: '8px', textAlign: 'center', backgroundColor: '#252830' },
  fileLabel: { display: 'block', fontWeight: 'bold', color: '#ff6b00', marginBottom: '10px' },
  fileInput: { fontSize: '14px', width: '100%', color: '#aaa' },
  fileName: { fontSize: '12px', color: '#25D366', marginTop: '8px' },
  button: { flex: 2, background: '#ff6b00', color: 'white', padding: '15px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' },
  cancelButton: { flex: 1, background: '#444', color: 'white', padding: '15px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }
};