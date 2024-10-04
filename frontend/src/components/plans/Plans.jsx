import React from 'react'
import './Plans.css'
import { FaRegHeart, FaRegStar } from 'react-icons/fa';
import { LuGraduationCap, LuBookMarked } from "react-icons/lu";
import gift from '../images/gift.png'
import champion from '../images/champion.png'
import backpack from '../images/backpack.png'
import scholarship from '../images/scholarship.png'

export default function Plans() {

    const Plan = ({ img, text, para, buttonText, IconComponent }) => {
        return (
            <div className='containerBox'>
                <img src={img} alt="Plan image" />
                <h3>{text}</h3>
                <div>
                    <p>{para}</p>
                </div>
                <div>
                
                    <button>{IconComponent && <IconComponent className="IconComponent"/>}{buttonText}</button>
                </div>
            </div>
        );
    };

  return (
    <div className='plansContainer'>
        <h3 className='head'>Elige el plan de estudio ideal para ti</h3>

        <div className="plansBox">
        <Plan
                    img={gift}
                    text="Plan gratuito"
                    para="Toma nuestros 9 cursos gratuitos (incluyen certificado) y mira las primeras clases de todos los cursos"
                    buttonText="Comienza a estudiar gratis"
                    IconComponent={FaRegHeart}
                />

        <Plan
                    img={champion}
                    text="Plan Premium"
                    para="Acceso total a cientos de cursos, talleres y carreras en Guimatbot con un único pago."
                    buttonText="¡Sube a premium ahora!"
                    IconComponent={FaRegStar}
                />

        <Plan
                    img={backpack}
                    text="Plan para estudiantes"
                    para="Si estás en la universidad, colegio o instituto, obtén una beca del 50% por un año en GuimarBot"
                    buttonText="Estudia con nosotros"
                    IconComponent={ LuGraduationCap}
                />
         <Plan
                    img={scholarship}
                    text="Becas"
                    para="Adquiere una beca totalmente gratis en GuimarBot por tu excelencia"
                    buttonText="¡Postula Aqui!"
                    IconComponent={LuBookMarked}
                />

        </div>
    </div>
  )
}
