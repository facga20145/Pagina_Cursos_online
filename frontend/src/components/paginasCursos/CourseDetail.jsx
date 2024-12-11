import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "C:/xampp/htdocs/Pagina_Cursos_online/frontend/src/components/header/HeaderAdult/Header.jsx";
import "./CourseDetail.css";

export default function CourseDetail({ onCartUpdate }) {
  const { idCurso } = useParams();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("Metas");
  const [isKids, setIsKids] = useState(false);
  const [isRestricted, setIsRestricted] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const birthDate = new Date(user.fechaNacimiento);
const today = new Date();
let age = today.getFullYear() - birthDate.getFullYear();

if (
  today.getMonth() < birthDate.getMonth() ||
  (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
) {
  age--; // Esto ahora funcionará porque "age" es un let
}

setIsKids(age < 12);


      // Verificar acceso al curso
      fetch(`http://localhost:4000/api/cursos/${idCurso}/verificar-acceso?idUsuario=${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
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
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Verificar si el curso ya está en el carrito
    const isAlreadyInCart = cart.some((item) => item.id === course.idCurso);

    if (!isAlreadyInCart) {
      // Añadir el curso al carrito
      const newCartItem = {
        id: course.idCurso,
        title: course.nombre_curso,
        price: course.precio,
        image: `http://localhost:4000/${course.imagen}`, // Ruta completa de la imagen
      };
      const updatedCart = [...cart, newCartItem];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      console.log("Curso añadido al carrito:", newCartItem);

      // Notificar al carrito usando un prop
      if (typeof onCartUpdate === "function") {
        onCartUpdate(updatedCart);
      }
    } else {
      console.log("El curso ya está en el carrito.");
    }

    // Cerrar el modal
    setShowPaymentModal(false);
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
            <p>Debes comprar este curso o activarlo para acceder al video.</p>
            <button onClick={handleBuyCourse}>Añadir al Carrito</button>
            <button onClick={closeModal}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
