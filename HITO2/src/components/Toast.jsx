import { useEffect } from 'react'
import '../css/Toast.css'

function Toast({ mensaje, limpiarMensaje }) {

  useEffect(() => {
    if (!mensaje) return

    const temporizador = setTimeout(() => {
      limpiarMensaje()
    }, 3000)

    return () => clearTimeout(temporizador)
  }, [mensaje, limpiarMensaje])

  if (!mensaje) return null

  return (
    <div className="toast-message">
      <span>✓</span>
      <p>{mensaje}</p>
    </div>
  )
}

export default Toast