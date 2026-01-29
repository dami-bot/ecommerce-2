// 1. Agregamos 'isLoading' a las props que recibe el componente
export const ProductForm = ({ onSubmit, values, setValues, isEditing, onCancel, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text" placeholder="Nombre del producto" required
          className="p-3 rounded-xl bg-white/5 text-white border border-white/10 outline-none focus:border-orange-500"
          value={values.nombre} onChange={(e) => setValues({ ...values, nombre: e.target.value })}
        />
        <input
          type="number" placeholder="Stock" required
          className="p-3 rounded-xl bg-white/5 text-white border border-white/10 outline-none focus:border-orange-500"
          value={values.stock} onChange={(e) => setValues({ ...values, stock: e.target.value })}
        />
        <input
          type="number" placeholder="Precio" required
          className="p-3 rounded-xl bg-white/5 text-white border border-white/10 outline-none focus:border-orange-500"
          value={values.precio} onChange={(e) => setValues({ ...values, precio: e.target.value })}
        />
        <input
          type="file" accept="image/*"
          className="p-3 rounded-xl bg-white/5 text-white border border-white/10 text-sm"
          onChange={(e) => setValues({ ...values, file: e.target.files[0] })}
        />
        <input
          type="date"
          className="p-3 rounded-xl bg-white/5 text-white border border-white/10 outline-none"
          value={values.vencimiento} onChange={(e) => setValues({ ...values, vencimiento: e.target.value })}
        />
        <label className="flex items-center gap-2 px-3 text-white">
          <input
            type="checkbox" checked={values.ofertaDiaria}
            onChange={(e) => setValues({ ...values, ofertaDiaria: e.target.checked })}
          />
          Oferta del día
        </label>
      </div>
      {/* Selector de Categoría */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-400 text-sm font-bold uppercase">Categoría</label>
        <select
          value={values.categoria}
          onChange={(e) => setValues({ ...values, categoria: e.target.value })}
          className="bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="Almacen"className="bg-stone-900 text-white">Almacen</option>
          <option value="Bebidas"className="bg-stone-900 text-white">Bebidas</option>
          <option value="Limpieza"className="bg-stone-900 text-white">Limpieza</option>
          <option value="Golosinas"className="bg-stone-900 text-white">Golosinas</option>
          <option value="Fiambres"className="bg-stone-900 text-white">Fiambres</option>
        </select>
      </div>

      <div className="mt-6 flex gap-3">
        {/* 2. Modificamos el botón con 'disabled' y el texto dinámico */}
        <button
          type="submit"
          disabled={isLoading}
          className={`flex-1 py-3 rounded-xl font-bold text-white transition ${isLoading ? 'bg-gray-600 cursor-not-allowed' :
              isEditing ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-blue-600 hover:bg-blue-500'
            }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando...
            </span>
          ) : (
            isEditing ? "Guardar Cambios" : "Agregar Producto"
          )}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-3 rounded-xl bg-gray-600 text-white font-bold disabled:opacity-50"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};