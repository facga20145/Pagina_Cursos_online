import React, { useState } from 'react';
import './VideosKids.css';
import { FaRegStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; 

export default function VideosKids({ videoId, concepto, titleVideo }) {
  const [activeTab, setActiveTab] = useState("Metas");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const navigate = useNavigate(); 

  const renderContent = () => {
    switch (activeTab) {
      case "Metas":
        return (
          <div>
            <h3 className='titleVideo'>
              <FaRegStar /><span> </span>{titleVideo}
            </h3>
            <p className='conceptVideo'>{concepto}</p>
          </div>
        );
      case "Apuntes":
        return (
          <textarea
            className='apuntes-textarea'
            placeholder="Escribe tus apuntes aquí..."
            rows="10"
            cols="50"
          />
        );
      default:
        return <p>Selecciona una opción para ver el contenido</p>;
    }
  };


  const handleVideoClick = (e) => {
    e.preventDefault(); 
    setShowPaymentModal(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowPaymentModal(false);
  };

  // Función para redirigir al hacer clic en "Comprar Curso"
  const handleBuyCourse = () => {
    navigate('/Pago'); // Redirige a la URL de pago
  };

  return (
    <div className="videos-kids-container" style={{ display: 'flex', gap: '20px' }}>
      {/* Primera columna: Video de YouTube */}
      <div style={{ flex: 1 }}>
        <div className="video-wrapper" onClick={handleVideoClick}>
          <iframe
            className='videoContainer'
            width="100%"
            height="580px"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="Video de YouTube"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="video-overlay">Haz clic para ver el video</div>
        </div>
      </div>

      {/* Segunda columna: Opciones y contenido */}
      <div style={{ flex: 1 }}>
        <div className="tabs" style={{ display: 'flex' }}>
          <button onClick={() => setActiveTab("Metas")}>Metas</button>
          <button onClick={() => setActiveTab("Apuntes")}>Apuntes</button>
        </div>

        {/* Contenido dinámico */}
        <div className="tab-content" style={{ padding: '10px', border: '1px solid #ccc' }}>
          {renderContent()}
        </div>
      </div>

      {/* Modal de pago */}
      {showPaymentModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Pago requerido</h2>
            <p>Debes pagar por el curso antes de ver el video.</p>
            <button onClick={handleBuyCourse}>Comprar Curso</button>
          </div>
        </div>
      )}
    </div>
  );
}
