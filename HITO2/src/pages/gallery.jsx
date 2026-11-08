import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductContext";
import "../css/Gallery.css";

function Gallery() {
  const { productos } = useProducts();

  return (
    <div>
      <div className="gallery-header">
        <h1>Nuestros tejidos</h1>
        <p>Descubre creaciones hechas a mano, a tu estilo y a tu medida.</p>
      </div>

      <div className="products-grid">
        {productos.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
