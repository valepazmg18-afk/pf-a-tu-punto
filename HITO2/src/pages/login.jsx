
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import loginTejidos from "../assets/login-tejidos.png";
import "../css/Login.css";

function Login() {
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formulario = e.target;
    const correo = formulario.email.value.trim();
    const password = formulario.password.value;

    if (password.length < 6) {
      setError("La contraseña debe contener al menos 6 caracteres.");
      return;
    }

    try {
      setCargando(true);

      const usuario = await iniciarSesion(correo, password);

      formulario.reset();

      if (usuario.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/perfil");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="login-page">
      <div className="login-heading">
        <h1>Iniciar sesión</h1>
        <p>Bienvenida a A Tu Punto</p>
      </div>

      <div className="login-content">
        <img
          src={loginTejidos}
          alt="Tejidos artesanales"
          className="login-image"
        />

        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ingresa tu correo"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            {error && <p className="login-error">{error}</p>}

            <button
              type="submit"
              className="login-button"
              disabled={cargando}
            >
              {cargando ? "Ingresando..." : "Iniciar sesión"}
            </button>
          </form>

          <p className="login-register-link">
            ¿No tienes una cuenta?
            <Link to="/registro">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
