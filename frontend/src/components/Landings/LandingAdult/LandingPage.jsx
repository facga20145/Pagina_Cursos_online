import { useState, useEffect } from "react"; // Asegúrate de importar useState
import Header from "../../header/HeaderAdult/Header";
import Section from "../../section/SectionAdult/Section";
import Plans from "../../plans/Plans";
import AboutUsAdult from "../../AboutUs/AboutUsAdult/AboutUsAdult";
import HeroSectionAdult from "../../HeroSection/HeroSectionAdult/HeroSectionAdult";
import Modal from "../../Modal"; // Importamos el modal
import "../../Landings/LandingAdult/LandingPage.css";
import ServisAdult from "../../Servis/ServisAdult/ServisAdult";
import FooterAdult from "../../Footers/FooterAdult/FooterAdult";

export default function LandingPage() {
  useEffect(() => {
    // Almacenar el tipo de landing cuando el componente se monta
    localStorage.setItem("landingPage", "adult");
  }, []);
    const [showModal, setShowModal] = useState(() => {
    const hasShownModal = localStorage.getItem("hasShownModal");
    return !hasShownModal; // Si ya se mostró, no volver a mostrar el modal
  });
  const [userType, setUserType] = useState(null); // Estado para el tipo de usuario

  useEffect(() => {
    if (!showModal) {
      localStorage.setItem("hasShownModal", "true"); // Guardar en localStorage cuando el modal ya se ha mostrado
    }
  }, [showModal]);

  const handleUserType = (type) => {
    setUserType(type);
    setShowModal(false); // Oculta el modal después de la selección
  };

  // Nueva función para forzar la apertura del modal cuando el usuario hace clic en "Explorar"
  const handleExploreClick = () => {
    localStorage.removeItem("hasShownModal"); // Esto ignora el estado anterior guardado en localStorage
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
            <AboutUsAdult />
            <HeroSectionAdult />
            <ServisAdult />
            <FooterAdult />
          </>
        ) : (
          <Modal setUserType={handleUserType} />
        )}
      </div>
  );
}
