
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ requiredRole }) {
  const { usuario } = useAuth();

  // Si no hay una sesión iniciada, ir al login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario no tiene el rol requerido, ir a Inicio
  if (requiredRole && usuario.rol !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
