import React from 'react';
import './Section4Kids.css';
import scratch from '../../images/scratch.png'
import blockly from '../../images/blockly.png'
import python from '../../images/python.png'
import alice from '../../images/alice.png'
import robot3Kids from '../../images/robot3Kids.png'

const placeholderImage = 'https://via.placeholder.com/150'; // Imagen temporal

export default function Section4Kids() {
  return (
    <div className="gridContainerKids">
      {/* Primera columna */}
      <div className="firstColumnKids">
        <h3>Utilizamos los mejores programas</h3><br />
        <img src={robot3Kids} alt="Imagen principal" />
      </div>

      {/* Segunda columna con subgrid de 4 filas */}
      <div className="secondColumnKids">
        <div className="rowKids">
          <div className="imageColumnKids">
            <img src={scratch} alt="Imagen fila 1" />
          </div>
          <div className="textColumnKids">
            <div>
              <h4>Scratch</h4>
              <p>Lenguaje visual que permite  crear juegos y animaciones arrastrando bloques de código, ideal para principiantes.</p>
            </div>
          </div>
        </div>

        <div className="rowKids">
          <div className="imageColumnKids">
            <img src={blockly} alt="Imagen fila 2" />
          </div>
          <div className="textColumnKids">
            <div>
              <h4>Blockly</h4>
              <p>Un lenguaje visual que usa bloques arrastrables para enseñar programación de forma intuitiva, ideal para desarrollar habilidades lógicas.</p>
            </div>
          </div>
        </div>

        <div className="rowKids">
          <div className="imageColumnKids">
            <img src={python} alt="Imagen fila 3" />
          </div>
          <div className="textColumnKids">
            <div>
              <h4>Python</h4>
              <p>Un lenguaje de programación accesible y fácil de entender, perfecto para escribir código real y hacer proyectos más avanzados.</p>
            </div>
          </div>
        </div>

        <div className="rowKids">
          <div className="imageColumnKids">
            <img src={alice} alt="Imagen fila 4" />
          </div>
          <div className="textColumnKids">
            <div>
              <h4>Alice</h4>
              <p>Lenguaje visual que enseña programación a través de la creación de animaciones 3D y juegos, ideal para aprender conceptos de manera interactiva.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
