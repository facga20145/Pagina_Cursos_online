import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "C:/xampp/htdocs/Pagina_Cursos_online/frontend/src/components/header/HeaderAdult/Header.jsx";
import "./CourseDetail.css";

export default function CourseDetail() {
  const { idCurso } = useParams();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("Metas");
  const [isKids, setIsKids] = useState(false);
  const [isRestricted, setIsRestricted] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const birthDate = new Date(user.fechaNacimiento);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      setIsKids(age < 12);

      // Verificar acceso al curso
      fetch(`http://localhost:4000/api/cursos/${idCurso}/access`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idUsuario: user.id }),
      })
        .then((response) => response.json())
        .then((data) => setIsRestricted(!data.acceso))
        .catch((error) => console.error("Error al verificar acceso:", error));
    }

    // Fetch del curso
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

  const handleVideoClick = () => {
    if (isRestricted) {
      setShowPaymentModal(true);
    }
  };

  const closeModal = () => {
    setShowPaymentModal(false);
  };

  const handleBuyCourse = () => {
    navigate("/Pago");
  };

  if (!course) {
    return <p>Cargando curso...</p>;
  }

  return (
    <div>
      <Header isKids={isKids} />
      <div className="course-detail-container">
        {/* Video */}
        <div className="video-section" style={{ position: "relative" }}>
          <iframe
            width="100%"
            height="500px"
            src={course.enlace}
            title={course.nombre_curso}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          {isRestricted && (
            <div
              className="video-overlay"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={handleVideoClick}
            >
              <p style={{ color: "white", fontSize: "18px" }}>
                Haz clic para desbloquear este video
              </p>
            </div>
          )}
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

      {/* Modal de pago */}
      {showPaymentModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Acceso restringido</h2>
            <p>Debes comprar este curso o activar tu suscripción para ver el video.</p>
            <button onClick={handleBuyCourse}>Comprar Curso</button>
            <button onClick={closeModal}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
