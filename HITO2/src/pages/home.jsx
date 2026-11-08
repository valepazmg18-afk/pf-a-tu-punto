
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { enviarSolicitud } from '../services/emailService'
import '../css/Home.css'

function Home() {
  const { productos } = useProducts()

  const [enviando, setEnviando] = useState(false)
  const [mensajeEnvio, setMensajeEnvio] = useState('')

  useEffect(() => {
    if (!mensajeEnvio) return

    const temporizador = setTimeout(() => {
      setMensajeEnvio('')
    }, 4000)

    return () => clearTimeout(temporizador)
  }, [mensajeEnvio])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formulario = e.target

    const datos = {
      nombre: formulario.nombre.value,
      email: formulario.email.value,
      telefono: formulario.telefono.value,
      producto: formulario.producto.value,
      descripcion: formulario.descripcion.value,
    }

    setEnviando(true)
    setMensajeEnvio('')

    try {
      await enviarSolicitud(datos)
      setMensajeEnvio('¡Tu solicitud fue enviada exitosamente!')
      formulario.reset()
    } catch (error) {
      console.error('Error al enviar la solicitud:', error)
      setMensajeEnvio('No se pudo enviar la solicitud. Inténtalo nuevamente.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="home">

      {/* Banner principal */}
      <section className="home-hero">
        <div className="home-hero-content">
          <h1>Hecho a tu manera</h1>
          <p>
            Tejidos artesanales personalizados, <br/>elaborados según tu estilo y tus preferencias.
          </p>

          <Link to="/galeria" className="home-button">
            Ver catálogo
          </Link>
        </div>
      </section>

      {/* Nuestros tejidos */}
      <section className="home-products">
        <h2>Nuestros Tejidos</h2>

        <div className="home-products-grid">
          {productos.slice(0, 4).map((producto) => (
            <Link
              to={`/producto/${producto.id}`}
              className="home-product-card"
              key={producto.id}
            >
              <img
                src={producto.imagen}
                alt={producto.nombre}
              />
              <p>{producto.nombre}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Formulario de personalización */}
      <section className="home-contact" id="contacto">
        <h2>¿Te gustaría algo personalizado?</h2>

        <p>
          Cuéntanos qué tienes en mente y diseñemos juntos una pieza especial.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Nombre"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Correo electrónico"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="tel"
              id="telefono"
              name="telefono"
              placeholder="Teléfono de contacto"
              required
            />
          </div>

          <div className="form-group">
            <select
              id="producto"
              name="producto"
              defaultValue=""
              required
            >
              <option value="" disabled>
                ¿Qué tejido te gustaría?
              </option>
              {productos.map((producto) => (
                <option key={producto.id} value={producto.nombre}>
                  {producto.nombre}
                </option>
              ))}
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="form-group">
            <textarea
              id="descripcion"
              name="descripcion"
              rows="3"
              placeholder="Describe tu idea, medidas o colores..."
              required
            />
          </div>

          <button
            type="submit"
            className="contact-button"
            disabled={enviando}
          >
            {enviando ? 'Enviando...' : 'Enviar consulta'}
          </button>
        </form>

        {mensajeEnvio && (
          <p className="contact-message">{mensajeEnvio}</p>
        )}

        <p className="contact-note">
          Cada tejido es único, cuéntanos cómo imaginas el tuyo.
        </p>
      </section>
    </div>
  )
}

export default Home
