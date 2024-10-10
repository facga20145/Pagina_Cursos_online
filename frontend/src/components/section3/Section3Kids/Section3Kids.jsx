import React from 'react';
import './Section3Kids.css';
import icono1Kids from '../../images/icono1Kids.png'
import icono2Kids from '../../images/icono2Kids.png'
import icono3Kids from '../../images/icono3Kids.png'

// Importa imágenes temporales
const gift = 'https://via.placeholder.com/150';
const champion = 'https://via.placeholder.com/150';
const backpack = 'https://via.placeholder.com/150';

export default function PlansKids() {

    const PlanKids = ({ img, text, para}) => {
        return (
            <div className='containerBoxKids'>
                <img src={img} alt="Plan image" />
                <h3>{text}</h3>
                <div className='paraContainerKids'>
                    <p>{para}</p> {/* Muestra la descripción pasada como prop */}
                </div>
            </div>
        );
    };

  return (
    <div className='plansContainerKids'>
        <h3 className='headKids'>¡Es tu momento para <span className='yellow'>aprender!</span></h3>
        
        <div className='headKidsSpan'>
        <span>Ponte en acción y crea cosas increíbles con tecnología</span>
        </div><br />

        <div className="plansBoxKids">
            <PlanKids
                img={icono1Kids}
                text="Cursos"
                para="Aprende a crear cosas increíbles y deja volar tu imaginación."
            />

            <PlanKids
                img={icono2Kids}
                text="Actividades"
                para="Empieza a programar hoy y descubre todo lo que puedes crear."
            />

            <PlanKids
                img={icono3Kids}
                text="Lenguajes"
                para="Cada nuevo código es una herramienta para crear cosas increíbles."
            />
        </div>
        <br />
    </div>
  );
}
