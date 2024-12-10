import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CourseDetail.css";

export default function CourseDetail() {
  const { idCurso } = useParams(); // Extraer idCurso de la URL
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("Metas");

  useEffect(() => {
    fetch(`http://localhost:4000/api/cursos/${idCurso}`)
    .then((response) => response.json())
      .then((data) => setCourse(data))
      .catch((error) => console.error("Error al cargar el curso:", error));
  }, [idCurso]);

  const renderContent = () => {
    switch (activeTab) {
      case "Metas":
        return (
          <div className="tab-content">
            <h3>🌟 Actividades a realizar en este curso:</h3>
            <ul>
              <li>Aprender qué es {course.nombre_curso} y por qué es importante.</li>
              <li>{course.descripcion}</li>
              <li>Explorar conceptos avanzados y aplicarlos en proyectos reales.</li>
            </ul>
          </div>
        );
      case "Apuntes":
        return (
          <textarea
            className="apuntes-textarea"
            placeholder="Escribe tus apuntes aquí..."
            rows="10"
            cols="50"
          />
        );
      default:
        return <p>Selecciona una opción para ver el contenido</p>;
    }
  };

  if (!course) {
    return <p>Cargando curso...</p>;
  }

  return (
    <div className="course-detail-container">
      {/* Video */}
      <div className="video-section">
        <iframe
          width="100%"
          height="500px"
          src={course.enlace}
          title={course.nombre_curso}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

      </div>

      {/* Detalles */}
      <div className="details-section">
        <h1>{course.nombre_curso}</h1>
        <div className="tabs">
          <button
            className={activeTab === "Metas" ? "active" : ""}
            onClick={() => setActiveTab("Metas")}
          >
            Metas
          </button>
          <button
            className={activeTab === "Apuntes" ? "active" : ""}
            onClick={() => setActiveTab("Apuntes")}
          >
            Apuntes
          </button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}
