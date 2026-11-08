
import { useCart } from '../context/CartContext'
import { Trash2 } from 'lucide-react'
import '../css/Cart.css'

function Cart() {
  const {
    carrito,
    eliminarDelCarrito,
    modificarCantidad,
    total,
  } = useCart()

  return (
    <div className="container my-5">
      <h1 className="cart-title">Mi carrito</h1>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table align-middle cart-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th className="text-center">Cantidad</th>
                  <th className="text-center">Eliminar</th>
                </tr>
              </thead>

              <tbody>
                {carrito.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>

                    <td>
                      ${producto.precio.toLocaleString('es-CL')}
                    </td>

                    <td>
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          disabled={producto.cantidad === 1}
                          onClick={() =>
                            modificarCantidad(
                              producto.id,
                              producto.cantidad - 1
                            )
                          }
                        >
                          −
                        </button>

                        <span>{producto.cantidad}</span>

                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            modificarCantidad(
                              producto.id,
                              producto.cantidad + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="text-center">
                      <button
                        className="btn btn-link text-danger"
                        onClick={() =>
                          eliminarDelCarrito(producto.id)
                        }
                        aria-label={`Eliminar ${producto.nombre}`}
                        title="Eliminar producto"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-end mt-4 cart-total">
            <h3>
              Total: ${total.toLocaleString('es-CL')}
            </h3>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
