import { useState } from 'react';

export const MarketplaceForm = ({ onProductCreated }) => {
  const [form, setForm] = useState({
    nombre: '',
    precioBase: '',
    vendedorNombre: '',
    vendedorTelefono: '',
    descripcion: '',
    categoria: 'Equipamiento'
  });
  
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadToCloudinary = async () => {
    if (!file) return "";
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/marketplace`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          precioBase: parseFloat(form.precioBase),
          imagen: imagenUrl
        }),
      });

      if (res.ok) {
        alert("¡Producto publicado!");
        setForm({ nombre: '', precioBase: '', vendedorNombre: '', vendedorTelefono: '', descripcion: '', categoria: 'Equipamiento' });
        setFile(null);
        onProductCreated();
      }
    } catch (error) {
      alert("Error al cargar el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Cargar Producto Usado</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input style={styles.input} placeholder="¿Qué vendés? (Ej: Bicicleta)" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
        <input style={styles.input} type="number" placeholder="Precio para el vendedor ($)" value={form.precioBase} onChange={e => setForm({...form, precioBase: e.target.value})} required />
        
        {/* Input de Archivo Estilizado */}
        <div style={styles.fileContainer}>
          <label style={styles.fileLabel}>📸 Foto del Producto</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={e => setFile(e.target.files[0])} 
            style={styles.fileInput}
          />
          {file && <p style={styles.fileName}>Archivo seleccionado: {file.name}</p>}
        </div>

        <input style={styles.input} placeholder="Nombre del Vendedor" value={form.vendedorNombre} onChange={e => setForm({...form, vendedorNombre: e.target.value})} />
        <input style={styles.input} placeholder="WhatsApp (Ej: 54911...)" value={form.vendedorTelefono} onChange={e => setForm({...form, vendedorTelefono: e.target.value})} />
        <textarea style={styles.textarea} placeholder="Breve descripción..." value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} />
        
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "SUBIENDO..." : "PUBLICAR EN MARKETPLACE"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: { background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', maxWidth: '500px', margin: '20px auto' },
  title: { textAlign: 'center', color: '#333', marginBottom: '25px', fontSize: '24px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '12px 15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px', outline: 'none' },
  textarea: { padding: '12px 15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px', minHeight: '80px', outline: 'none', fontFamily: 'inherit' },
  fileContainer: { padding: '15px', border: '2px dashed #ff6b00', borderRadius: '8px', textAlign: 'center', backgroundColor: '#fff9f5' },
  fileLabel: { display: 'block', fontWeight: 'bold', color: '#ff6b00', marginBottom: '10px' },
  fileInput: { fontSize: '14px', width: '100%' },
  fileName: { fontSize: '13px', color: '#28a745', marginTop: '8px', fontWeight: '500' },
  button: { background: '#ff6b00', color: 'white', padding: '15px', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', transition: '0.3s' }
};