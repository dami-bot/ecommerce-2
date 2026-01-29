import { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Inicializamos con LocalStorage para que no se borre al refrescar F5
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito_distribuidora");
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito_distribuidora", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item => 
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    <CartContext.Provider value={{ carrito, setCarrito, agregarAlCarrito, vaciarCarrito }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el carrito fácil
export const useCart = () => useContext(CartContext);