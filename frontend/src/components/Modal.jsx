import React from 'react';
import { useNavigate } from 'react-router-dom';  
import './Modal.css';
import childIcon from './images/Logo-rv.png';   // Asegúrate de tener los íconos
import teenIcon from './images/Logo-rv.png';
import adultIcon from './images/Logo-rv.png';

function Modal({ setUserType }) {
  const navigate = useNavigate();  

  const handleSelection = (type) => {
    setUserType(type);

    if (type === 'child') {
      navigate('/childlandingpage');  
    } else if (type === 'teen') {
      navigate('/landingyoung');  
    } else if (type === 'adult') {
      navigate('/landingpage');  
    }
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h2>Selecciona tu perfil:</h2>
        <button onClick={() => handleSelection('child')}>
          <img src={childIcon} alt="Niño" /> Niño/a
        </button>
        <button onClick={() => handleSelection('teen')}>
          <img src={teenIcon} alt="Adolescente" /> Adolescente
        </button>
        <button onClick={() => handleSelection('adult')}>
          <img src={adultIcon} alt="Adulto" /> Adulto
        </button>
      </div>
    </div>
  );
}

export default Modal;
