
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { useAuth } from "./AuthContext";

const CartContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export function CartProvider({ children }) {
  const { usuario, token } = useAuth();

  const [carrito, setCarrito] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // Consultar carrito del usuario autenticado
  const obtenerCarrito = async () => {
    if (!token) {
      setCarrito([]);
      return;
    }

    try {
      const respuesta = await fetch(`${API_URL}/carrito`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!respuesta.ok) {
        throw new Error("No se pudo obtener el carrito");
      }

      const datos = await respuesta.json();

      const detalles = datos.detalles || [];

      setCarrito((carritoActual) =>
        detalles.map((detalle) => {
          const productoAnterior = carritoActual.find(
            (item) => item.id === detalle.id_producto
          );

          return {
            id: detalle.id_producto,
            idDetalle: detalle.id_detalle,
            nombre: detalle.nombre,
            precio: Number(detalle.precio_unitario),
            cantidad: Number(detalle.cantidad),
            imagen: productoAnterior?.imagen || "",
          };
        })
      );
    } catch (error) {
      console.error("Error al obtener carrito:", error);
    }
  };

  useEffect(() => {
    obtenerCarrito();
  }, [token]);

  // Agregar producto
  const agregarAlCarrito = async (producto) => {
    if (!token) {
      setMensaje("Debes iniciar sesión para agregar productos.");
      return;
    }

    try {
      const respuesta = await fetch(`${API_URL}/carrito/detalles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_producto: producto.id,
          cantidad: 1,
        }),
      });

      if (!respuesta.ok) {
        throw new Error("No se pudo agregar el producto");
      }

      await obtenerCarrito();
      setMensaje(`${producto.nombre} se agregó a tu carrito.`);
    } catch (error) {
      console.error("Error al agregar producto:", error);
      setMensaje("No se pudo agregar el producto.");
    }
  };

  // Modificar cantidad
  const modificarCantidad = async (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;

    const producto = carrito.find((item) => item.id === id);

    if (!producto?.idDetalle) return;

    try {
      const respuesta = await fetch(
        `${API_URL}/carrito/detalles/${producto.idDetalle}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ cantidad: nuevaCantidad }),
        }
      );

      if (!respuesta.ok) {
        throw new Error("No se pudo actualizar la cantidad");
      }

      await obtenerCarrito();
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
    }
  };

  // Eliminar producto
  const eliminarDelCarrito = async (id) => {
    const producto = carrito.find((item) => item.id === id);

    if (!producto?.idDetalle) return;

    try {
      const respuesta = await fetch(
        `${API_URL}/carrito/detalles/${producto.idDetalle}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!respuesta.ok) {
        throw new Error("No se pudo eliminar el producto");
      }

      await obtenerCarrito();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const limpiarMensaje = () => {
    setMensaje("");
  };

  const total = carrito.reduce(
    (acumulador, producto) =>
      acumulador + producto.precio * producto.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        modificarCantidad,
        eliminarDelCarrito,
        total,
        mensaje,
        limpiarMensaje,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
