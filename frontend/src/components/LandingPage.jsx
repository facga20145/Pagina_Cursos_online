import { useState, useEffect } from "react";
import Header from './header/Header';
import Section from "./section/Section";
import Plans from "./plans/Plans";
import Modal from "./Modal"; // Importamos el modal
import './LandingPage.css';

export default function LandingPage() {
  const [showModal, setShowModal] = useState(() => {
    const hasShownModal = localStorage.getItem('hasShownModal');
    return !hasShownModal; // Si ya se mostró, no volver a mostrar el modal
  });
  const [userType, setUserType] = useState(null); // Estado para el tipo de usuario

  useEffect(() => {
    if (!showModal) {
      localStorage.setItem('hasShownModal', 'true'); // Guardar en localStorage cuando el modal ya se ha mostrado
    }
  }, [showModal]);

  const handleUserType = (type) => {
    setUserType(type);
    setShowModal(false); // Oculta el modal después de la selección
  };

  // Nueva función para forzar la apertura del modal cuando el usuario hace clic en "Explorar"
  const handleExploreClick = () => {
    localStorage.removeItem('hasShownModal'); // Esto ignora el estado anterior guardado en localStorage
    setShowModal(true); // Muestra el modal al hacer clic en "Explorar"
  };

  return (
    <div className="landingContainer">
      {/* Ocultar el header cuando el modal está activo */}
      {!showModal ? (
        <>
          <Header onExploreClick={handleExploreClick} />
          <Section />
          <Plans />
        </>
      ) : (
        <Modal setUserType={handleUserType} />
      )}
    </div>
  );
}
