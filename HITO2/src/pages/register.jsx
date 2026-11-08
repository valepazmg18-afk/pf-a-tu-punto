
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import registroTejidos from '../assets/registro-tejidos.png'
import '../css/Register.css'

function Register() {
  const { iniciarSesion } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const formulario = e.target
    const nombre = formulario.nombre.value
    const email = formulario.email.value
    const telefono = formulario.telefono.value
    const password = formulario.password.value
    const confirmPassword = formulario.confirmPassword.value

    if (password.length < 6) {
      alert('La contraseña debe contener al menos 6 caracteres.')
      return
    }

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.')
      return
    }

    iniciarSesion({
      nombre,
      email,
      telefono,
    })

    alert('¡Registro exitoso! Bienvenido/a a A Tu Punto.')

    formulario.reset()
    navigate('/perfil')
  }

  return (
    <section className="register-page">
      <div className="register-heading">
        <h1>Regístrate</h1>
        <p>Tu próximo tejido favorito comienza aquí</p>
      </div>

      <div className="register-content">
        <img
          src={registroTejidos}
          alt="Ovillos de lana y tejidos artesanales"
          className="register-image"
        />

        <div className="register-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono de contacto"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                minLength={6}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                minLength={6}
                required
              />
            </div>

            <button type="submit" className="register-button">
              Crear cuenta
            </button>
          </form>

          <p className="register-login-link">
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Register
