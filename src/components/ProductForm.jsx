export const ProductForm = ({ onSubmit, values, setValues, isEditing, onCancel }) => {
  return (
    <form onSubmit={onSubmit} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input 
          type="text" placeholder="Nombre del producto" required
          className="p-3 rounded-xl bg-white/5 text-white border border-white/10 outline-none focus:border-orange-500"
          value={values.nombre} onChange={(e) => setValues({...values, nombre: e.target.value})} 
        />
        <input 
          type="number" placeholder="Stock" required
          className="p-3 rounded-xl bg-white/5 text-white border border-white/10 outline-none focus:border-orange-500"
          value={values.stock} onChange={(e) => setValues({...values, stock: e.target.value})} 
        />
        <input 
          type="number" placeholder="Precio" required
          className="p-3 rounded-xl bg-white/5 text-white border border-white/10 outline-none focus:border-orange-500"
          value={values.precio} onChange={(e) => setValues({...values, precio: e.target.value})} 
        />
        <input 
          type="file" accept="image/*"
          className="p-3 rounded-xl bg-white/5 text-white border border-white/10 text-sm"
          onChange={(e) => setValues({...values, file: e.target.files[0]})} 
        />
        <input 
          type="date"
          className="p-3 rounded-xl bg-white/5 text-white border border-white/10 outline-none"
          value={values.vencimiento} onChange={(e) => setValues({...values, vencimiento: e.target.value})} 
        />
        <label className="flex items-center gap-2 px-3 text-white">
          <input 
            type="checkbox" checked={values.ofertaDiaria} 
            onChange={(e) => setValues({...values, ofertaDiaria: e.target.checked})} 
          />
          Oferta del día
        </label>
      </div>
      
      <div className="mt-6 flex gap-3">
        <button type="submit" className={`flex-1 py-3 rounded-xl font-bold text-white transition ${isEditing ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-blue-600 hover:bg-blue-500'}`}>
          {isEditing ? "Guardar Cambios" : "Agregar Producto"}
        </button>
        {isEditing && (
          <button type="button" onClick={onCancel} className="px-6 py-3 rounded-xl bg-gray-600 text-white font-bold">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};