import { createContext, useContext, useState, useEffect } from "react";

import mantaRosa from "../assets/manta-rosa.png";
import chalecoTejido from "../assets/chaleco-tejido.png";
import bufandaArtesanal from "../assets/bufanda-artesanal.png";
import cardiganCrochet from "../assets/cardigan-crochet.png";

const ProductContext = createContext();

const API_URL = "http://localhost:3000/api";

// Información visual de los productos
const datosVisuales = {
  3: {
    imagen: mantaRosa,
    colores: ["#EBC5D2", "#D9C6B2", "#B7C9B5"],
    tallas: [],
  },
  4: {
    imagen: chalecoTejido,
    colores: ["#D9C6B2", "#59443F", "#C98291"],
    tallas: [{ nombre: "S" }, { nombre: "M" }, { nombre: "L" }],
  },
  5: {
    imagen: bufandaArtesanal,
    colores: ["#B7C9B5", "#E8DDAF", "#8A7770"],
    tallas: [],
  },
  6: {
    imagen: cardiganCrochet,
    colores: ["#EBC5D2", "#D9C6B2", "#B7C9B5"],
    tallas: [{ nombre: "S" }, { nombre: "M" }, { nombre: "L" }],
  },
};

export function ProductProvider({ children }) {
  const [productos, setProductos] = useState([]);

  // Guardar los productos en localStorage
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  // Obtener productos desde PostgreSQL
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await fetch(`${API_URL}/productos`);

        if (!respuesta.ok) {
          throw new Error("No se pudieron obtener los productos");
        }

        const datos = await respuesta.json();

        const productosBackend = Array.isArray(datos)
          ? datos
          : datos.productos || [];

        const productosAdaptados = productosBackend.map((producto) => {
          const visual = datosVisuales[producto.id_producto] || {};

          return {
            id: producto.id_producto,
            nombre: producto.nombre,
            descripcion: producto.descripcion || "",
            precio: Number(producto.precio),
            stock: producto.stock,
            imagen: producto.imagen_url
              ? `http://localhost:3000${producto.imagen_url}`
              : producto.imagen_eliminada
                ? ""
                : visual.imagen || "",
            colores: visual.colores || [],
            tallas: visual.tallas || [],
            activo: producto.activo,
          };
        });

        setProductos(productosAdaptados);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    obtenerProductos();
  }, []);

  return (
    <ProductContext.Provider value={{ productos, setProductos }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
