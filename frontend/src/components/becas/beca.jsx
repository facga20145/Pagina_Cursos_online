import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate
import Header from "../header/HeaderAdult/Header";
import "./beca.css";
import FooterAdult from "../Footers/FooterAdult/FooterAdult";
import axios from "axios"; // Para realizar solicitudes HTTP

function Beca() {
  const navigate = useNavigate(); // Inicializa el hook de navegación
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [id, setId] = useState(""); // Estado para almacenar el ID del usuario
  const [telefono, setTelefono] = useState("");
  const [motivo, setMotivo] = useState("");
  const [certificadoSocioeconomico, setCertificadoSocioeconomico] = useState(null);
  const [certificadoEstudios, setCertificadoEstudios] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  // Verifica el estado del quiz al cargar el componente
  useEffect(() => {
    // Leer el ID del usuario desde localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Datos obtenidos de localStorage:", user); // Depuración

    if (user && user.id) {
      setId(user.id); // Almacena el id del usuario en el estado
    } else {
      console.error("No se encontró el id en localStorage.");
    }

    // Verificar si completó el quiz
    const quizCompleted = localStorage.getItem("quizCompleted");
    if (quizCompleted === "1") {
      setIsFormDisabled(false); // Habilita el formulario si se completó el quiz
    } else {
      setIsFormDisabled(true); // Deshabilita el formulario si no se completó
    }

    // Limpia solo "quizCompleted" del localStorage al refrescar o salir de la página
    const handleBeforeUnload = () => {
      localStorage.removeItem("quizCompleted");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Limpia el evento al desmontar el componente
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Maneja el clic del botón de quizz
  const handleQuizClick = () => {
    navigate("/Quiz"); // Redirige a la ruta "/Quiz"
  };

  // Maneja la advertencia si el formulario está deshabilitado
  const handleFormClick = (e) => {
    if (isFormDisabled) {
      e.preventDefault(); // Previene cualquier acción predeterminada
      setShowWarning(true); // Muestra la advertencia
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormDisabled) {
      setShowWarning(true); // Muestra la advertencia si está deshabilitado
      return;
    }

    if (!id) {
      alert("No se encontró el id del usuario. Por favor, inicie sesión nuevamente.");
      return;
    }

    const formData = new FormData();
    formData.append("idUsuario", id); // Cambiado a id
    formData.append("telefono", telefono);
    formData.append("motivo", motivo);
    formData.append("CertificadoSocioeconomico", certificadoSocioeconomico);
    formData.append("CertificadoEstudios", certificadoEstudios);

    try {
      const response = await axios.post("http://localhost:4000/api/scholarships/add-scholarship-request", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Solicitud enviada con éxito: " + response.data.message);
      navigate("/"); // Redirige a la página principal después de enviar
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      alert("Hubo un error al enviar la solicitud. Por favor, intenta nuevamente.");
    }
  };

  // Cierra el cuadro de advertencia
  const closeWarning = () => {
    setShowWarning(false);
  };

  return (
    <>
      <Header isWhite={true} />
      <div className="content-container">
        <div className="left-text">
          <h2 className="highlight-text">¡Demuestra tus habilidades y obtén una beca!</h2>
          <p className="text-paragraph colorful-text">
            Participa en nuestro quiz de programación para tener la oportunidad de acceder a una beca exclusiva para nuestros cursos.
          </p>
          <p className="text-paragraph bold-text colorful-text">
            ¡Acepta el reto y da el siguiente paso hacia tu futuro como programador!
          </p>
          <button type="submit" className="submit-button" onClick={handleQuizClick}>
            Completa este quizz
          </button>
        </div>
        <div className="contact-form-container">
          <form className="contact-form" onClick={handleFormClick} onSubmit={handleSubmit}>
            <h2 className="form-title">Solicitud de Beca</h2>
            <div className="form-group">
              <label className="form-label">Teléfono:</label>
              <input
                type="text"
                placeholder="Número de teléfono"
                className="form-input"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                disabled={isFormDisabled}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Motivo:</label>
              <textarea
                placeholder="Escribe tu motivo"
                className="form-input"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                disabled={isFormDisabled}
              ></textarea>
            </div>
            <div className="form-group">
              <label className="form-label">Certificado Socioeconómico:</label>
              <input
                type="file"
                className="form-input"
                onChange={(e) => setCertificadoSocioeconomico(e.target.files[0])}
                disabled={isFormDisabled}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Certificado de Estudios:</label>
              <input
                type="file"
                className="form-input"
                onChange={(e) => setCertificadoEstudios(e.target.files[0])}
                disabled={isFormDisabled}
              />
            </div>
            <button type="submit" className="submit-button" disabled={isFormDisabled}>
              Enviar Solicitud
            </button>
          </form>
        </div>
      </div>

      {showWarning && (
        <div className="overlay">
          <div className="warning-box">
            <p>Debe completar el quizz para solicitar la beca</p>
            <button onClick={closeWarning} className="close-button">
              Cerrar
            </button>
          </div>
        </div>
      )}

      <FooterAdult />
    </>
  );
}

export default Beca;
