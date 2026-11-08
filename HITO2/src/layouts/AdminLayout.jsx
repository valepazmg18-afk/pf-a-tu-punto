
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, UserRound, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "../css/AdminLayout.css";

function AdminLayout() {
  const { cerrarSesion } = useAuth();
  const navigate = useNavigate();

  const salir = () => {
    cerrarSesion();
    navigate("/login");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <h2>A Tu Punto</h2>
          <p>Administración</p>
        </div>

        <nav className="admin-sidebar-nav">
          <NavLink to="/admin" end>
            <LayoutDashboard size={19} />
            <span>Panel principal</span>
          </NavLink>

          <NavLink to="/admin/productos">
            <Package size={19} />
            <span>Gestionar catálogo</span>
          </NavLink>

          <NavLink to="/perfil">
            <UserRound size={19} />
            <span>Mi cuenta</span>
          </NavLink>
        </nav>

        <button className="admin-sidebar-logout" onClick={salir}>
          <LogOut size={19} />
          <span>Cerrar sesión</span>
        </button>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
