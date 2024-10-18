import React from 'react';
import './FooterKids.css'; // Asegúrate de importar el archivo CSS
import logo from "../../../components/images/LogoKids.svg";

const FooterKids = () => {
  return (
    <div><br />
    <footer className="footer-kids">
      <div className="footer-row">
        <img src={logo} alt="Logo" className="footer-logo-kids" />
      </div>
      <div className="footer-row footer-links-kids">
        <div className="column-kids">
          <h4>Contactanos</h4>
          <ul>
            <li><a href="#link1">Centro de ayuda</a></li>
            <li><a href="#link2">Reportar problema</a></li>
          </ul>
        </div>
        <div className="column-kids">
          <h4>Terminos y condiciones</h4><br />
          <ul>
            <li><a href="#link4">Descripción del servicio</a></li>
            <li><a href="#link5">Información legal</a></li>
            <li><a href="#link6">Limitación del servicio</a></li>
          </ul>
        </div>
        <div className="column-kids">
          <h4>Acerca de Nosotros</h4>
          <ul>
            <li><a href="#link7">¿Qué es Guimarbot Kids?</a></li>
            <li><a href="#link8">El equipo</a></li>
            <li><a href="#link9">Cultura</a></li>
          </ul>
        </div>
      </div>
    </footer><br />
    </div>
  );
};

export default FooterKids;
