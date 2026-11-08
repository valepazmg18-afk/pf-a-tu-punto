import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRound, LockKeyhole } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "../css/Profile.css";

function Profile() {
  const { usuario, iniciarSesion, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  const [editando, setEditando] = useState(false);
  const [nombre, setNombre] = useState(usuario?.nombre || "");
  const [email, setEmail] = useState(usuario?.email || "");
  const [telefono, setTelefono] = useState(usuario?.telefono || "");

  const [passwordActual, setPasswordActual] = useState("");
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");

  const handleEditar = (e) => {
    e.preventDefault();

    iniciarSesion({
      ...usuario,
      nombre,
      email,
      telefono,
    });

    setEditando(false);
    alert("¡Información actualizada correctamente!");
  };

  const handlePassword = (e) => {
    e.preventDefault();

    if (passwordActual.length < 6) {
      alert("La contraseña actual debe contener al menos 6 caracteres.");
      return;
    }

    if (nuevaPassword.length < 6) {
      alert("La nueva contraseña debe contener al menos 6 caracteres.");
      return;
    }

    if (nuevaPassword !== confirmarPassword) {
      alert("Las nuevas contraseñas no coinciden.");
      return;
    }

    alert("¡Contraseña actualizada correctamente!");

    setPasswordActual("");
    setNuevaPassword("");
    setConfirmarPassword("");
  };

  const handleLogout = () => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas cerrar sesión?",
    );

    if (confirmar) {
      cerrarSesion();
      alert("Has cerrado sesión correctamente.");
      navigate("/login");
    }
  };

  return (
    <section className="profile-page">
      <h1 className="profile-title">Mi perfil</h1>

      <p className="profile-subtitle">
        Aquí puedes consultar y actualizar tu información personal
      </p>

      <div className="profile-container">
        {/* Información personal */}
        <section className="profile-section">
          <div className="profile-user-header">
            <div className="profile-avatar">
              <UserRound size={25} />
            </div>

            <div className="profile-user-data">
              <h2>{usuario?.nombre || "Usuario"}</h2>
              <span>
                {usuario?.rol === "admin" ? "Administrador" : "Mi cuenta"}
              </span>

              <button
                type="button"
                className="profile-edit-link"
                onClick={() => setEditando(true)}
              >
                Editar perfil
              </button>
            </div>
          </div>

          <div className="profile-divider"></div>

          <h3>Información personal</h3>

          <form onSubmit={handleEditar}>
            <div className="profile-form-group">
              <label htmlFor="nombre">Nombre completo</label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                disabled={!editando}
                required
              />
            </div>

            <div className="profile-form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!editando}
                required
              />
            </div>

            <div className="profile-form-group">
              <label htmlFor="telefono">Contacto</label>
              <input
                id="telefono"
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                disabled={!editando}
                required
              />
            </div>

            <div className="profile-buttons">
              {editando ? (
                <>
                  <button
                    type="button"
                    className="profile-cancel-button"
                    onClick={() => {
                      setNombre(usuario?.nombre || "");
                      setEmail(usuario?.email || "");
                      setTelefono(usuario?.telefono || "");
                      setEditando(false);
                    }}
                  >
                    Cancelar
                  </button>

                  <button type="submit" className="profile-action-button">
                    Guardar información
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="profile-action-button"
                  onClick={() => setEditando(true)}
                >
                  Editar información
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Seguridad de la cuenta */}
        <section className="profile-section profile-security">
          <h3>
            <LockKeyhole size={17} />
            Seguridad de la cuenta
          </h3>

          <form onSubmit={handlePassword}>
            <div className="profile-form-group">
              <label htmlFor="passwordActual">Contraseña actual</label>
              <input
                id="passwordActual"
                type="password"
                value={passwordActual}
                onChange={(e) => setPasswordActual(e.target.value)}
                placeholder="Ingresa tu contraseña actual"
                minLength={6}
                required
              />
            </div>

            <div className="profile-form-group">
              <label htmlFor="nuevaPassword">Nueva contraseña</label>
              <input
                id="nuevaPassword"
                type="password"
                value={nuevaPassword}
                onChange={(e) => setNuevaPassword(e.target.value)}
                placeholder="Ingresa tu nueva contraseña"
                minLength={6}
                required
              />
            </div>

            <div className="profile-form-group">
              <label htmlFor="confirmarPassword">Confirmar contraseña</label>
              <input
                id="confirmarPassword"
                type="password"
                value={confirmarPassword}
                onChange={(e) => setConfirmarPassword(e.target.value)}
                placeholder="Confirma tu nueva contraseña"
                minLength={6}
                required
              />
            </div>

            <div className="profile-buttons">
              <button type="submit" className="profile-action-button">
                Actualizar contraseña
              </button>
            </div>
          </form>
        </section>

        <button type="button" className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </section>
  );
}

export default Profile;
