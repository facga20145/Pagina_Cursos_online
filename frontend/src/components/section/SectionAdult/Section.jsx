import React from 'react'
import './Section.css'
import { useNavigate } from 'react-router-dom';

export default function Section({isWhite}) {
    
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register');
      }

  return (
    <div className='sectionContainer'>
        <div className="phrase">
            <h3 className={`titlePhrase ${isWhite ? "titlePhrase-White" : ""}`}>
                La escuela de programación <br></br> 
                <span className={`title2 ${isWhite ? "title2-White" : ""}`}>
                     Líder en Perú
                </span>
            </h3>
        </div>

        <div className={`paragraphContainer ${isWhite ? "paragraphContainer-White":""}`}>
            <p>Impulsa tu futuro con las herramientas y el apoyo para desarrollar habilidades en programación y destacar en el mundo digital</p>
        </div>

        <div className="buttonSection">
            <button className='btnTwo'>¡Unete Ahora!</button>
        </div>
        
    </div>
  )
}
