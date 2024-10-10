import React from 'react';
import robotKids from '../../images/robotKids.png';
import './SectionKids.css';

export default function SectionKids() {
  return (
    <div className="section-kids">
      <div className="text-column-kids"><br /><br />
        <div className="title-kids">
          <h2>PROYECTO <br />TECNOLOGICO</h2>
        </div>
        <div className="description-kids">
          <p>¡La tecnología es divertida: ¡Empecemos la aventura juntos!</p>
        </div>
        <div className="button-container-kids">
          <button className="button-kids">Descubrelo</button>
        </div>
      </div>

      {/* Columna 60% */}
      <div className="image-column-kids">
        <img src={robotKids} alt="Robot Kids" className="image-kids"/>
      </div>
    </div>  
  );
}
