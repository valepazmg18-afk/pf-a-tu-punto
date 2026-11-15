
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import registroTejidos from "../assets/registro-tejidos.png";
import "../css/Register.css";

function Register() {
  const { registrarUsuario, iniciarSesion } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formulario = e.target;
    const nombre = formulario.nombre.value.trim();
    const correo = formulario.email.value.trim();
    const telefono = formulario.telefono.value.trim();
    const password = formulario.password.value;
    const confirmPassword = formulario.confirmPassword.value;

    if (password.length < 6) {
      setError("La contraseña debe contener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setCargando(true);

      await registrarUsuario(nombre, correo, password);

      await iniciarSesion(correo, password);

      formulario.reset();
      navigate("/perfil");
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

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

            {error && <p className="login-error">{error}</p>}

            <button
              type="submit"
              className="register-button"
              disabled={cargando}
            >
              {cargando ? "Registrando..." : "Crear cuenta"}
            </button>
          </form>

          <p className="register-login-link">
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;
