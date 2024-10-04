import React from 'react'
import './Section.css'

export default function Section() {
  return (
    <div className='sectionContainer'>
        <div className="phrase">
            <h3 className="titlePhrase">
                La escuela de programación <br></br> 
                <span className="title2">
                     Líder en Perú
                </span>
            </h3>
        </div>

        <div className="paragraphContainer">
            <p>Más de 5,000 jóvenes y niños aprenden programación con nosotros, transformando su futuro</p>
        </div>

        <div className="buttonSection">
            <button className='btnOne'>!Aprovecha los cursos¡</button>
            <button className='btnTwo'>¡Unete Ahora!</button>
        </div>
    </div>
  )
}
