import { useState } from "react";
import './RutasObject.css';
import { FaCheckCircle } from "react-icons/fa";

export default function RutaComponent({ rutaTitle, rutaText, cursosInfo }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [view, setView] = useState("Cursos");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const switchView = (option) => {
    setView(option);
  };

  return (
    <div className="ruta-container" onClick={toggleExpand}>
      <div className="divBack">
      <h4 className="rutaCheck">
        Ruta <FaCheckCircle />
      </h4>
      <h3 className="rutaTitle">{rutaTitle}</h3>

      {/* Muestra solo un texto breve y la imagen cuando está en modo compacto */}
      {!isExpanded && (
        <div className="ruta-compact">
          <p className="rutaText">{rutaText}</p>
          <img src={cursosInfo[0]?.imagen} alt="Curso imagen" className="ruta-imagen" />
        </div>
      )}

      {/* Muestra todo el contenido solo cuando está expandido */}
      {isExpanded && (
        <>
          <p className="rutaText">{rutaText}</p>

          <div className="ruta-switch">
            <button onClick={() => switchView("Cursos")}>Cursos de la Ruta</button>
          </div>

          {view === "Cursos" ? (
            <div className="ruta-cursos">
              <h3>Cursos de la Ruta</h3>
              {cursosInfo.map((curso, index) => (
                <div className="curso-item" key={index}>
                  <div className="curso-row">
                    <img src={curso.imagen} alt="Curso imagen" className="curso-imagen" />
                    <div className="curso-info">
                      <h4>{curso.nombre}</h4>
                      <p>{curso.descripcion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="ruta-acerca">
              <h3>Acerca de esta Ruta</h3>
              <p>Esta sección ofrece una visión detallada sobre la ruta, explicando objetivos y lo que puedes lograr al completarla.</p>
            </div>
          )}
        </>
      )}
      </div>
    </div>
  );
}
