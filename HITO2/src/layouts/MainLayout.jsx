import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Toast from "../components/Toast";
import { useCart } from "../context/CartContext";

function MainLayout() {
  const { mensaje, limpiarMensaje } = useCart();

  return (
    <>
      <Navbar
        nombreTienda="A Tu Punto"
        mensaje="Tejidos a tu estilo, a tu medida."
      />

      <Toast mensaje={mensaje} limpiarMensaje={limpiarMensaje} />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;
