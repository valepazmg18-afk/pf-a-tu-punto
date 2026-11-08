
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function iniciarSesionAPI(correo, password) {
  const respuesta = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correo,
      password,
    }),
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.mensaje || "No se pudo iniciar sesión.");
  }

  return {
    token: datos.token,
    usuario: datos.usuario,
  };
}
