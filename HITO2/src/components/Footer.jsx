
import { Link } from 'react-router-dom'
import { Camera, MessageCircle } from 'lucide-react'
import '../css/Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h3>A Tu Punto</h3>

          <div className="footer-explore">
            <h4>Explora</h4>
            <Link to="/">Inicio</Link>
            <Link to="/galeria">Catálogo</Link>
          </div>
        </div>

        <div className="footer-right">
          <h4>Síguenos y conversemos</h4>

          <div className="footer-social">
            <span title="Instagram (próximamente)">
              <Camera size={17} />
            </span>

            <span title="WhatsApp (próximamente)">
              <MessageCircle size={17} />
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
