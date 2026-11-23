import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../css/Checkout.css";

function Checkout() {
  const { carrito, total, eliminarDelCarrito } = useCart();
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);

  const [datos, setDatos] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    comuna: "",
    region: "",
    indicaciones: "",
  });

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Promise.all(
        carrito.map((producto) => eliminarDelCarrito(producto.id)),
      );

      setPedidoConfirmado(true);
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
      alert("No se pudo finalizar el pedido. Intenta nuevamente.");
    }
  };

  if (carrito.length === 0 && !pedidoConfirmado) {
    return (
      <div className="container my-5 checkout-container">
        <h1 className="checkout-title">Finalizar compra</h1>
        <p>Tu carrito está vacío.</p>

        <Link to="/galeria" className="btn btn-finalizar-compra">
          Ver productos
        </Link>
      </div>
    );
  }

  if (pedidoConfirmado) {
    return (
      <div className="container my-5 checkout-container">
        <div className="checkout-confirmacion">
          <h1 className="checkout-title">¡Pedido recibido!</h1>

          <p>Gracias por tu compra en A Tu Punto.</p>

          <p>Hemos recibido tus datos y tu pedido.</p>

          <Link to="/" className="btn btn-finalizar-compra">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5 checkout-container">
      <h1 className="checkout-title">Finalizar compra</h1>

      <form onSubmit={handleSubmit}>
        <div className="checkout-section">
          <h2>Datos personales</h2>

          <div className="mb-3">
            <label className="form-label">Nombre completo</label>

            <input
              type="text"
              name="nombre"
              className="form-control"
              value={datos.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>

            <input
              type="email"
              name="correo"
              className="form-control"
              value={datos.correo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Teléfono</label>

            <input
              type="tel"
              name="telefono"
              className="form-control"
              value={datos.telefono}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="checkout-section">
          <h2>Dirección de envío</h2>

          <div className="mb-3">
            <label className="form-label">Dirección</label>

            <input
              type="text"
              name="direccion"
              className="form-control"
              value={datos.direccion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Comuna</label>

            <input
              type="text"
              name="comuna"
              className="form-control"
              value={datos.comuna}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Región</label>

            <input
              type="text"
              name="region"
              className="form-control"
              value={datos.region}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Indicaciones adicionales (opcional)
            </label>

            <textarea
              name="indicaciones"
              className="form-control"
              rows="3"
              value={datos.indicaciones}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="checkout-section">
          <h2>Resumen de compra</h2>

          {carrito.map((producto) => (
            <div key={producto.id} className="checkout-producto">
              <span>
                {producto.nombre} × {producto.cantidad}
              </span>

              <span>
                ${(producto.precio * producto.cantidad).toLocaleString("es-CL")}
              </span>
            </div>
          ))}

          <div className="checkout-total">
            <strong>Total: ${total.toLocaleString("es-CL")}</strong>
          </div>
        </div>

        <div className="checkout-actions">
          <Link to="/carrito" className="btn checkout-volver">
            Volver al carrito
          </Link>

          <button type="submit" className="btn btn-finalizar-compra">
            Confirmar pedido
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
