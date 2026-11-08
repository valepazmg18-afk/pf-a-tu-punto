
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../css/ProductCard.css";

function ProductCard({ producto }) {
  const { agregarAlCarrito } = useCart();

  return (
    <div className="product-card">
      <img src={producto.imagen} alt={producto.nombre} />

      <div className="product-card-content">
        <h3>{producto.nombre}</h3>

        <p className="product-price">
          ${producto.precio.toLocaleString("es-CL")}
        </p>

        <div className="product-card-actions">
          <Link to={`/producto/${producto.id}`}>
            Ver producto
          </Link>

          <button onClick={() => agregarAlCarrito(producto)}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
