import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import "../css/ManageProducts.css";

const formularioInicial = {
  nombre: "",
  categoria: "",
  precio: "",
  stock: 0,
  descripcion: "",
  tallas: [],
  colores: "",
  medidas: "",
  imagen: "",
};

function ManageProducts() {
  const { productos, setProductos } = useProducts();

  const { token } = useAuth();
  const [archivoImagen, setArchivoImagen] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [error, setError] = useState("");

  const actualizarCampo = (e) => {
    const { name, value } = e.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));
  };

  const cambiarTalla = (nombre) => {
    setFormulario((actual) => {
      const existe = actual.tallas.some((talla) => talla.nombre === nombre);

      return {
        ...actual,
        tallas: existe
          ? actual.tallas.filter((talla) => talla.nombre !== nombre)
          : [...actual.tallas, { nombre, stock: 0 }],
      };
    });
  };

  const actualizarStockTalla = (nombre, stock) => {
    setFormulario((actual) => ({
      ...actual,
      tallas: actual.tallas.map((talla) =>
        talla.nombre === nombre ? { ...talla, stock: Number(stock) } : talla,
      ),
    }));
  };

  const seleccionarImagen = (e) => {
    const archivo = e.target.files[0];

    if (!archivo) return;

    if (!archivo.type.startsWith("image/")) {
      setError("Selecciona un archivo de imagen válido.");
      e.target.value = "";
      return;
    }

    if (archivo.size > 5 * 1024 * 1024) {
      setError("La imagen debe pesar menos de 5 MB.");
      e.target.value = "";
      return;
    }

    setArchivoImagen(archivo);

    const lector = new FileReader();

    lector.onload = () => {
      setFormulario((actual) => ({
        ...actual,
        imagen: lector.result,
      }));
      setError("");
    };

    lector.onerror = () => {
      setError("No se pudo cargar la imagen.");
    };

    lector.readAsDataURL(archivo);
  };

  const abrirFormulario = () => {
    setProductoEditando(null);
    setFormulario(formularioInicial);
    setArchivoImagen(null);
    setError("");
    setMostrarFormulario(true);
  };

  const editarProducto = (producto) => {
    setProductoEditando(producto.id);
    setArchivoImagen(null);

    setFormulario({
      nombre: producto.nombre,
      categoria: producto.categoria || "",
      precio: producto.precio,
      stock: producto.stock ?? 0,
      descripcion: producto.descripcion || "",
      tallas: producto.tallas || [],
      colores: (producto.colores || []).join(", "),
      medidas: producto.medidas || "",
      imagen: producto.imagen || "",
    });

    setError("");
    setMostrarFormulario(true);
  };

  const guardarProducto = async (e) => {
    e.preventDefault();
    setError("");

    const categorias = {
      Mantas: 1,
      Bufandas: 2,
      Kimonos: 3,
      Cardigans: 4,
    };

    if (
      !formulario.nombre.trim() ||
      !formulario.categoria ||
      !formulario.precio ||
      !formulario.descripcion.trim()
    ) {
      setError("Completa todos los campos obligatorios.");
      return;
    }

    const idCategoria = categorias[formulario.categoria];

    if (!idCategoria) {
      setError(
        "La categoría seleccionada no está registrada en la base de datos.",
      );
      return;
    }

    if (!productoEditando && !archivoImagen) {
      setError("Selecciona una imagen para el producto.");
      return;
    }

    const datos = new FormData();

    datos.append("nombre", formulario.nombre.trim());
    datos.append("id_categoria", idCategoria);
    datos.append("precio", Number(formulario.precio));
    datos.append(
      "stock",
      formulario.tallas.length > 0 ? 0 : Number(formulario.stock),
    );
    datos.append("descripcion", formulario.descripcion.trim());
    datos.append("medidas", formulario.medidas.trim());

    if (archivoImagen) {
      datos.append("imagen", archivoImagen);
    } else if (productoEditando !== null && !formulario.imagen) {
      datos.append("eliminar_imagen", "true");
    }

    try {
      const respuesta = await fetch(
        productoEditando !== null
          ? `${API_URL}/productos/${productoEditando}`
          : `${API_URL}/productos`,
        {
          method: productoEditando !== null ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: datos,
        },
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(resultado.mensaje || "No se pudo guardar el producto.");
      }

      const productoAPI = resultado.producto;

      const productoGuardado = {
        id: productoAPI.id_producto,
        nombre: productoAPI.nombre,
        descripcion: productoAPI.descripcion || "",
        precio: Number(productoAPI.precio),
        stock: Number(productoAPI.stock),
        categoria: formulario.categoria,
        medidas: productoAPI.medidas || "",
        imagen: productoAPI.imagen_url
          ? `http://localhost:3000${productoAPI.imagen_url}`
          : formulario.imagen,
        colores: formulario.colores
          .split(",")
          .map((color) => color.trim())
          .filter(Boolean),
        tallas: formulario.tallas,
        activo: productoAPI.activo ?? true,
      };

      if (productoEditando !== null) {
        setProductos((actuales) =>
          actuales.map((producto) =>
            producto.id === productoEditando
              ? { ...producto, ...productoGuardado }
              : producto,
          ),
        );
      } else {
        setProductos((actuales) => [...actuales, productoGuardado]);
      }

      setFormulario(formularioInicial);
      setArchivoImagen(null);
      setProductoEditando(null);
      setMostrarFormulario(false);
    } catch (error) {
      console.error("Error al guardar producto:", error);
      setError(error.message || "Ocurrió un error al guardar el producto.");
    }
  };

  const eliminarProducto = (id) => {
    const confirmar = window.confirm(
      "¿Estás segura de que deseas eliminar este producto?",
    );

    if (confirmar) {
      setProductos((actuales) =>
        actuales.filter((producto) => producto.id !== id),
      );
    }
  };

  return (
    <div className="manage-products">
      <div className="manage-products-header">
        <h1>Gestionar productos</h1>

        <button onClick={abrirFormulario}>Agregar producto</button>
      </div>

      {mostrarFormulario && (
        <form className="product-form" onSubmit={guardarProducto}>
          <h2>
            {productoEditando !== null ? "Editar producto" : "Agregar producto"}
          </h2>

          <label>
            Nombre del producto *
            <input
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={actualizarCampo}
              required
            />
          </label>

          <label>
            Categoría *
            <select
              name="categoria"
              value={formulario.categoria}
              onChange={actualizarCampo}
              required
            >
              <option value="">Seleccionar categoría</option>
              <option value="Mantas">Mantas</option>
              <option value="Cardigans">Cardigans</option>
              <option value="Bufandas">Bufandas</option>
              <option value="Kimonos">Kimonos</option>
              <option value="Otros">Otros</option>
            </select>
          </label>

          <label>
            Precio *
            <input
              type="number"
              name="precio"
              min="1"
              value={formulario.precio}
              onChange={actualizarCampo}
              required
            />
          </label>

          <label>
            Descripción *
            <textarea
              name="descripcion"
              value={formulario.descripcion}
              onChange={actualizarCampo}
              required
            />
          </label>

          <label>Tallas disponibles</label>

          <div className="product-form-sizes">
            {["S", "M", "L"].map((nombre) => {
              const talla = formulario.tallas.find(
                (item) => item.nombre === nombre,
              );

              return (
                <div key={nombre}>
                  <label>
                    <input
                      type="checkbox"
                      checked={Boolean(talla)}
                      onChange={() => cambiarTalla(nombre)}
                    />
                    Talla {nombre}
                  </label>

                  {talla && (
                    <label>
                      Stock talla {nombre}
                      <input
                        type="number"
                        min="0"
                        value={talla.stock}
                        onChange={(e) =>
                          actualizarStockTalla(nombre, e.target.value)
                        }
                      />
                    </label>
                  )}
                </div>
              );
            })}
          </div>

          {formulario.tallas.length === 0 && (
            <label>
              Stock general
              <input
                type="number"
                name="stock"
                min="0"
                value={formulario.stock}
                onChange={actualizarCampo}
              />
            </label>
          )}

          <label>
            Colores disponibles (códigos HEX separados por coma)
            <input
              type="text"
              name="colores"
              placeholder="#EBC5D2, #D9C6B2"
              value={formulario.colores}
              onChange={actualizarCampo}
            />
          </label>

          <label>
            Medidas
            <input
              type="text"
              name="medidas"
              placeholder="Ej. 150 x 180 cm"
              value={formulario.medidas}
              onChange={actualizarCampo}
            />
          </label>

          <label>
            Imagen del producto
            <input type="file" accept="image/*" onChange={seleccionarImagen} />
          </label>

          {formulario.imagen && (
            <div
              className="product-image-preview"
              style={{ position: "relative", width: "160px" }}
            >
              <p>Vista previa:</p>

              <button
                type="button"
                onClick={() => {
                  setFormulario((actual) => ({
                    ...actual,
                    imagen: "",
                  }));
                  setArchivoImagen(null);
                }}
                title="Eliminar imagen"
                aria-label="Eliminar imagen seleccionada"
                style={{
                  position: "absolute",
                  top: "25px",
                  right: "-8px",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "none",
                  background: "#d9534f",
                  color: "#fff",
                  fontSize: "18px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ×
              </button>

              <img
                src={formulario.imagen}
                alt="Vista previa del producto"
                style={{
                  width: "160px",
                  height: "160px",
                  objectFit: "contain",
                }}
              />
            </div>
          )}

          {error && <p className="form-error">{error}</p>}

          <div className="product-form-actions">
            <button type="submit">
              {productoEditando !== null
                ? "Guardar cambios"
                : "Guardar producto"}
            </button>

            <button
              type="button"
              onClick={() => {
                setMostrarFormulario(false);
                setProductoEditando(null);
                setError("");
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Talla</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>${producto.precio.toLocaleString("es-CL")}</td>
              <td>
                {producto.tallas?.length > 0
                  ? producto.tallas.reduce(
                      (total, talla) => total + talla.stock,
                      0,
                    )
                  : producto.stock}
              </td>
              <td>
                {producto.tallas?.length > 0
                  ? producto.tallas.map((talla) => talla.nombre).join(", ")
                  : "—"}
              </td>
              <td>
                <button onClick={() => editarProducto(producto)}>Editar</button>

                <button onClick={() => eliminarProducto(producto.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageProducts;
