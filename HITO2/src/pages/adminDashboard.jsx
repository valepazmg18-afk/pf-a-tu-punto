
import { useProducts } from "../context/ProductContext";
import { Package, CheckCircle } from "lucide-react";
import "../css/AdminDashboard.css";

function AdminDashboard() {
  const { productos } = useProducts();

  const totalProductos = productos.length;
  const productosActivos = productos.filter(
    (producto) =>
      producto.tallas?.length > 0
        ? producto.tallas.some((talla) => talla.stock > 0)
        : producto.stock > 0
  ).length;

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h1>Panel principal</h1>
        <p>Bienvenida al administrador de A Tu Punto.</p>
      </div>

      <div className="admin-dashboard-cards">
        <div className="admin-dashboard-card">
          <div className="admin-dashboard-card-icon">
            <Package size={25} />
          </div>

          <div>
            <p>Total de productos</p>
            <h2>{totalProductos}</h2>
          </div>
        </div>

        <div className="admin-dashboard-card">
          <div className="admin-dashboard-card-icon">
            <CheckCircle size={25} />
          </div>

          <div>
            <p>Productos activos</p>
            <h2>{productosActivos}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
