import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import "../css/ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const { productos } = useProducts();
  const { agregarAlCarrito } = useCart();

  const producto = productos.find((item) => item.id === Number(id));

  if (!producto) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <div className="product-detail">
      <img
        className="product-detail-image"
        src={producto.imagen}
        alt={producto.nombre}
      />

      <div className="product-detail-info">
        <h1>{producto.nombre}</h1>

        <p className="product-detail-description">{producto.descripcion}</p>

        <p className="product-detail-price">
          ${producto.precio.toLocaleString("es-CL")}
        </p>

        {producto.tallas?.length > 0 && (
          <div className="product-detail-sizes">
            <p>Tallas disponibles:</p>
            <div className="size-options">
              {producto.tallas.map((talla) => (
                <span key={talla.nombre} className="size-option">
                  {talla.nombre}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="product-detail-colors">
          <p>Colores disponibles:</p>

          <div className="color-options">
            {producto.colores.map((color, index) => (
              <span
                key={index}
                className="color-circle"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        <button
          className="product-detail-button"
          onClick={() => agregarAlCarrito(producto)}
        >
          Agregar al carrito
        </button>
        <p className="product-custom-note">
          * Si deseas otro color o medidas personalizadas,{" "}
          <a href="/#contacto">completa nuestro formulario de contacto</a> y lo
          hacemos a tu gusto.
        </p>
      </div>
    </div>
  );
}

export default ProductDetail;
