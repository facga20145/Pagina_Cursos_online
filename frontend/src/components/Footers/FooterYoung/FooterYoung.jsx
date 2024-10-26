import logo from '../../images/Logo-White.svg'; // Importa el logo de GuimarbOT
import './FooterYoung.css'
function FooterYoung() {
  return (
    <footer className="footer-container">
      <div className="footer-logo">
        <img src={logo} alt="GuimarbOT logo" />
      </div>
      <div className="footer-columns">
        <div className="footer-column">
          <h3>Contactanos</h3>
          <ul>
            <li><a href="#!">Centro de ayuda</a></li>
            <li><a href="#!">Reportar problema</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Términos y condiciones</h3>
          <ul>
            <li><a href="#!">Descripción del servicio</a></li>
            <li><a href="#!">Información legal</a></li>
            <li><a href="#!">Limitación del servicio</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Acerca de Nosotros</h3>
          <ul>
            <li><a href="#!">¿Qué es GuimarbOT Kids?</a></li>
            <li><a href="#!">El equipo</a></li>
            <li><a href="#!">Cultura</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
  
}

export default FooterYoung
