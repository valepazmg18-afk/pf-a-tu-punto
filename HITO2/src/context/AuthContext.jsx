
import { createContext, useContext, useState } from 'react';
import { iniciarSesionAPI, registrarUsuarioAPI,  actualizarPerfilAPI} from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  const iniciarSesion = async (correo, password) => {
    const datos = await iniciarSesionAPI(correo, password);

    localStorage.setItem('usuario', JSON.stringify(datos.usuario));
    localStorage.setItem('token', datos.token);

    setUsuario(datos.usuario);
    setToken(datos.token);

    return datos.usuario;
  };

  const registrarUsuario = async (nombre, correo, password) => {
    return await registrarUsuarioAPI(nombre, correo, password);
  };

  const actualizarPerfil = async (datosUsuario) => {
  const usuarioActualizado = await actualizarPerfilAPI(
    datosUsuario,
    token
  );

  localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));
  setUsuario(usuarioActualizado);

  return usuarioActualizado;
};

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');

    setUsuario(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        iniciarSesion,
        registrarUsuario,
        actualizarPerfil,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
