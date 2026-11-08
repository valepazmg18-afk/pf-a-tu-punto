
import { useState } from "react";
import { useProducts } from "../context/ProductContext";
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
        talla.nombre === nombre
          ? { ...talla, stock: Number(stock) }
          : talla
      ),
    }));
  };

  const seleccionarImagen = (e) => {
    const archivo = e.target.files[0];

    if (!archivo) return;

    if (!archivo.type.startsWith("image/")) {
      setError("Selecciona un archivo de imagen válido.");
      return;
    }

    if (archivo.size > 1024 * 1024) {
      setError("La imagen debe pesar menos de 1 MB.");
      e.target.value = "";
      return;
    }

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
    setError("");
    setMostrarFormulario(true);
  };

  const editarProducto = (producto) => {
    setProductoEditando(producto.id);

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

  const guardarProducto = (e) => {
    e.preventDefault();
    setError("");

    if (
      !formulario.nombre.trim() ||
      !formulario.categoria ||
      !formulario.precio ||
      !formulario.descripcion.trim() ||
      !formulario.imagen
    ) {
      setError("Completa los campos obligatorios y selecciona una imagen.");
      return;
    }

    const datosProducto = {
      nombre: formulario.nombre.trim(),
      categoria: formulario.categoria,
      precio: Number(formulario.precio),
      stock:
        formulario.tallas.length > 0 ? 0 : Number(formulario.stock),
      descripcion: formulario.descripcion.trim(),
      tallas: formulario.tallas,
      colores: formulario.colores
        .split(",")
        .map((color) => color.trim())
        .filter(Boolean),
      medidas: formulario.medidas.trim(),
      imagen: formulario.imagen,
    };

    if (productoEditando !== null) {
      setProductos((actuales) =>
        actuales.map((producto) =>
          producto.id === productoEditando
            ? { ...producto, ...datosProducto }
            : producto
        )
      );
    } else {
      const nuevoProducto = {
        id: Date.now(),
        ...datosProducto,
      };

      setProductos((actuales) => [...actuales, nuevoProducto]);
    }

    setFormulario(formularioInicial);
    setProductoEditando(null);
    setMostrarFormulario(false);
  };

  const eliminarProducto = (id) => {
    const confirmar = window.confirm(
      "¿Estás segura de que deseas eliminar este producto?"
    );

    if (confirmar) {
      setProductos((actuales) =>
        actuales.filter((producto) => producto.id !== id)
      );
    }
  };

  return (
    <div className="manage-products">
      <div className="manage-products-header">
        <h1>Gestionar productos</h1>

        <button onClick={abrirFormulario}>
          Agregar producto
        </button>
      </div>

      {mostrarFormulario && (
        <form className="product-form" onSubmit={guardarProducto}>
          <h2>
            {productoEditando !== null
              ? "Editar producto"
              : "Agregar producto"}
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
                (item) => item.nombre === nombre
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
            <input
              type="file"
              accept="image/*"
              onChange={seleccionarImagen}
            />
          </label>

          {formulario.imagen && (
            <div className="product-image-preview">
              <p>Vista previa:</p>
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
                      0
                    )
                  : producto.stock}
              </td>
              <td>
                {producto.tallas?.length > 0
                  ? producto.tallas.map((talla) => talla.nombre).join(", ")
                  : "—"}
              </td>
              <td>
                <button onClick={() => editarProducto(producto)}>
                  Editar
                </button>

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
