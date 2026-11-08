
import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito')
    return carritoGuardado ? JSON.parse(carritoGuardado) : []
  })

  const [mensaje, setMensaje] = useState('')

  // Guardar el carrito cada vez que cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])

  // Agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    setMensaje(`${producto.nombre} se agregó a tu carrito.`)

    setCarrito((carritoActual) => {
      const productoExiste = carritoActual.find(
        (item) => item.id === producto.id
      )

      if (productoExiste) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }

      return [...carritoActual, { ...producto, cantidad: 1 }]
    })
  }

  // Modificar la cantidad de un producto
  const modificarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return

    setCarrito((carritoActual) =>
      carritoActual.map((item) =>
        item.id === id
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    )
  }

  // Limpiar mensaje de confirmación
  const limpiarMensaje = () => {
    setMensaje('')
  }

  // Eliminar un producto del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.id !== id)
    )
  }

  // Calcular el total de la compra
  const total = carrito.reduce(
    (acumulador, producto) =>
      acumulador + producto.precio * producto.cantidad,
    0
  )

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
  )
}

export function useCart() {
  return useContext(CartContext)
}
