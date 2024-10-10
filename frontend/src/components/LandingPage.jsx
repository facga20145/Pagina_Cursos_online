import React, { useState } from 'react';  // Asegúrate de importar useState
import Section from './section/Section';
import Plans from './plans/Plans';
import Modal from './Modal';  // Importamos el modal

export default function LandingPage() {
  const [showModal, setShowModal] = useState(true);  // Estado para mostrar u ocultar el modal
  const [userType, setUserType] = useState(null);  // Estado para el tipo de usuario

  const handleUserType = (type) => {
    setUserType(type);
    setShowModal(false);  // Oculta el modal después de la selección
  };

  return (
    <div className='landingContainer'>
      {showModal && <Modal setUserType={handleUserType} />} {/* Solo muestra el modal si showModal es true */}
      {!showModal && (
        <>
          <Section />
          <Plans />
        </>
      )}
    </div>
  );
}
