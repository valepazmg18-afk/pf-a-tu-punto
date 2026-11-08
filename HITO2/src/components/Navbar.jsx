
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import '../css/Navbar.css'

function Navbar({ nombreTienda, mensaje }) {
  const { carrito } = useCart()
  const { usuario } = useAuth()
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cantidadProductos = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  )

  const cerrarMenu = () => {
    setMenuAbierto(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo" onClick={cerrarMenu}>
          {nombreTienda}
        </Link>
        <p>{mensaje}</p>
      </div>

      <button
        className="navbar-toggle"
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuAbierto}
      >
        {menuAbierto ? <X size={27} /> : <Menu size={27} />}
      </button>

      <ul className={`navbar-links ${menuAbierto ? 'active' : ''}`}>
        <li>
          <Link to="/" onClick={cerrarMenu}>Inicio</Link>
        </li>

        <li>
          <Link to="/galeria" onClick={cerrarMenu}>Catálogo</Link>
        </li>

        {usuario ? (
          <li>
            <Link to="/perfil" onClick={cerrarMenu}>Mi perfil</Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login" onClick={cerrarMenu}>
                Iniciar sesión
              </Link>
            </li>

            <li>
              <Link to="/registro" onClick={cerrarMenu}>
                Registrarse
              </Link>
            </li>
          </>
        )}

        <li className="navbar-cart">
          <Link
            to="/carrito"
            aria-label={`Carrito de compras: ${cantidadProductos} productos`}
            onClick={cerrarMenu}
          >
            <ShoppingCart size={22} />

            {cantidadProductos > 0 && (
              <span className="cart-count">{cantidadProductos}</span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
