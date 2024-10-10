import React from 'react';
import robot2Kids from '../../images/robot2Kids.png';
import './Section2Kids.css';

export default function SectionKids() {
  return (
    <div className="section2-kids2">
      <div className="text-column-kids2"><br /><br />
        <div className="title-kids2">
          <span className="title-kids2-span">PROXIMO CURSO</span>
          <h2>Guimarbot 2024:
          Programación para niños</h2>
        </div>
        <span className="title-kids2-span2">Disponible desde el viernes 11 de octubre</span>
        <div className="description-kids2">
          <p>¡Conviértete en un experto en programación! Aprende a programar y a realizar proyectos increíbles mientras te diviertes. ¡Descubre lo que la tecnología puede ofrecerte!</p>
        </div>
        <div className="button-container-kids2">
          <button className="button-kids2">MAS DETALLES</button>
        </div>
      </div>

      {/* Columna 60% */}
      <div className="image-column-kids2">
        <img src={robot2Kids} alt="Robot Kids" className="image-kids2"/>
      </div>
    </div>
  );
}
